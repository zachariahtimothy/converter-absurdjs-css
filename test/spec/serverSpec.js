'use strict';



describe('Server Spec', function () {
	var server;
	var testData = {
		directory: './test'
	};

	beforeEach(function () {
		server = require('../../server')(testData);
	});

	it('should load', function () {
		expect(true).toBe(true);
	});
});