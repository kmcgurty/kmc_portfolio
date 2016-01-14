module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['routes/*.js'],
				tasks: ['jshint', 'express:dev'],
				options: {
					livereload: {
						host: '192.168.1.1'
					},
					spawn: false
				},
			},
			css: {
				files: 'public/stylesheets/*.scss',
				options: {
					livereload: {
						host: '92.168.1.12'
					}
				}
			}
		},

		jshint: {
			all: ['*.js', 'routes/*.js'],
			options: {
				"esnext": true
			}
		},

		express: {
			dev: {
				options: {
					script: 'app.js'
				}
			}
		},

		'sftp-deploy': {
			build: {
				auth: {
					host: 'kmcgurty.com',
					port: 22,
					authKey: 'key1'
				},
				cache: 'sftpCache.json',
				src: '/home/kmc/Desktop/code/kmc_portfolio/',
				dest: './server/',
				exclusions: ['node_modules/*', '.ftppass'],
				concurrency: 4,
				progress: true
			}
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-sftp-deploy');

	grunt.registerTask('default', ['express:dev', 'watch']);
};