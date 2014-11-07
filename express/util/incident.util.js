
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    uuid = require('node-uuid'),
    status = require('../../static/incident.status').status,
    logger = require('../../util/log/application.log').logger;

var parse = function (incident, cb) {
  if(!cb) { throw new Error ('missing cb'); }
  if(!incident) { cb(new Error ('invalid incident data')); }

  if(!incident.home ||
     !incident.home.id ||
     !incident.home.address ||
     !incident.home.address.city ||
     !incident.home.address.country ||
     !incident.home.address.postcode ||
     !incident.home.address.street) {

    cb(new Error ('invalid home data'));
    return;
  }

  if(!incident.event ||
     !incident.event.id ||
     !incident.event.snapshots ||
     !incident.event.snapshots.length ||
     !!_.find(incident.event.snapshots, function (snapshot) {

    return !snapshot.id ||
           !snapshot.url ||
           !snapshot.timestamp ||
           isNaN(new Date(snapshot.timestamp).getTime());

  })) {

    cb(new Error ('invalid event data'));
    return;
  }

  if(!incident.contacts ||
     !incident.contacts.length ||
     !!_.find(incident.contacts, function (contact) {

      return !contact.first_name ||
             !contact.last_name ||
             !contact.phone ||
             !contact.email;

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

  return {

    id: uuid.v1(),
    created_at: moment().valueOf(),
    status: status.OPEN,

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
      cover: _.first(incident.event.snapshots).url,
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
    })
  };
};

module.exports.util = {
  parse: parse,
  create: create
};
