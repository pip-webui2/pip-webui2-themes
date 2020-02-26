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
    private config: PipThemesConfig;
    private themesSub$ = new BehaviorSubject<Map<string, Theme>>(new Map<string, Theme>());

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
            this.styleManager.setStyle('theme', `assets/themes/${name}${this.useMinifiedExt}.css`);
        } else if (this.config.defaultTheme && themes.has(this.config.defaultTheme)) {
            this.currentThemeSub$.next(themes.get(this.config.defaultTheme));
            this.styleManager.setStyle('theme', `assets/themes/${this.config.defaultTheme}${this.useMinifiedExt}.css`);
        } else {
            console.warn('No themes found for provided name');
        }
    }

    private get useMinifiedExt(): string {
        return this.useMinified ? '.min' : '';
    }

    public get defaultTheme(): string {
        return this.config.defaultTheme;
    }

    public set defaultTheme(defaultTheme: string) {
        this.config.defaultTheme = defaultTheme;
    }

    public get path(): string {
        return this.config.path;
    }

    public set path(path: string) {
        this.config.path = path;
    }

    public get useMinified(): boolean {
        return this.config.useMinified;
    }

    public set useMinified(useMinified: boolean) {
        this.config.useMinified = useMinified;
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
            this.currentThemeSub$.next(themes.get(themeName));
            this.styleManager.setStyle('theme', `assets/themes/${themeName}${this.useMinifiedExt}.css`);
        }
    }

}
