import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

export function build(argv) {
    let completeCallbacks = [];

    let successBuiltThemes = [];
    let errorBuiltThemes = [];

    function completeCallbacksCall() {
        for (const cb of completeCallbacks) {
            require(cb)([errorBuiltThemes, successBuiltThemes]);
        }
    }

    function importer(url, prev, done) {
        if (url[0] === '~') {
            url = path.resolve('node_modules', url.substr(1));
        }

        return { file: url };
    }

    function generateThemeName(theme, pattern) {
        const v = {
            themeName: theme.name
        };
        return pattern.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = v[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    }

    try {
        const srcPath = path.join(process.cwd(), 'src');
        const themesInfo = JSON.parse(fs.readFileSync(argv && argv.c ? path.join(process.cwd(), argv.c) : path.join(srcPath, 'themes.json'), 'utf-8'));
        const themesScssPath = argv && argv.s ? (typeof argv.s === 'boolean' ? null : path.join(process.cwd(), argv.s)) : path.join(srcPath, 'themes.scss');
        const themesScss = fs.existsSync(themesScssPath) ? fs.readFileSync(themesScssPath, 'utf-8') : '';
        const outputDirectories = [];
        for (const dir of themesInfo.output.directories) {
            const dirPath = path.join(srcPath, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
                outputDirectories.push(dirPath);
            } else {
                outputDirectories.push(dirPath);
            }
        }
        if (themesInfo.hasOwnProperty('complete')) {
            if (typeof themesInfo.complete === 'string') { themesInfo.complete = [themesInfo.complete]; }
            for (const scriptPath of themesInfo.complete) {
                const fullScriptPath = path.join(srcPath, scriptPath);
                if (fs.existsSync(fullScriptPath)) {
                    completeCallbacks.push(fullScriptPath);
                }
            }
        }
        for (const theme of themesInfo.themes) {
            const content = argv && argv.mixinsOnly || theme.mixinsOnly ?
                `@import '~@angular/material/theming';
            @import '${theme.path}';
            ${themesScss}`
                : `@import '~@angular/material/theming';
        @import '${theme.path}';
        @if variable-exists(typography) {
            @include mat-core($typography);
        } @else {
            @include mat-core();
        }
        @include angular-material-theme($theme);
        ${themesScss}`;
            const themeFileNamePattern = (argv && argv.mixinsOnly) || theme.mixinsOnly
                ? (theme.outputNamePattern || themesInfo.output.mixinsOnlyNamePattern || theme.outputNamePattern || themesInfo.output.outputNamePattern || '{themeName}-mixins')
                : (theme.outputNamePattern || themesInfo.output.outputNamePattern || '{themeName}');
            const themeFileName = generateThemeName(theme, themeFileNamePattern);
            const dirThemes = outputDirectories.map(dir => ({
                regular: path.join(dir, themeFileName + '.css'),
                minified: path.join(dir, themeFileName + '.min.css'),
                map: path.join(dir, themeFileName + '.min.css.map')
            }));
            try {
                /* Build non-minified theme file */
                let res, resMin;
                if (dirThemes.some(t => fs.existsSync(t.regular)) && !(argv && argv.soft)) {
                    console.log('%s\x1b[4m\x1b[33m%s\x1b[0m', 'Build regular file for theme ', theme.name, themeFileName);
                    res = sass.renderSync({
                        data: content,
                        includePaths: [srcPath],
                        importer: importer
                    });
                }
                /* Build minified theme file and map */
                if (dirThemes.some(t => fs.existsSync(t.minified)) && !(argv && argv.soft)) {
                    console.log('%s\x1b[4m\x1b[33m%s\x1b[0m', 'Build minified file for theme ', theme.name, themeFileName);
                    resMin = dirThemes.map(dir =>
                        sass.renderSync({
                            data: content,
                            outFile: dir.minified,
                            outputStyle: 'compressed',
                            sourceMap: true,
                            includePaths: [srcPath],
                            importer: importer
                        })
                    );
                }
                /* Write files */
                for (let i = 0; i < dirThemes.length; i++) {
                    const dir = dirThemes[i];
                    const resMinDir = resMin && resMin[i];
                    if (res && fs.existsSync(dir.regular) && !(argv && argv.soft)) {
                        fs.writeFileSync(dir.regular, res.css);
                    }
                    if (resMinDir && fs.existsSync(dir.minified) && !(argv && argv.soft)) {
                        fs.writeFileSync(dir.minified, resMinDir.css);
                        fs.writeFileSync(dir.map, resMinDir.map);
                    }
                }
                successBuiltThemes.push(theme.name);
            } catch (err) {
                console.log(err);
                errorBuiltThemes.push(theme.name);
            }
        }
        console.log('\x1b[32m%s\x1b[0m', '  ✓ ' + successBuiltThemes.length + ' theme(s) was built');
        completeCallbacksCall();
    } catch (err) {
        console.log(err);
        completeCallbacksCall();
    }
}