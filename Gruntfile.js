/**
 * Main Gruntfile
 *
 * For task-specific configs, look in /grunt
 */
module.exports = function(grunt) {
    'use strict';

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load tasks from grunt directory
    grunt.loadTasks('grunt');

    grunt.registerTask('serve', [
        'clean',
        //'copy:build',
        //'compass:dist',
        //'bower-install',
        //'concurrent:server',
        'configureProxies:server',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('preview', [
        'dist-prepare',
        'configureProxies:server',
        'connect:dist'
    ]);

    grunt.registerTask('dist', [
        'dist-prepare',
        'compress'
    ]);

    grunt.registerTask('dist-prepare', [
        'clean',
        'copy:build',
        'compass:dist',
        'autoprefixer',
        'useminPrepare',
        'usemin',
        'concat',
        'copy:dist',
        'file-creator:version'
    ]);

    // Default is to run serve task
    return grunt.registerTask('default', 'serve');
};
