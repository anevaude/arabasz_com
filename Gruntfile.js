'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Renders the partials into whole pages
    mustache_render: {
      options: {
        data: '_source/templates/data/data.json',
        directory: '_source/templates'
      },
      dist: {
        files: {
          '_build/templates/pages/index.html': '_source/templates/pages/index.mustache'
        }
      }
    },    
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
          '_source/assets/css/styles.css': '_source/assets/scss/styles.scss'
        }
      }            
    },        
    // Copies files from Source (developer) to Build (deliverable)
    copy: {
      templates: {
        files: [
          {
            cwd: '_source/templates/',
            src: ['**/*.html','**/*.json'],
            dest: '_build/templates/',
            expand: true
          }
        ]
      },      
      css: {
        files: [
          {
            cwd: '_source/styles/',
            src: ['**/*.css'],
            dest: '_build/styles/',
            expand: true
          }
        ]
      },
      js: {
        files: [
          {
            cwd: '_source/scripts/',
            src: ['**/*'],
            dest: '_build/scripts/',
            expand: true
          }
        ]
      },
      assets: {
        files: [
          {
            cwd: '_source/assets/',
            src: ['**/*'],
            dest: '_build/assets/',
            expand: true
          }
        ]
      },
      vendor: {
        files: [
          {
            cwd: '_source/vendor/',
            src: ['**/*'],
            dest: '_build/vendor/',
            expand: true
          }
        ]
      }             
    },
    watch: {     
      sass: {
          files: '_source/**/*.{scss,sass}',
          tasks: ['sass']
      },
      mustache_render: {
          files: '_source/**/*.mustache',
          tasks: ['mustache_render']
      }      
    }    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-mustache-render');  
  grunt.loadNpmTasks('grunt-contrib-sass');    
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');      

  // Default task.
  grunt.registerTask('default', [
    'watch',
    'sass',
    'mustache_render',
    'copy'
  ]);
};
