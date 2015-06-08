'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            dev: {
                options: {
                    paths: ["dev/styles"],
                    sourceMap: true,
                    sourceMapFileInline: true,
                },
                src: 'dev/styles/style.less',
                dest: 'dev/styles/style.css'
            },
            prod: {
                options: {
                    paths: ["dev/styles"],
                },
                src: 'dev/styles/style.less',
                dest: 'prod/styles/style.css'
            }
        },
        watch: {
            less: {
                files: ['dev/styles/*.less'],
                tasks: ['less']
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dev/**/*.*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./dev/"
                    },
                    // enables external access
                    online: true,
                }
            },
            prod: {
                bsFiles: {
                    src: [
                        'prod/**/*.*'
                    ]
                },
                options: {
                    server: {
                        baseDir: "./prod/"
                    },
                    // enables external access
                    online: true,
                }
            },
        },
        clean: {
            prod: {
                src: [
                    "_tmp",
                    "prod", 
                ]
            }
        },
        copy: {
            prod: {
                expand: true,
                cwd: 'dev/',
                src: [
                    // 'img/**',
                    // 'pict/**',

                    'fonts/**',
                    'js/**',
                    'favicon.ico',
                    '*.html'
                ],
                dest: 'prod/',
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 versions'],
                    remove: false,
                },
                src:  'prod/styles/style.css',
                dest: 'prod/styles/style.css',
            }
        },
        cssmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'prod/styles/',
                    src:  'style.css',
                    dest: 'prod/styles/',
                }]
            }
        },
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    // svgoPlugins: [{
                    //     removeViewBox: false
                    // }],
                    // use: [mozjpeg()],
                    // progressive: true,
                },
                files: [{
                    expand: true, 
                    cwd: 'dev/img/', 
                    src: ['**/*.*'],
                    dest: 'prod/img/'
                }, {
                    expand: true, 
                    cwd: 'dev/pict/', 
                    src: ['**/*.*'],
                    dest: 'prod/pict/'
                }]
            }
        },
    });
    
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', [
        'less:dev',
        'browserSync:dev',
        'watch',
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'less:prod',
        'autoprefixer',
        'cssmin',
        'imagemin',
    ]);

    grunt.registerTask('prod', [
        'build',
        'browserSync:prod',
    ]);

    grunt.registerTask('default', [
        'dev',
    ]);
};
