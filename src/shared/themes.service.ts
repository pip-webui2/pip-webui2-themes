import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ThemeModel } from './themes.model';

export const defaultTheme: string = 'pip-blue-theme';
export const defaultPalette: string = 'light';

@Injectable()
export class PipThemesService {

    private _selectedTheme: ThemeModel = new ThemeModel();
    private _themes: ThemeModel[] = [
        {
            name: "candy-theme",
            palette: 'light'
        }, {
            name: "unicorn-dark-theme",
            palette: 'dark'
        }, {
            name: "pip-blue-theme",
            palette: 'light'
        }, {
            name: "pip-grey-theme",
            palette: 'light'
        }, {
            name: "pip-navy-theme",
            palette: 'light'
        }, {
            name: "pip-amber-theme",
            palette: 'light'
        }, {
            name: "pip-green-theme",
            palette: 'light'
        }, {
            name: "pip-orange-theme",
            palette: 'light'
        }, {
            name: "pip-pink-theme",
            palette: 'light'
        }, {
            name: "pip-dark-theme",
            palette: 'dark'
        }, {
            name: "pip-black-theme",
            palette: 'dark'
        }, {
            name: "bootbarn-warm-theme",
            palette: 'light'
        }, {
            name: "bootbarn-cool-theme",
            palette: 'light'
        }, {
            name: "bootbarn-mono-theme",
            palette: 'light'
        }
    ];

    private _themes$ = new BehaviorSubject<ThemeModel[]>(this._themes);
    private _selectedTheme$ = new BehaviorSubject<ThemeModel>(this._selectedTheme);

    public constructor() {
        let theme: string = window.localStorage.getItem('theme');
        if (theme) {
            this.selectedTheme = this._themes.find((item) => { return item.name == theme }) || { name: theme, palette: defaultPalette };
        } else {
            this.selectedTheme = { name: defaultTheme, palette: defaultPalette };
        }
        let selectedModel: ThemeModel = new ThemeModel();
        selectedModel = this._themes.find((item: ThemeModel) => {
            return item.name == this._selectedTheme.name;
        });
    }

    public get themes$(): Observable<ThemeModel[]> {
        return this._themes$;
    }

    public get themes(): ThemeModel[] {
        return this._themes;
    }

    public set themes(themes: ThemeModel[]) {
        this._themes = themes;
        this._themes$.next(themes);
    }

    public get selectedTheme$(): Observable<ThemeModel> {
        return this._selectedTheme$;
    }

    public get selectedTheme(): ThemeModel {
        return this._selectedTheme;
    }

    public set selectedTheme(theme: ThemeModel) {
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