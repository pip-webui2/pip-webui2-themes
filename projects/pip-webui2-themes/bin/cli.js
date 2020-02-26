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
  build - build all themes`
        );
        break;
}
