//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          paths: {
          },

          include: ['src/ko.factory'],
          out: 'dist/ko.factory-debug.js',

          optimize: 'none',
          preserveLicenseComments: true,
          skipModuleInsertion: true,
          wrap: {
            startFile: ['buildinfo/license.frag', 'buildinfo/module-start.frag'],
            endFile: 'buildinfo/module-end.frag'
          }
        }
      },
      minify: {
        options: {
          baseUrl: '.',
          paths: {
          },

          include: ['src/ko.factory'],
          out: 'dist/ko.factory.js',

          optimize: 'uglify',
          preserveLicenseComments: true,
          skipModuleInsertion: true,
          wrap: {
            startFile: ['buildinfo/license.frag', 'buildinfo/module-start.frag'],
            endFile: 'buildinfo/module-end.frag'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.registerTask('default', ['requirejs']);
};
