import fs from 'fs';
import path from 'path';
import sass from 'node-sass';

export function build() {
    let completeCallbacks = [];

    let successBuiltThemes = [];
    let errorBuiltThemes = [];

    function completeCallbacksCall() {
        for (const cb of completeCallbacks) {
            require(cb)([errorBuiltThemes, successBuiltThemes]);
        }
    }

    try {
        const srcPath = path.join(process.cwd(), 'src');
        const themesInfo = JSON.parse(fs.readFileSync(path.join(srcPath, 'themes.json'), 'utf-8'));
        const themesScss = fs.existsSync(path.join(srcPath, 'themes.scss')) ? fs.readFileSync(path.join(srcPath, 'themes.scss'), 'utf-8') : '';
        const outputDirectories = [];
        for (const dirInfo of themesInfo.outputDirectories) {
            const dirPath = path.join(srcPath, dirInfo.path);
            if (!fs.existsSync(dirPath)) {
                if (dirInfo.force) {
                    fs.mkdirSync(dirPath, { recursive: true });
                    outputDirectories.push(dirPath);
                }
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
            const content = `
        @import '~@angular/material/theming';
        @import '${theme.path}';
        @if variable-exists(typography) {
            @include mat-core($typography);
        } @else {
            @include mat-core();
        }
        @include angular-material-theme($theme);
        ${themesScss}`;
            try {
                const res = sass.renderSync({
                    data: content,
                    includePaths: [srcPath],
                    importer: function (url, prev, done) {
                        if (url[0] === '~') {
                            url = path.resolve('node_modules', url.substr(1));
                        }

                        return { file: url };
                    }
                });
                const resMin = sass.renderSync({
                    data: content,
                    outputStyle: 'compressed',
                    sourceMap: true,
                    includePaths: [srcPath],
                    importer: function (url, prev, done) {
                        if (url[0] === '~') {
                            url = path.resolve('node_modules', url.substr(1));
                        }

                        return { file: url };
                    }
                });
                for (const dir of outputDirectories) {
                    fs.writeFileSync(path.join(dir, theme.name + '.css'), res.css);
                    fs.writeFileSync(path.join(dir, theme.name + '.min.css'), resMin.css);
                    fs.writeFileSync(path.join(dir, theme.name + '.min.css.map'), resMin.css);
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
        completeCallbacksCall();
    }
}