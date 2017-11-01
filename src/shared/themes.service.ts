import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const defaultTheme: string = 'pip-blue-theme';

@Injectable()
export class PipThemesService {

    private _selectedTheme: string = defaultTheme;
    private _themes: string[] = [
        "candy-theme",
        "unicorn-dark-theme",
        "pip-blue-theme",
        "pip-grey-theme",
        "pip-navy-theme",
        "pip-amber-theme",
        "pip-green-theme",
        "pip-orange-theme",
        "pip-pink-theme",
        "pip-dark-theme",
        "pip-black-theme",
        "bootbarn-warm-theme",
        "bootbarn-cool-theme",
        "bootbarn-mono-theme"
    ];

    private _themes$ = new BehaviorSubject<string[]>(this._themes);
    private _selectedTheme$ = new BehaviorSubject<string>(this._selectedTheme);

    public constructor() {
        this.selectedTheme = window.localStorage.getItem('theme') || defaultTheme;
    }

    public get themes$(): Observable<string[]> {
        return this._themes$;
    }

    public get themes(): string[] {
        return this._themes;
    }

    public set themes(themes: string[]) {
        this._themes = themes;
        this._themes$.next(themes);
    }    

    public get selectedTheme$(): Observable<string> {
        return this._selectedTheme$;
    }

    public get selectedTheme(): string {
        return this._selectedTheme;
    }

    public set selectedTheme(theme: string) {
        // Save selected theme to local storage
        window.localStorage.setItem('theme', theme);

        // Remove old theme name as a class to body
        document.body.classList.remove(this._selectedTheme);

        this._selectedTheme = theme;
        this._selectedTheme$.next(this._selectedTheme);

        // Add new theme name as a class to body
        document.body.classList.add(theme);
    }

}