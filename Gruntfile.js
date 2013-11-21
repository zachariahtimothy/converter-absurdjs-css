'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

  	grunt.initConfig({
  		convert: {
  			server: {
  				directory: 'test/mysite.css'
  			}
  		},
      jasmine_node: {
        projectRoot: "./test"
      },
	   	karma: {
	    	unit: {
		    	configFile: 'karma.conf.js'
			}
		}
	});

  	grunt.registerMultiTask('convert', 'Grunt plugin for AbsurdJS Converter', function () {
  		var server = require('server');
  		var self = this;

  	});

	grunt.registerTask('test', [
      'jasmine_node',
    	//'karma'
  	]);

  	grunt.registerTask('default', [
	    'test',
	    'convert:server'
	  ]);
};