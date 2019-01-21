import { InjectionToken } from '@angular/core';

export class Theme {
    name: string;
    palette = 'light';
}

export type Themes = Theme[];

export const DEFAULT_THEME_NAME = new InjectionToken<string>('default theme name');
