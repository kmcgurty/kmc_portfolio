module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				options: {
					livereload: false
				}
			},

			options: {
				spawn: false,
				livereload: {
					host: '192.168.1.12'
				}
			},

			scripts: {
				files: ['src/javascript/*.js'],
				tasks: ['build', 'express:dev']
			},

			css: {
				files: 'public/stylesheets/*.scss'
			},

			html: {
				files: 'views/*.hbs',
			}
		},

		jshint: {
			all: ['*.js', 'src/javascript/*.js'],
			options: {
				"esnext": true
			}
		},

		uglify: {
			main: {
				options: {
					banner: '/* \n' +
							' Source: https://github.com/kmcgurty/kmc_website \n' +
							' Build date: <%= grunt.template.today("mm-dd-yyyy") %> \n' +
							'*/ \n',
				},
				files: {
					'public/javascript/built.js': ['src/javascript/*.js']
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