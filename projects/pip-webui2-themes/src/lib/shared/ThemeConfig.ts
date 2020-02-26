import { Theme, ThemePalette } from './Theme';
import { InjectionToken } from '@angular/core';

/**
 * Configuration for theme
 */
export class PipThemesConfig {
    /**
     * Name of default theme which will be used if there's no theme information stored in localStorage
     */
    defaultTheme: string;
    /**
     * List of available themes
     */
    themes: Theme[];
    /**
     * Url from where themes will be loaded
     */
    path: string;
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

export const pipWebui2Themes: { [name in ThemeNames]: Theme } = {
    [ThemeNames.Amber]: {
        name: 'pip-amber',
        displayName: 'Pip amber',
        info: {
            palette: ThemePalette.Light
        }
    },
    [ThemeNames.Black]: {
        name: 'pip-amber',
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

export const defaultPipThemesConfig: PipThemesConfig = {
    defaultTheme: 'pip-blue',
    themes: [
        pipWebui2Themes.Blue
    ],
    path: '/assets/themes/',
    localStorageKey: 'pip-webui2-themes',
    useMinified: true
};

export const PIP_THEMES_CONFIG = new InjectionToken<Partial<PipThemesConfig>>('pip-webui2-themes config');

// DEFAULT_THEMES_CONFIG.defaultThemeName = 'pip-blue-theme';
// DEFAULT_THEMES_CONFIG.themes = [
//     {
//         name: 'candy-theme',
//         palette: 'light'
//     },
//     {
//         name: 'unicorn-dark-theme',
//         palette: 'dark'
//     },
//     {
//         name: 'pip-blue-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-grey-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-navy-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-amber-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-green-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-orange-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-pink-theme',
//         palette: 'light'
//     },
//     {
//         name: 'pip-dark-theme',
//         palette: 'dark'
//     },
//     {
//         name: 'pip-black-theme',
//         palette: 'dark'
//     },
//     {
//         name: 'bootbarn-warm-theme',
//         palette: 'light'
//     },
//     {
//         name: 'bootbarn-cool-theme',
//         palette: 'light'
//     },
//     {
//         name: 'bootbarn-mono-theme',
//         palette: 'light'
//     },
//     {
//         name: 'mst-black-theme',
//         palette: 'light'
//     },
//     {
//         name: 'mst-black-dark-theme',
//         palette: 'dark'
//     },
//     {
//         name: 'mst-mono-theme',
//         palette: 'light'
//     },
//     {
//         name: 'mst-orange-theme',
//         palette: 'light'
//     },
//     {
//         name: 'mst-orange-dark-theme',
//         palette: 'dark'
//     },
//     {
//         name: 'mst-elegant-theme',
//         palette: 'dark'
//     }
// ];
// DEFAULT_THEMES_CONFIG.lsKey = 'theme';
