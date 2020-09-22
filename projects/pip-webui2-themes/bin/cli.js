#!/usr/bin/env node

require = require('esm')(module /*, options*/);
const argv = require('yargs').argv;
if (!argv || !Object.keys(argv._).length) {
    console.warn('You didn\'t specify command to run. Run "pip-webui2-themes help"');
    return;
}
switch (argv._[0]) {
    case 'b':
    case 'build':
        require('./build').build(argv);
        break;
    case 'i':
    case 'init':
        require('./init').init(argv);
        break;
    case '-h':
    case '--h':
    case 'h':
    case '-help':
    case '--help':
    case 'help':
    default:
        console.log(
            `This cli command is part of "pip-webui2-themes" project and it can build your themes.
Available commands:
  help  - show this guide
  init  - create src/themes.json and src/themes.scss files. Available options:
    --project <project name> - use not default project
  build - build all themes. Available options:
    --soft       - do not replace files if they're exist
    --c <path>   - build with custom config file instead of src/themes.json
    --s <path>   - build with custom styles file instead of src/themes.scss (don't set path to not use styles file at all)
    --mixinsOnly - build only application mixins
    --project <project name> - use not default project`
        );
        break;
}
