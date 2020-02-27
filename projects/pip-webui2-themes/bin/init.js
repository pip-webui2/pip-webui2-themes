import fs from 'fs';
import path from 'path';

export function init(argv) {
    const srcPath = path.join(process.cwd(), argv && argv.src || 'src');
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