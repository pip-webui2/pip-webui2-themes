import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Theme } from './Theme';
import { THEMES_CONFIG, ThemesConfig } from './ThemeConfig';

@Injectable()
export class PipThemesService {
    private _selectedTheme: Theme = new Theme();

    private _themes$;
    private _selectedTheme$;
    private _selectedThemeName$;

    public constructor(
        @Inject(THEMES_CONFIG) private config: ThemesConfig
    ) {
        // Load theme name from the local storage
        const name: string = window.localStorage.getItem('theme');

        // Set theme name
        for (const theme of this.config.themes) {
            if (theme.name === name) {
                this._selectedTheme = theme;
                break;
            } else if (this._selectedTheme == null || theme.name === this.config.defaultThemeName) {
                this._selectedTheme = theme;
            }
        }

        // Create observables
        this._themes$ = new BehaviorSubject<Theme[]>(this.config.themes);
        this._selectedTheme$ = new BehaviorSubject<Theme>(this._selectedTheme);
        this._selectedThemeName$ = new BehaviorSubject<string>(this._selectedTheme.name);
        this.selectedTheme = this._selectedTheme;
    }

    public get themes$(): Observable<Theme[]> {
        return this._themes$;
    }

    public get themes(): Theme[] {
        return this.config.themes;
    }

    public set themes(themes: Theme[]) {
        this.config.themes = themes;
        this._themes$.next(themes);
    }

    public get selectedThemeName(): string {
        return this._selectedTheme && this._selectedTheme.name;
    }

    public set selectedThemeName(name: string) {
        for (const theme of this.config.themes) {
            if (theme.name === name) {
                this.selectedTheme = theme;
                break;
            }
        }
    }

    public get selectedTheme$(): Observable<Theme> {
        return this._selectedTheme$;
    }

    public get selectedTheme(): Theme {
        return this._selectedTheme;
    }

    public set selectedTheme(theme: Theme) {
        if (theme == null) { return; }

        // Save selected theme to local storage
        window.localStorage.setItem('theme', theme.name);

        // Remove old theme name as a class to body
        document.body.classList.remove(this._selectedTheme.name);

        this._selectedTheme = theme;
        this._selectedTheme$.next(this._selectedTheme);

        // Add new theme name as a class to body
        document.body.classList.add(theme.name);
    }

}
