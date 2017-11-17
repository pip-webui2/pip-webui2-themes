import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Theme } from './themes.model';

export const defaultTheme: string = 'pip-blue-theme';

@Injectable()
export class PipThemesService {
    private _selectedTheme: Theme = new Theme();
    private _themes: Theme[] = [
        {
            name: "candy-theme",
            palette: 'light'
        },
        {
            name: "unicorn-dark-theme",
            palette: 'dark'
        },
        {
            name: "pip-blue-theme",
            palette: 'light'
        },
        {
            name: "pip-grey-theme",
            palette: 'light'
        },
        {
            name: "pip-navy-theme",
            palette: 'light'
        },
        {
            name: "pip-amber-theme",
            palette: 'light'
        },
        {
            name: "pip-green-theme",
            palette: 'light'
        },
        {
            name: "pip-orange-theme",
            palette: 'light'
        },
        {
            name: "pip-pink-theme",
            palette: 'light'
        },
        {
            name: "pip-dark-theme",
            palette: 'dark'
        },
        {
            name: "pip-black-theme",
            palette: 'dark'
        },
        {
            name: "bootbarn-warm-theme",
            palette: 'light'
        },
        {
            name: "bootbarn-cool-theme",
            palette: 'light'
        },
        {
            name: "bootbarn-mono-theme",
            palette: 'light'
        }
    ];

    private _themes$;
    private _selectedTheme$;
    private _selectedThemeName$;
    
    public constructor() {
        // Load theme name from the local storage
        let name: string = window.localStorage.getItem('theme');

        // Set theme name
        for (let theme of this._themes) {
            if (theme.name == name) {
                this._selectedTheme = theme;
                break;
            } else if (this._selectedTheme == null || theme.name == defaultTheme) {
                this._selectedTheme = theme;
            }
        }

        // Create observables
        this._themes$ = new BehaviorSubject<Theme[]>(this._themes);
        this._selectedTheme$ = new BehaviorSubject<Theme>(this._selectedTheme);
        this._selectedThemeName$ = new BehaviorSubject<string>(this._selectedTheme.name);
        this.selectedTheme = this._selectedTheme;
    }

    public get themes$(): Observable<Theme[]> {
        return this._themes$;
    }

    public get themes(): Theme[] {
        return this._themes;
    }

    public set themes(themes: Theme[]) {
        this._themes = themes;
        this._themes$.next(themes);
    }

    public get selectedThemeName(): string {
        return this._selectedTheme ? this._selectedTheme.name : null;
    }

    public set selectedThemeName(name: string) {
        for (let theme of this._themes) {
            if (theme.name == name) {
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
        if (theme == null) return;

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