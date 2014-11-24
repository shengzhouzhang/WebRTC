
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    validator = require('validator'),
    uuid = require('node-uuid'),
    status = require('../../static/incident.status').status,
    actions = require('../../static/incident.actions').actions,
    logger = require('../../util/log/application.log').logger;

var parse = function (incident, cb) {
  if(!cb) { throw new Error ('missing cb'); }
  if(!incident) { cb(new Error ('invalid incident data')); }

  if(!_.isString(incident.action) ||
     !actions[incident.action.toUpperCase()]) {

    logger.error(incident.action);
    cb(new Error ('invalid action type'));
    return;
  }

  if(!incident.home ||
     !incident.home.id ||
     !incident.home.address ||
     !_.isString(incident.home.address.street) ||
     !_.isString(incident.home.address.city) ||
     !_.isString(incident.home.address.country) ||
     _.isNull(incident.home.address.postcode) ||
     _.isUndefined(incident.home.address.postcode)) {

    cb(new Error ('invalid home data'));
    return;
  }

  if(!incident.event ||
     !incident.event.id ||
     !_.isArray(incident.event.snapshots) ||
     !incident.event.snapshots.length ||
     !!_.find(incident.event.snapshots, function (snapshot) {

    return !snapshot.id ||
           !validator.isURL(snapshot.url) ||
           !snapshot.timestamp ||
           isNaN(new Date(snapshot.timestamp).getTime());
  })) {

    cb(new Error ('invalid event data'));
    return;
  }

  if(!_.isArray(incident.contacts) ||
     !incident.contacts.length ||
     !!_.find(incident.contacts, function (contact) {

      return !_.isString(contact.first_name) ||
             !_.isString(contact.last_name) ||
             _.isNull(contact.phone) ||
             _.isUndefined(contact.phone);

     }) ||
     _.filter(incident.contacts, function (contact) {
      return !!contact.owner;
     }).length !== 1
   ) {

    cb(new Error ('invalid contacts data'));
    return;
  }

  cb(null);
};

var create = function (incident) {

  var motion = _.find(incident.event.snapshots, function (snapshot) {
    return !!snapshot.motion;
  });

  return {

    id: uuid.v1(),
    created_at: moment().valueOf(),
    status: [],
    action: actions[incident.action.toUpperCase()],

    home: {
      id: incident.home.id,
      address: {
        street: incident.home.address.street,
        city: incident.home.address.city,
        postcode: incident.home.address.postcode,
        country: incident.home.address.country
      }
    },

    event: {
      id: incident.event.id,
      start: _.min(incident.event.snapshots, 'timestamp').timestamp,
      end: _.max(incident.event.snapshots, 'timestamp').timestamp,
      cover: !!motion ? motion.url : _.first(incident.event.snapshots).url,
      snapshots: _.map(incident.event.snapshots, function (snapshot) {

        return {
          id: snapshot.id,
          url: snapshot.url,
          timestamp: snapshot.timestamp
        };
      })
    },

    contacts: _.map(incident.contacts, function (contact) {

      return {
        first_name: contact.first_name,
        last_name: contact.last_name,
        owner: contact.owner,
        phone: contact.phone,
        email: contact.email
      };
    }),

    notes: []
  };
};

module.exports.util = {
  parse: parse,
  create: create
};
