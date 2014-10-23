
'use strict';

var _ = require('lodash'),
    util = require('util');

var Env = {

  config: function () {

    var env = process.env;

    switch(env.NODE_ENV){
      case 'production':
        break;

      default:
        env.REDIS_PORT = 6379;
        env.REDIS_HOST = 'localhost';
        env.REDIS_PASSWORD = '';

        env.MONGODB_URI = 'mongodb://ii-staging:ii-staging@kahana.mongohq.com:10092/ii';
        break;
    }
  },
};

Env.config();

module.exports.Env = Env;
