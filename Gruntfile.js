module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/snap.js',
				dest: 'build/snap.min.js'
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'external/bmoor.min.js',
					'src/snap/observer/Map.js',
					'src/snap/observer/Collection.js',
					'src/snap/Core.js', 
					'src/snap/lib/Bootstrap.js',
					'src/snap/lib/Stream.js',
					'src/snap/service/Abstract.js',
					'src/snap/templating/Decorator.js',
					'src/jquery/jquery.jqote2.js',
					'src/snap/templating/JQote.js',
					'src/snap/node/Basic.js',
					'src/snap/node/View.js',
					'src/snap/node/Text.js',
					'src/snap/node/Debug.js',
					'src/snap/node/Script.js',
					'src/snap/node/Style.js',
					'src/snap/node/Switch.js',
					'src/snap/node/List.js',
					'src/snap/node/input/Basic.js',
					'src/snap/node/input/Text.js',
					'src/snap/node/input/Checked.js',
					'src/snap/node/input/Checkbox.js',
					'src/snap/node/input/Button.js',
					'src/snap/node/input/Disabled.js',
					'src/snap/node/input/Required.js',
					'src/snap/node/input/Select.js',
					'src/snap/node/input/Validation.js',
					'src/snap/node/Form.js',
					'src/snap/controller/Abstract.js',
					'src/snap/controller/Form.js',
					'src/snap/controller/Serviced.js'
				],
				dest: 'build/snap.js',
			},
		},
		jshint: {
			options : {
				strict : false,
				laxbreak : true,
				smarttabs : true,
				evil : true
			},
			all : ['src/snap/Core.js','src/snap/**/*.js']
		}
  	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['jshint:all','concat','uglify']);
};
