/**
 * Created by sam on 15-3-12.
 */

module.exports = function(grunt){
  grunt.initConfig({
    distDir: 'dist',
    srcDir: 'src',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src:{
      css: '<%= distDir %>/css',
      js: '<%= srcDir %>/js',
      html: '<%= srcDir %>/html',
      htmlWatch: '<%= srcDir %>/html/**/*.html',
      stylus: '<%= srcDir %>/stylus/appWelcome.styl',
      stylusWatch: '<%= srcDir %>/stylus/**/*.styl',
      npm: 'node_modules'
    },
    clean: ['<%= distDir %>'],
    copy:{
      assets:{
        files: [
          { dest: '<%= distDir %>', src: 'index.html', expand: true, cwd: '<%= src.html %>'},
          { dest: '<%= distDir %>/assets/imgs', src : '**', expand: true, cwd: '<%= srcDir %>/imgs' },
          { dest: '<%= distDir %>', src: 'favicon.ico', expand: true, cwd: '<%= srcDir %>'}
        ]
      }
    },
    concat:{
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>/**/*.js'],
        dest:'<%= distDir %>/assets/<%= pkg.name %>.js'
      },
      jqueryMin:{
        src:['<%= src.npm %>/jquery/dist/jquery.min.js'],
        dest: '<%= distDir %>/assets/vendor/jquery.min.js'
      },
      jqueryMap:{
        src:['<%= src.npm %>/jquery/dist/jquery.min.map'],
        dest: '<%= distDir %>/assets/vendor/jquery.min.map'
      },
      requireJs:{
        src:['<%= src.npm %>/requirejs/require.js'],
        dest: '<%= distDir %>/assets/vendor/require.js'
      },
      skrollrJs:{
        src:['<%= src.npm %>/skrollr/dist/skrollr.min.js'],
        dest: '<%= distDir %>/assets/vendor/skrollr.min.js'
      }
    },
    stylus:{
      build: {
        files: {
          '<%= src.css %>/<%= pkg.name %>.css': ['<%= src.stylus %>'] },
        options: {
          compile: true
        }
      }
    },
    watch:{
      build: {
        files:[
          '<%= src.js %>/**/*.js',
          '<%= src.stylusWatch %>',
          '<%= src.htmlWatch %>',
          '<%= srcDir %>/imgs/**/*'
        ],
        tasks:['build','timestamp']
      }
    }
  });

  //grunt.loadNpmTasks('name')
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  //grunt.registerTask('name', [dep])
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('build', ['clean','concat','stylus:build','copy:assets']);
};