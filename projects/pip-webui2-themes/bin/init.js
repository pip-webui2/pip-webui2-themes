import fs from 'fs';
import path from 'path';

export function init(argv) {
    let project = argv && (argv.project || argv.p);
    let srcPath;
    const angularJsonPath = path.join(process.cwd(), 'angular.json');
    if (fs.existsSync(angularJsonPath)) {
        var angularJson = JSON.parse(fs.readFileSync(angularJsonPath));
        if (!project) {
            if (!angularJson.hasOwnProperty('defaultProject')) {
                console.error('project not defined');
                return;
            }
            project = angularJson['defaultProject'];
        }
        if (!angularJson.hasOwnProperty('projects') || !angularJson['projects'].hasOwnProperty(project) || !angularJson['projects'][project].hasOwnProperty('sourceRoot')) {
            console.error('Project "' + project + '" has no "sourceRoot" property in angular.json');
        }
        srcPath = path.join(process.cwd(), angularJson['projects'][project]['sourceRoot']);
    } else {
        console.error('angular.json not found');
        return;
    }
    const themesJsonPath = path.join(srcPath, 'themes.json');
    const themesScssPath = path.join(srcPath, 'themes.scss');
    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath);
    }
    if (!fs.existsSync(themesJsonPath)) {
        let schemaPath = path.relative(srcPath, path.normalize(path.join(process.cwd(), 'node_modules/pip-webui2-themes/themes.schema.json'))).replace(/\\/g, '/');
        if (!schemaPath.startsWith('.')) { schemaPath = './' + schemaPath; }
        let pipBlueThemePath = path.relative(srcPath, path.normalize(path.join(process.cwd(), 'node_modules/pip-webui2-themes/assets/themes/pip-blue'))).replace(/\\/g, '/');
        if (!pipBlueThemePath.startsWith('.')) { pipBlueThemePath = './' + pipBlueThemePath; }
        fs.writeFileSync(themesJsonPath,
            `{
    "$schema": "${schemaPath}",
    "themes": [
        {
            "name": "pip-blue",
            "path": "${pipBlueThemePath}"
        }
    ],
    "output": {
        "directories": ["./assets/themes"]
    }
}`);
    }
    if (!fs.existsSync(themesScssPath)) {
        fs.writeFileSync(themesScssPath,
            `/* Import or define your theme-based mixins */

@mixin application-mixin($theme) {
    /*
    $primary: map-get($theme, primary);

    .primary-text {
        color: mat-color($primary);
    }

    .primary-background {
        background-color: mat-color($primary);
    }
    */
}


/* And call them! */
@include application-mixin($theme);
`);
    }
}