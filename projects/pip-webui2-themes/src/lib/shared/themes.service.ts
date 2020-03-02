import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { defaultsDeep } from 'lodash';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

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
        private http: HttpClient,
        private styleManager: PipStyleManager
    ) {
        this.config = defaultsDeep(config, defaultPipThemesConfig);
    }

    private get useMinifiedExt(): string {
        return this.useMinified ? '.min' : '';
    }

    public get config(): PipThemesConfig {
        return this.configSub$.value;
    }

    public set config(config: PipThemesConfig) {
        this.configSub$.next(config);
        const themes = new Map<string, Theme>();
        this.config?.themes.forEach(theme => themes.set(theme.name, theme));
        this.themesSub$.next(themes);
    }

    public get defaultThemeName(): string {
        return this.config?.defaultThemeName ?? defaultPipThemesConfig.defaultThemeName;
    }

    public set defaultThemeName(defaultThemeName: string) {
        this.configSub$.next(Object.assign({}, this.config, { defaultThemeName }));
    }

    public get path(): string {
        return this.config?.path ?? defaultPipThemesConfig.path;
    }

    public set path(path: string) {
        this.configSub$.next(Object.assign({}, this.config, { path }));
    }

    public get namePatterns(): string[] {
        return this.config?.namePatterns ?? defaultPipThemesConfig.namePatterns;
    }

    public set namePatterns(namePatterns: string[]) {
        this.configSub$.next(Object.assign({}, this.config, { namePatterns }));
    }

    public get useMinified(): boolean {
        return this.config?.useMinified ?? defaultPipThemesConfig.useMinified;
    }

    public set useMinified(useMinified: boolean) {
        this.configSub$.next(Object.assign({}, this.config, { useMinified }));
    }

    public get currentTheme(): Theme {
        return this.currentThemeSub$.value;
    }

    public get themes(): Map<string, Theme> {
        return this.themesSub$.value;
    }

    public get themesArray(): Theme[] {
        return Array.from(this.themes.values());
    }

    /**
     * Init themes and select user theme or default one if it possible
     */
    public async initThemes() {
        const name: string = window && window.localStorage && window.localStorage.getItem(this.config.localStorageKey);
        const themes = this.themes;
        if (themes && themes.has(name)) {
            await this.selectTheme(name);
        } else if (this.config.defaultThemeName && themes && themes.has(this.config.defaultThemeName)) {
            await this.selectTheme(this.config.defaultThemeName);
        } else {
            console.warn('No themes found for provided name');
        }
    }

    /**
     * Register new theme or update existing one with new value
     * @param theme Theme
     * @param force Flag for force register and replace theme if it already registered
     */
    public registerTheme(theme: Theme, force?: boolean) {
        if (!theme || !theme.name || !this.themes) { console.warn('Theme or theme name wasn\'t provided'); return; }
        const themes = this.themesSub$.value;
        if (themes.has(theme.name) && !force) { console.warn('This theme was already provided. To '); return; }
        themes.set(theme.name, theme);
        this.themesSub$.next(themes);
    }

    /**
     * Remove theme from registered list and update current one if we remove current theme
     * @param themeName Name of theme
     */
    public removeTheme(themeName: string) {
        const themes = this.themesSub$.value;
        if (themes && themes.has(themeName)) {
            themes.delete(themeName);
            this.themesSub$.next(themes);
            if (this.currentTheme?.name === themeName) {
                this.initThemes();
            }
        }
    }

    /**
     * Select another registered theme
     * @param themeName Name of theme to select
     */
    public async selectTheme(themeName: string): Promise<void> {
        const themes = this.themes;
        if (themes && themes.has(themeName) && themeName !== this.currentTheme?.name) {
            const theme = themes.get(themeName);
            let newThemePath = theme.path || this.config?.path || 'assets/themes/';
            if (!newThemePath.endsWith('/')) { newThemePath += '/'; }
            const newStylesReqs = (theme.namePatterns || this.config?.namePatterns || ['{themeName}'])
                .map(p => generateThemeName(theme, p))
                .map(name => this.http.get(newThemePath + name + this.useMinifiedExt + '.css', {
                    responseType: 'text'
                }));
            const resp = await forkJoin(newStylesReqs)
                .toPromise();
            this.styleManager.removeStyle('theme');
            this.styleManager.setStyle('theme', resp.join('\n'));
            this.currentThemeSub$.next(theme);
            if (window && window.localStorage && this.config) {
                window.localStorage.setItem(this.config.localStorageKey, themeName);
            }
        } else {
            return Promise.resolve();
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
