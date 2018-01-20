module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    coffee: {
      spectrum: {
        expand: true,
        flatten: false,
        cwd: "packages/spectrum-js/coffee/",
        src: ["*.coffee"],
        dest: 'assets/js/spectrum/',
        ext: ".js"
      },

      spectrum_demos: {
        expand: true,
        flatten: false,
        cwd: "packages/spectrum-js/demos/coffee/",
        src: ["*.coffee"],
        dest: 'assets/js/spectrum-demos/',
        ext: ".js"
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['env'],
        plugins: ['transform-es2015-modules-amd']
      },
      dist: {
        files: {
          './assets/js/app/app.js': './src/app.js'
        }
      }
    },

    watch: {
      coffee: {
        files: [
          "coffee/*.coffee",
          "coffee/*/*.coffee",
          "coffee/*/*/*.coffee",
        ],
        tasks: [
          "coffee:spectrum",
          "coffee:spectrum_demos"
        ]
      },

      babel: {
        files: 'src/*.js',
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", [
    'babel',
    "coffee:spectrum",
    "coffee:spectrum_demos"
  ]);
}
