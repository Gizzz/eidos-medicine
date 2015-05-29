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
            // task: {
                less: {
                    files: ['dev/styles/*.less'],
                    tasks: ['less']
                },
                // ,
            // }
        },
        browserSync: {
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
            }
        },
        clean: {
            prod: {
                src: ["prod"]
            }
        },
        copy: {
            prod: {
                expand: true,
                cwd: 'dev/',
                src: [
                    'img/**',
                    'pict/**',

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
    });
    
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', [
        'less:dev',
        'browserSync',
        'watch',
    ]);

    grunt.registerTask('prod', [
        'clean',
        'copy',
        'less:prod',
        'autoprefixer',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'dev',
    ]);
};
