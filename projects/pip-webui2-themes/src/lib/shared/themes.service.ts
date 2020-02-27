import { Injectable, Inject, Optional } from '@angular/core';
import { defaultsDeep } from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';

import { PipStyleManager } from './style-manager';
import { Theme } from './Theme';
import { PIP_THEMES_CONFIG, PipThemesConfig, defaultPipThemesConfig } from './ThemeConfig';

@Injectable({
    providedIn: 'root'
})
export class PipThemesService {

    private currentThemeSub$ = new BehaviorSubject<Theme>(null);
    private configSub$ = new BehaviorSubject<PipThemesConfig>(null);
    private themesSub$ = new BehaviorSubject<Map<string, Theme>>(new Map<string, Theme>());

    public config$: Observable<PipThemesConfig> = this.configSub$.asObservable();
    public currentTheme$: Observable<Theme> = this.currentThemeSub$.asObservable();
    public themes$: Observable<Map<string, Theme>> = this.themesSub$.asObservable();

    public constructor(
        @Optional() @Inject(PIP_THEMES_CONFIG) config: PipThemesConfig,
        private styleManager: PipStyleManager
    ) {
        this.config = defaultsDeep(config, defaultPipThemesConfig);
        const themes = new Map<string, Theme>();
        this.config.themes.forEach(theme => themes.set(theme.name, theme));
        this.themesSub$.next(themes);
    }

    public initThemes() {
        const name: string = window && window.localStorage && window.localStorage.getItem(this.config.localStorageKey);
        const themes = this.themes;
        if (themes.has(name)) {
            this.currentThemeSub$.next(themes.get(name));
            this.selectTheme(this.currentTheme.name);
        } else if (this.config.defaultTheme && themes.has(this.config.defaultTheme)) {
            this.currentThemeSub$.next(themes.get(this.config.defaultTheme));
            this.selectTheme(this.currentTheme.name);
        } else {
            console.warn('No themes found for provided name');
        }
    }

    private get useMinifiedExt(): string {
        return this.useMinified ? '.min' : '';
    }

    public get config(): PipThemesConfig {
        return this.configSub$.value;
    }

    public set config(config: PipThemesConfig) {
        this.configSub$.next(config);
    }

    public get defaultTheme(): string {
        return this.config.defaultTheme;
    }

    public set defaultTheme(defaultTheme: string) {
        this.config.defaultTheme = defaultTheme;
        this.configSub$.next(this.config);
    }

    public get path(): string {
        return this.config.path;
    }

    public set path(path: string) {
        this.config.path = path;
        this.configSub$.next(this.config);
    }

    public get namePatterns(): string[] {
        return this.config.namePatterns;
    }

    public set namePatterns(namePatterns: string[]) {
        this.config.namePatterns = namePatterns;
        this.configSub$.next(this.config);
    }

    public get useMinified(): boolean {
        return this.config.useMinified;
    }

    public set useMinified(useMinified: boolean) {
        this.config.useMinified = useMinified;
        this.configSub$.next(this.config);
    }

    public get currentTheme(): Theme {
        return this.currentThemeSub$.value;
    }

    public get themes(): Map<string, Theme> {
        return this.themesSub$.value;
    }

    public registerTheme(theme: Theme, force?: boolean) {
        if (!theme || !theme.name) { console.warn('Theme or theme name wasn\'t provided'); return; }
        const themes = this.themesSub$.value;
        if (themes.has(theme.name) && !force) { console.warn('This theme was already provided. To '); return; }
        themes.set(theme.name, theme);
        this.themesSub$.next(themes);
    }

    public removeTheme(themeName: string) {
        const themes = this.themesSub$.value;
        if (themes.has(themeName)) {
            themes.delete(themeName);
            this.themesSub$.next(themes);
        }
    }

    public selectTheme(themeName: string) {
        const themes = this.themes;
        if (themes.has(themeName)) {
            // Remove old theme
            const currentTheme = this.currentTheme;
            (currentTheme.namePatterns || this.config.namePatterns || ['{themeName}'])
                .map(p => generateThemeName(currentTheme, p))
                .forEach(name => this.styleManager.removeStyle(name));
            // Include new theme
            const theme = themes.get(themeName);
            this.currentThemeSub$.next(theme);
            (theme.namePatterns || this.config.namePatterns || ['{themeName}'])
                .map(p => generateThemeName(theme, p))
                .forEach(name => this.styleManager.setStyle(name, `assets/themes/${name}${this.useMinifiedExt}.css`));
            if (window && window.localStorage) {
                window.localStorage.setItem(this.config.localStorageKey, theme.name);
            }
        }
    }

}

function generateThemeName(theme: Theme, pattern: string) {
    const v = {
        themeName: theme.name
    };
    return pattern.replace(/{([^{}]*)}/g,
        function (a, b) {
            const r = v[b];
            return typeof r === 'string' || typeof r === 'number' ? r.toString() : a;
        }
    );
}
