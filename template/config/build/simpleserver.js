var restify = require('restify'),
	fs = require('fs'),
	packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8')),
	server = restify.createServer({
		name: 'SimpleServerSuite',
		version: packagejson.version
	});

server
	.use(restify.bodyParser());

server.get(/.*/, restify.serveStatic({
	'directory': packagejson.application.docrootFolder,
	'default': 'index.html'
}));



server.listen((packagejson.application.port + 1), function() {
	console.info('========================================================');
	console.info('');
	console.info('=============== Simple server is running ===============');
	console.info('Listening at %s, version is %s', server.url, packagejson.version);
	console.info('');
	console.info('   Press CTRL/CMD + C to exit');
	console.info('   To watch changes run "grunt" in a new window');
	console.info('');
	console.info('========================================================');
});