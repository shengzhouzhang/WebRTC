
'use strict';

var path = require('path'),
    templates = require('email-templates'),
    sendgrid  = require('sendgrid')('jonathan@selu.com.au', 'setontolu19'),
    logger = require('../log/application.log').logger,
    dir   = path.resolve(__dirname, '..', '..', 'emails');

var send = function (options, data, cb) {
  if(!options || !options.template) { throw new Error ('missing template'); }

  templates(dir, function(err, template) {
    if(!!err) { logger.error('sent email error: ', err); return; }

    template(options.template, data, function(err, html, text) {
      if(!!err) { logger.error('sent email error: ', err); return; }

      sendgrid.send({
        from:     options.from || 'steven@cammy.com',
        to:       options.to || 'steven@cammy.com',
        subject:  options.subject || '[Image Imtelligence] Email',
        html: html
      }, function(err, json) {
        if(!!cb) { cb(err, json); }
      });
    });
  });
};

module.exports.emailer = {
  send: send
};
