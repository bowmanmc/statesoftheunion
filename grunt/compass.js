'use strict';

module.exports = function(grunt) {

    grunt.config('compass', {
        options: {
            sassDir: 'app/styles',
            cssDir: 'app/styles',
            generatedImagesDir: 'app/images/generated',
            imagesDir: 'app/images',
            javascriptsDir: 'app/modules',
            fontsDir: 'app/fonts',
            importPath: 'app/bower_components',
            httpImagesPath: 'app/images',
            httpGeneratedImagesPath: 'app/images/generated',
            httpFontsPath: 'app/fonts',
            relativeAssets: false,
            assetCacheBuster: false,
            raw: 'Sass::Script::Number.precision = 10\n'
        },
        dist: {
            options: {
                generatedImagesDir: 'app/images/generated'
            }
        },
        server: {
            options: {
                debugInfo: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
};
