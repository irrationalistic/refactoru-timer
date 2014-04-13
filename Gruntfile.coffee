module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    sass:
      dev:
        options:
          includePaths: [require('node-bourbon').includePaths]
        files:
          'css/main.css': 'sass/main.scss'
    coffee:
      dev:
        options:
          bare: true
        files: [
          expand: true
          cwd: 'coffee'
          src: ['*.coffee']
          dest: 'js'
          ext: '.js'
        ]
    watch:
      sass:
        files: 'sass/*.scss'
        tasks: ['sass']
      coffee:
        files: 'coffee/*.coffee'
        tasks: ['coffee']
      css:
        files: 'css/*.css'
        tasks: []
        options:
          livereload: true

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-sass'

  grunt.registerTask 'default', ['watch']