#!/usr/bin/env node

require = require('esm')(module /*, options*/);
if (!process.argv || process.argv.length !== 3) {
    console.warn('You didn\'t specify command to run. Run "pip-webui2-themes help"');
    return;
}
switch (process.argv[2]) {
    case 'b':
    case 'build':
        require('./build').build();
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
