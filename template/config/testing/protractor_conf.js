exports.config = {
	//seleniumAddress: 'http://95.138.169.233:4444/wd/hub',
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	specs: ['../../frontend/e2e_tests/*.js'],
	multiCapabilities: [{
		browserName: 'phantomjs',
		'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/phantomjs.exe',
	}, {
		browserName: 'chrome'
	}, {
		browserName: 'firefox'
	}]
}