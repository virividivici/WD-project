/**
 * usage: npm run setproject
 * optional: --clean: install project as unique instance
 * optional: --notest : install without running unit tests
 */

var clean = process.env.npm_config_clean || false,
	notest = process.env.npm_config_notest || false,
	chalk = require('chalk'),
	spawn = require('child_process').spawn,
	ls = null;

console.info(chalk.green.bold("Setting up project, clean:"), chalk.white(clean), chalk.green.bold("notest:"), chalk.white(notest));

clean = (clean) ? 'clean' : '';
notest = (notest) ? ' -D maven.test.skip=true' : ''
ls = spawn('cmd.exe', ['/c', 'mvn ' + clean + ' install' + notest], {
	cwd: './csb/'
});

ls.stdout.on('data', function(data) {
	console.log('' + data);
	if (data.toString().indexOf('[ERROR]') > -1) {
		console.log(chalk.red.bold("There is an error"));
	}
});

ls.on('exit', function(code) {
	if (code === 1) {
		console.log(chalk.red.bold("The installation process interrupted because of an unexpected error."));
		console.log(chalk.white("For further info, please see the documentation and follow the step-by-step installation."));
	}
	if (code === 0) {
		console.info(chalk.green.bold("The project set up is finished, now you can run the application."));
	}
});