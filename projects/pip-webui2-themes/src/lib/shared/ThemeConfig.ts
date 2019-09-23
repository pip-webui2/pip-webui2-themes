import { Theme } from './Theme';
import { InjectionToken } from '@angular/core';

export class ThemesConfig {
    public defaultThemeName: string;
    public themes: Theme[];
    public lsKey: string;
}

export const THEMES_CONFIG = new InjectionToken<ThemesConfig>('themes service config');

export const DEFAULT_THEMES_CONFIG = new ThemesConfig();

DEFAULT_THEMES_CONFIG.defaultThemeName = 'pip-blue-theme';
DEFAULT_THEMES_CONFIG.themes = [
    {
        name: 'candy-theme',
        palette: 'light'
    },
    {
        name: 'unicorn-dark-theme',
        palette: 'dark'
    },
    {
        name: 'pip-blue-theme',
        palette: 'light'
    },
    {
        name: 'pip-grey-theme',
        palette: 'light'
    },
    {
        name: 'pip-navy-theme',
        palette: 'light'
    },
    {
        name: 'pip-amber-theme',
        palette: 'light'
    },
    {
        name: 'pip-green-theme',
        palette: 'light'
    },
    {
        name: 'pip-orange-theme',
        palette: 'light'
    },
    {
        name: 'pip-pink-theme',
        palette: 'light'
    },
    {
        name: 'pip-dark-theme',
        palette: 'dark'
    },
    {
        name: 'pip-black-theme',
        palette: 'dark'
    },
    {
        name: 'bootbarn-warm-theme',
        palette: 'light'
    },
    {
        name: 'bootbarn-cool-theme',
        palette: 'light'
    },
    {
        name: 'bootbarn-mono-theme',
        palette: 'light'
    },
    {
        name: 'mst-black-theme',
        palette: 'light'
    },
    {
        name: 'mst-black-dark-theme',
        palette: 'dark'
    },
    {
        name: 'mst-mono-theme',
        palette: 'light'
    },
    {
        name: 'mst-orange-theme',
        palette: 'light'
    }
];
DEFAULT_THEMES_CONFIG.lsKey = 'theme';
