import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PipThemesService {

    private _localTheme: string;
    private _arrayThemes: string[] = ["candy-theme", "unicorn-dark-theme", "pip-blue-theme", "pip-amber-theme",  "pip-green-theme", "pip-orange-theme", "pip-pink-theme"];
    private _theme$: BehaviorSubject<string>;

    public constructor() {
        this._localTheme = window.localStorage.getItem('theme') || this._arrayThemes[0];
        this._theme$ = new BehaviorSubject<string>(this._localTheme);
        this.useTheme(this._localTheme);
    }

    public get themes(): string[] {
        return this._arrayThemes;
    }

    public get theme(): string {
        return this._localTheme;
    }

    public get theme$(): Observable<string> {
        return this._theme$;
    }

    public useTheme(theme: string) {

        if (!theme) return null;

        window.localStorage.setItem('theme', theme);
        document.body.classList.remove(this._localTheme);
        this._localTheme = theme;
        this._theme$.next(this._localTheme);
        document.body.classList.add(theme);

    }

}