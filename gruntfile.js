'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            compass: {
                files: ['./public/sass/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            js: {
                files: ['./public/js/*.js'],
                tasks: ['jshint', 'uglify:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    './public/*.html',
                    './public/css/style.css',
                    './public/js/*.js',
                    './public/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        //Express
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        /**
            // Connect
            connect: {
              server: {
                options: {
                  port: 8000
                }
              }
            },
        **/


        // Compass and scss
        compass: {
            options: {
                //bundleExec: true,
                //httpPath: './publi',
                cssDir: './public/css',
                sassDir: './public/sass',
                imagesDir: './public/images',
                javascriptsDir: './public/js',
                fontsDir: './public/fonts',
                assetCacheBuster: 'none',
                require: [
                    'breakpoint',
                    'susy',
                    'compass/import-once/activate',
                    'modular-scale',
                    'bootstrap-sass',
                    'sassy-buttons'
                ]
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                    relativeAssets: true,
                    raw: 'line_numbers = :true\n'
                }
            },
            dist: {
                options: {
                    environment: 'production',
                    outputStyle: 'compact',
                    force: true
                }
            }
        },

        /**
                bower: {
                    dev: {
                        dest: '/public/libs/',
                        js_dest: '/public/libs/js',
                        css_dest: './public'
                    }
                }
                **/

        // Javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                './public/js/src/*.js'
            ]
        },

        // Concat & minify
        uglify: {
            dev: {
                options: {
                    mangle: false,
                    compress: false,
                    preserveComments: 'all',
                    beautify: true
                },
                files: {
                    './public/js/app.min.js': [
                        './public/js/src/*.js'
                    ]
                }
            },
            dist: {
                options: {
                    mangle: true,
                    compress: true
                },
                files: {
                    './public/js/app.min.js': [
                        './public/js/src/*.js'
                    ]
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'jshint',
        'uglify:dist',
        'compass:dist'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'uglify:dev',
        'compass:dev',
        'express:dev',
        'watch'
    ]);

};