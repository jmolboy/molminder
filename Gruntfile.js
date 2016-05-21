/* global require, module */

var path = require('path');
module.exports = function(grunt) {
    'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);


    var pkg = grunt.file.readJSON('package.json');

	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	var banner = '/*!\n' +
	    ' * ====================================================\n' +
	    ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
	    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
	    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
	    ' * GitHub: <%= pkg.repository.url %> \n' +
	    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
	    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
	    ' * ====================================================\n' +
	    ' */\n\n';

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: pkg,

	    yeoman: appConfig,
       
        clean: {
            last: [
	            '.tmp',
	            'lib/*.js',
	            'lib/*.css',
	            'lib/*.css.map'
            ],
	        clstmp: ['.tmp']
        },
		
        // concat
        // concat: {
        //     closure: {
        //         options: {
        //             banner: banner + '(function () {\n',
        //             footer: expose + '})();'
        //         },
        //         files: {
        // 	                'dist/kityminder.editor.js': [
        // 		                '.tmp/scripts/kityminder.editor.logic.js',
        // 		                '.tmp/scripts/kityminder.app.annotated.js',
        // 		                '.tmp/scripts/templates.annotated.js',
        // 		                '.tmp/scripts/service/*.js',
        // 		                '.tmp/scripts/filter/*.js',
        //                 '.tmp/scripts/dialog/**/*.js',
        // 		                '.tmp/scripts/directive/**/*.js'
        // 	                ]
        //         }
        //     }
        // },
			
	    // Automatically inject Bower components into the app
	    wiredep: {
	    		    dev: {
	    			    src: ['index.html'],
	    			    devDependencies: false
	    		    },
				    options: {
				           //cwd: '<%= yeoman.app %>'
						cwd: './'
					}
	    },
		
		// wiredep: {
		// 	task: {
		// 	    // Point to the files that should be updated when
		// 	    // you run `grunt wiredep`
		// 	    src: [
		// 	      'index.html',   // .html support...
		// 	    ],
		//
		// 	    options: {
		// 	      // See wiredep's configuration documentation for the options
		// 	      // you may pass:
		//
		// 	      // https://github.com/taptapship/wiredep#configuration
		// 	    }
		// 	}
		// },
		
		
        uglify: {
            options: {
                banner: banner
            },
            minimize: {
                files: [{
	                src: 'app.js',
	                dest:'app.min.js'
                }]
            }
        },
		
		bower: {
		    install: {
		      options: {
		        targetDir: './lib',
		        layout: 'byType',//byType,byComponent
		        install: true,
		        verbose: false,
		        cleanTargetDir: true,
		        cleanBowerDir: false,
		        bowerOptions: {}
			  }
		    }
		},

    });
   
	grunt.loadNpmTasks('grunt-bower-task');	
	grunt.loadNpmTasks('grunt-bower-concat');
};