module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat:{
      options: {
        separator: ';',
      },
      dist: {
        src: [
        'bower_components/jquery/jquery.js',
        'bower_components/jquery-ui/ui/jquery-ui.js',
        'bower_components/underscore/underscore.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/bootstrap/js/collapse.js',
        'bower_components/angular-ui-calendar/src/calendar.js',
        'bower_components/fullcalendar/fullcalendar.js',
        'bower_components/fullcalendar/gcal.js',
        'bower_components/d3/d3.js',
        'bower_components/nvd3/nv.d3.js',
        'bower_components/angular-nvd3/dist/angular-nvd3.js',
        'app/app.js',
        'app/common/calendarService.js',
        'app/Graph/GraphCtrl.js',
        'app/calendar/calendarCtrl.js'

        ],
        dest: 'dist/js/app.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! js/minified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      js: {
        files: {
          'dist/js/lib.min.js': ['dist/js/lib.js'],
          'dist/js/app.min.js': ['dist/js/app.js'],

        }
      }
    },

    concat_css: {
      options: {
        // Task-specific options go here.
      },
      all: {
        src: ["bower_components/bootstrap/dist/css/bootstrap.css",
        "bower_components/fullcalendar/fullcalendar.css",
        "app/app.css",
        "app/calendar/calendarStyle.css",
        "bower_components/nvd3/nv.d3.css"
        ],
        dest: "dist/css/styles.css"
      },
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html'], dest: 'dist', filter: 'isFile'},
          {expand: true, src: ['resources/images/capgemini.png'], dest: 'dist', filter: 'isFile'}
        ]
      }
    },
    useminPrepare: {
      html: 'dist/index.html',
    },
    usemin: {
      html: 'dist/index.html'
    }

  });

  //Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  // Default task(s).
  grunt.registerTask('default', ['bower_concat']);

  //Custom GO task

  // 1 - on concat les lib bower -> lib.js
  // 2 - on minifie les scripts et lib.js
  // 3 - on concat des minifications
  grunt.registerTask('build','build for heroku', function(){
    grunt.task.run(['copy','useminPrepare','concat','concat_css','usemin']);

  });

};
