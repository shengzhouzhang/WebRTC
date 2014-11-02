module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'public/templates',
        src: ['**/*.jsx'],
        dest: 'public/scripts/views',
        ext: '.react.js'
      }
    },
    less: {
      development: {
        files: {
          'public/style/main.css': 'public/style/less/main.less'
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          'public/style/main.min.css': 'public/style/less/main.less'
        }
      }
    },
    watch: {
      react: {
        files: 'public/templates/**/*.jsx',
        tasks: ['react']
      },
      less: {
        files: 'public/style/**/*.less',
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      csslint: {
        files: 'public/style/main.css',
        tasks: ['csslint']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'server.js',
        'dispatcher/*.js',
        'global/*.js',
        'routers/**/*.js',
        'scheduler/*.js',
        'stores/*.js',
        'util/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: 'public/style/less/.csslintrc'
      },
      src: [
        'public/style/main.css'
      ]
    },
    clean: {
      log: {
        src: [
          'application.log',
          'newrelic_agent.log',
          'public/style/main.css',
          'public/style/main.min.css',
          'public/scripts/views/*.js',
          'public/scripts/application.js',
          'public/scripts/application.min.js',
          'public/style/main.min.css'
        ]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'public/scripts/',
          mainConfigFile: 'public/scripts/require.config.js',
          include: ['main.js'],
          out: 'public/scripts/application.js'
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          'public/scripts/application.min.js': ['public/scripts/application.js']
        }
      }
    },
    bgShell: {
      _defaults: {
        bg: true
      },
      runNode: {
        cmd: 'node server.js scan schedule',
        bg: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('linter', ['jshint']);
  grunt.registerTask('build', ['clean', 'less', 'react', 'requirejs', 'uglify']);
  grunt.registerTask('server', ['bgShell:runNode']);
};
