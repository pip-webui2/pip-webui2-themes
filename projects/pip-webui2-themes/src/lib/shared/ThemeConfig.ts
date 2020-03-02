import { Theme, ThemePalette } from './Theme';
import { InjectionToken } from '@angular/core';

/**
 * Configuration for theme
 */
export class PipThemesConfig {
    /**
     * Name of default theme which will be used if there's no theme information stored in localStorage
     */
    defaultThemeName: string;
    /**
     * List of available themes
     */
    themes: Theme[];
    /**
     * Url from where themes will be loaded
     */
    path: string;
    /**
     * Name pattern for losing theme files
     */
    namePatterns: string[];
    /**
     * localStorage key name where config should be stored
     */
    localStorageKey?: string;
    /**
     * Use minified theme if possible
     */
    useMinified?: boolean;
}

const enum ThemeNames {
    Amber = 'Amber',
    Black = 'Black',
    Blue = 'Blue',
    Candy = 'Candy',
    Dark = 'Dark',
    Green = 'Green',
    Grey = 'Grey',
    Navy = 'Navy',
    Orange = 'Orange',
    Pink = 'Pink',
    UnicornDark = 'UnicornDark',
}

export const pipWebUI2Themes: { [name in ThemeNames]: Theme } = {
    [ThemeNames.Amber]: {
        name: 'pip-amber',
        displayName: 'Pip amber',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Black]: {
        name: 'pip-black',
        displayName: 'Pip black',
        info: {
            palette: ThemePalette.Dark
        }
    },
    [ThemeNames.Blue]: {
        name: 'pip-blue',
        displayName: 'Pip blue',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Candy]: {
        name: 'pip-candy',
        displayName: 'Pip candy',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Dark]: {
        name: 'pip-dark',
        displayName: 'Pip dark',
        info: {
            palette: ThemePalette.Dark
        }
    },
    [ThemeNames.Green]: {
        name: 'pip-green',
        displayName: 'Pip green',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Grey]: {
        name: 'pip-grey',
        displayName: 'Pip grey',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Navy]: {
        name: 'pip-navy',
        displayName: 'Pip navy',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Orange]: {
        name: 'pip-orange',
        displayName: 'Pip orange',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Pink]: {
        name: 'pip-pink',
        displayName: 'Pip pink',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.UnicornDark]: {
        name: 'pip-unicorn-dark',
        displayName: 'Pip unicorn dark',
        info: {
            palette: ThemePalette.Dark
        }
    }
};

export const pipWebUI2ThemesList = Object.keys(pipWebUI2Themes).map(k => pipWebUI2Themes[k]);

export const defaultPipThemesConfig: PipThemesConfig = {
    defaultThemeName: 'pip-blue',
    themes: [
        pipWebUI2Themes.Blue
    ],
    path: 'assets/themes/',
    namePatterns: ['{themeName}'],
    localStorageKey: 'pip-webui2-themes',
    useMinified: true
};

export const PIP_THEMES_CONFIG = new InjectionToken<Partial<PipThemesConfig>>('pip-webui2-themes config');
