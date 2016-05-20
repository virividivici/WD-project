Darwin SaaS
===========

Here are placed all project-related frontend source files, bespoke components, custom features, and all style ovverrides.
This folder has to contain the (desirable) up to date CORE files and all related components.

After you installed all requisites, you can follow the wizard steps to set up this current project.

## Requirements

- install [NodeJS](//nodejs.org)
- install [Git](//git-scm.com/download/win) or [Github for Windows](//windows.github.com) or [SourceTree](//www.sourcetreeapp.com)
- install [Ruby](//rubyinstaller.org)
- install [Maven](//maven.apache.org/guides/getting-started/windows-prerequisites.html) (and [Java](//www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html))
- optional: install/update [Powershell](//social.technet.microsoft.com/wiki/contents/articles/21016.how-to-install-windows-powershell-4-0.aspx) (Git Shell also works)

 
## Possible fails

- `'npm' is not recognized as internal or external command(...)` Probably you have not set up the PATH environment variable
- `SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed(...)` Ruby GEMs SSL error, follow the workaround [here](//gist.github.com/luislavena/f064211759ee0f806c88)


## Project setup

1. make sure all relevant components are already set up and placed in the environment tables (path)
2. `$ npm install -g grunt-cli`
3. go to `./` and `$ npm install`
4. `$ grunt` will build the whole project, as well as start watching for changes
