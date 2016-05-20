describe('darwin homepage', function() {

	beforeEach(function() {
		return browser.ignoreSynchronization = true;
	});

	it('should be on correct page', function() {
		browser.get('http:/localhost:8080');
		browser.getTitle().then(function(title) {
			expect(title).toBe('Home | MasterCard Business Owner Toolbox');
		});
	});

});