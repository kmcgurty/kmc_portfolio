module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},

			options: {
				spawn: false,
				livereload: {
					host: '192.168.1.12'
				}
			},

			www: {
				files: ['bin/*', 'routes/*.js'],
				tasks: ['express:dev']
			},

			scripts: {
				files: ['public/javascript/src/*.js'],
				tasks: ['build']
			},

			css: {
				files: 'public/stylesheets/*.scss'
			},

			html: {
				files: 'views/*.hbs',
			}
		},

		jshint: {
			all: ['*.js', 'public/javascript/src/*.js'],
			options: {
				"esnext": true
			}
		},

		uglify: {
			main: {
				options: {
					sourceMap: true,
					banner: '/* \n' +
							' Source: https://github.com/kmcgurty/kmc_website \n' +
							' Build date: <%= grunt.template.today("mm-dd-yyyy") %> \n' +
							'*/ \n "use strict" \n',
				},
				files: {
					'public/javascript/main.min.js': ['public/javascript/src/*.js']
				}
			}
		},

		express: {
			dev: {
				options: {
					script: 'app.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['express:dev', 'build', 'watch']);
	grunt.registerTask('build', ['jshint', 'uglify']);
};