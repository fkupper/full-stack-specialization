module.exports = function (grunt) {
    'use strict';
    // time how long tasks take. Can help when optmizing build times
    require('time-grunt')(grunt);

    //automatically loads require Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngAnnotate: 'grunt-ng-annotate'
    });

    // Define configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                    ]
            }

        },
        copy: {
            dist: {
                cwd: 'app',
                src: ['**', '!styles/**/*.css', '!scripts/**/*.js'],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files: [
                    {
                        //for bootstrap fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                        }, {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                        }
                    ]
            },
            public: {
                cwd: 'dist',
                src: ['**'],
                dest: '../json-server/public',
                expand: true
            }
        },

        clean: {
            build: {
                src: ['dist/']
            },
            tmp: {
                src: ['.tmp/']
            },
            public: {
                src: ['../json-server/public/']
            }
        },

        useminPrepare: {
            //html: 'app/index.html',
            html: 'app/**/*.html',
            options: {
                dest: 'dist'
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        'dist/scripts/*.js',
                        'dist/styles/*.css',
                    ]
                }]
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assetsDirs: ['dist', 'dist/styles']
            }
        },
        watch: {
            copy: {
                files: ['app/**', '!app/**/*.css', '!app/**/*.js'],
                tasks: ['build']
            },

            scripts: {
                files: ['app/scripts/app.js'],
                tasks: ['build']
            },

            styles: {
                files: ['app/styles/mystyles.css'],
                tasks: ['build']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },

                files: [
                  'app/{,*/}*.html',
                  '.tmp/styles/{,*/}*.css',
                  'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 8080,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },

            dist: {
                options: {
                    open: true,
                    base: {
                        path: '../json-server/public/',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            confusionApp: {
                files: [
                    {
                        'app/scripts/app.js': ['app/scripts/app.js'],
                        'app/scripts/controllers.js': ['app/scripts/controllers.js'],
                        'app/scripts/services.js': ['app/scripts/services.js']
                },
            ],
            },
        },


    });

    grunt.registerTask('build', [
            'clean:build',
            'jshint',
            'useminPrepare',
            'concat',
            'cssmin',
            'ngAnnotate',
            'uglify',
            'copy:dist',
            'copy:fonts',
            'filerev',
            'usemin',
            'copy:public'
        ]);

    grunt.registerTask('default', ['build','clean:tmp']);
    //grunt.registerTask('bc', ['build', 'clean:tmp']);
    grunt.registerTask('update', ['build',  'watch']);
    grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
};