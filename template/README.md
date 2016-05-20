Darwin SaaS-Platform
====================

## Project setup

1. Make sure you have Ruby, Maven, Java, NodeJS and globally installed Grunt, Grunt-CLI, Protrator (if you want to have local E2E testing environment). 
 - ` npm install -g protractor ` or ` npm update -g protractor ` if you had installed before
 - ` npm install -g grunt `
2. ` npm run getgems ` for getting neccessary Ruby GEMs
2. ` npm install `
3. ` npm run setproject [--clean] [--notest]` or set up on legacy way
 - ` ./csb/mvn install [clean] [-DskipTests] `
4. ` ./csb/csb-webapp/mvn jetty:run ` to start the application

## Documentation

### Generate the latest version by codebase

` npm run doc `

### Further reading and static information pages

- Frontend Javascript documentation: ` ./docs/frontend `
- Frontend Javascript TDD/BDD test result and code coverage: ` ./docs/coverage `
- Frontend development process, templates and styling: ` ./docs/darwin-development.md `
- All other or not listed: ` https://bcsgsvn.atlassian.net/wiki/display/CSB/Project+Darwin+Home `

## Simple server

In case of you need access only the static/pre-generated files in docroot folder, you can run a simple static server.
It will load on the next avaliable port after the application's default port.

` npm start ` 

## Testing

If you want to have E2E test on your local, and assuming you have the necessary dependencies installed (see above) follow the description below:

- [if you using centralised test server] set up Selenium webdriver’s address in `./config/testing/protractor_conf.js`
- `webdriver-manager update` to make sure you have at least 2.45.0 version
- `webdriver-manager start` to have a working session hub on ` http://localhost:4444 ` (or distant if so)
- `npm test` or `npm run teste2e` for all tests or just e2e tests

### Commands available

- Default testing, run all test cases and coverage: ` npm test `,
- Test CORE and Project modules only, check code coverage: ` npm run testmodules `
- Run E2E tests on working application: ` npm run teste2e `
