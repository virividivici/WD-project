Darwin Frontend - CORE
====================================

Here are placed all the configuration files, common libraries, components and the main code base for Darwin project's front end part (hereinafter called FE CORE).
The files here are not intend to use in their own, however all modules are has to made in universal and reusable format, keeping their dependencies as low as possible.
If you are not attend to develop any FE CORE modules, you are no need to do any further actions.

In case of you plan to work on FE CORE


## Requirements

- install [NodeJS](//nodejs.org)
- install [Git](//git-scm.com/download/win) or [Github for Windows](//windows.github.com)
- install Grunt ` npm install -g grunt ` and [Grunt CLI] ` npm install -g grunt-cli `
- get the repo's master branch [git clone](//bitbucket.org/bcsgdev/darwin-frontend-core.git)
- in project root ` $ npm install `

Now you can develop CORE modules.


## Few things which need to not forget

- Modules are organized as features, place all belongings into the same folder
   - Styles has `.scss` extension, and can have as many as you want. Do not import anything outside of the feature
   - The feature can have as many HTML fragments as needed, all of them will output into the `DOCROOT/partials` folder
   - Script can only one per feature, named as `module.js`. This module has to contain all belonging controls, services, directives, etc.
   - Set the first line of test specification to the feature file: ` /// <reference path="{{FEATURENAME}}/module.js"> `


## Available Commands

` $ npm test ` Test the whole CORE repository and show possible Javascript issues, such as syntax errors, usability and performance recommendations. After this, it start the UNIT testing process, and if no errors you'll get a green light. At the end of process you can see the report of code coverage, as well as these report are avaliable in the `coverage` folder too.


*Note* You should not commit anything without testing and/or failed tests.
*Note* You should try to reach at least 70% of code coverage.


