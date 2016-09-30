'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        require: 'susy',
        sourcemap: 'auto',
        style: 'nested',
        loadPath: [
          '/Users/aarabasz/.rvm/gems/ruby-2.1.5/gems/susy-2.2.2/sass'
        ]
      },
      compile: {
        files: {
          'app/assets/css/styles.css': 'app/assets/scss/styles.scss'
        }
      }            
    },        
    nodeunit: {
      files: ['test/**/*_test.js'],
    },   
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      sass: {
          files: 'app/**/*.{scss,sass}',
          tasks: ['sass']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },      
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    handlebars: {
        all: {
            files: {
                "js/templates.js": ["templates/**/*.hbs"]
            }
        }
    }    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');   
  grunt.loadNpmTasks('grunt-contrib-handlebars');   

  // Default task.
  grunt.registerTask('default', [
    'nodeunit',
    'jshint',
    'watch',
    'sass'    
  ]);
};
