const fs = require('fs');
const path = require('path');

const srcPath = path.join(process.env.INIT_CWD || path.resolve("../../", __dirname), 'src');
const themesJsonPath = path.join(srcPath, 'themes.json');
const themesScssPath = path.join(srcPath, 'themes.scss');
if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath);
}
if (!fs.existsSync(themesJsonPath)) {
    fs.writeFileSync(themesJsonPath,
        `{
    "$schema": "../node_modules/pip-webui2-themes/themes.schema.json",
    "themes": [
        {
            "name": "pip-blue",
            "path": "../node_modules/pip-webui2-themes/assets/themes/pip-blue"
        }
    ],
    "outputDirectories": [
        {
            "path": "./assets/themes",
            "force": true
        }
    ]
}`);
}
if (!fs.existsSync(themesScssPath)) {
    fs.writeFileSync(themesScssPath,
        `/* Import or define your theme-based mixins */

// @mixin example-mixin($theme) {
//     $primary: map-get($theme, primary);
// 
//     .primary-text {
//         color: mat-color($primary);
//     }
// 
//     .primary-background {
//         background-color: mat-color($primary);
//     }
// }

/* And call them! */
// @include example-mixin($theme);
`);
}
