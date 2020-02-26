/**
 * Theme description
 */
export class Theme {
    /**
     * Theme name. Should be unique
     */
    name: string;
    /**
     * Theme name to display
     */
    displayName?: string;
    /**
     * Some theme information
     */
    info: {
        palette: ThemePalette;
    } = { palette: ThemePalette.Light };
    /**
     * Custom path for theme loading
     */
    path?: string;
}

export enum ThemePalette {
    Light = 'light',
    Dark = 'dark'
}

export type Themes = Theme[];
