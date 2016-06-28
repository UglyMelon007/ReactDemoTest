module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            html: {
                files: [{
                    flatten: true, //只复制文件不复制文件夹
                    expand: true,
                    cwd: 'bower_components',
                    src: ['*/*.min.js', '*/dist/*.min.js', '*/dist/**/*.min.js'],
                    dest: 'Resource/js/'
                }, {
                    flatten: true,
                    expand: true,
                    cwd: 'bower_components',
                    src: ['*/*.min.css', '*/dist/*.min.css', '*/dist/**/*.min.css'],
                    dest: 'Resource/css/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);
};
