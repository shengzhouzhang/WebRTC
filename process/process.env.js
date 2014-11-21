
'use strict';

var _ = require('lodash'),
    util = require('util');

var Env = {

  config: function () {

    var env = process.env;

    switch(env.NODE_ENV){
      case 'production':
        env.REDIS_PORT = 17702;
        env.REDIS_HOST = 'pub-redis-17702.us-east-1-2.5.ec2.garantiadata.com';
        env.REDIS_PASSWORD = 'FLFUeBBXbPaDh2Hy';
        env.MONGODB_URI = 'mongodb://cammy:cammy@galaga.2.mongolayer.com:10011,galaga.3.mongolayer.com:10008/cammy-irc-production';
        break;

      case 'staging':
        env.REDIS_PORT = 10023;
        env.REDIS_HOST = 'pub-redis-10023.us-east-1-4.3.ec2.garantiadata.com';
        env.REDIS_PASSWORD = 'PtxrZAx9qJUJqV4d';

        env.MONGODB_URI = 'mongodb://cammy:cammy@dogen.mongohq.com:10086/cammy-irc-staging';
        break;

      default:
        // env.REDIS_PORT = 6379;
        // env.REDIS_HOST = 'localhost';
        // env.REDIS_PASSWORD = '';

        env.REDIS_PORT = 10023;
        env.REDIS_HOST = 'pub-redis-10023.us-east-1-4.3.ec2.garantiadata.com';
        env.REDIS_PASSWORD = 'PtxrZAx9qJUJqV4d';

        env.MONGODB_URI = 'mongodb://cammy:cammy@dogen.mongohq.com:10086/cammy-irc-staging';
        break;
    }
  },
};

Env.config();

module.exports.Env = Env;
