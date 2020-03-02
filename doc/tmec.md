[↑ Main contents](contents.md)

## Contents
* [Enums](#enums)
* [Models and types](#models-and-types)
* [Predefined constants](#predefined-constants)

## Enums

### ThemePalette
Represents palette type of theme
```typescript
enum ThemePalette {
    Light = 'light',
    Dark = 'dark'
}
```

## Models and types

### Theme
Represents information about theme
```typescript
/**
 * Theme description
 */
class Theme {
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
    /**
     * Custom name patterns for theme loading
     */
    namePatterns?: string[];
}
```

### Themes
Represents type which is array of Themes
```typescript
type Themes = Theme[];
```

### PipThemesConfig
Represents object to configure themes module
```typescript
/**
 * Configuration for theme
 */
class PipThemesConfig {
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
```

## Predefined constants

List of predefined constants:
* `pipWebUI2Themes` - dictionary of default themes, provided with this module for faster development;
* `pipWebUI2ThemesList` - list of default themes, same as `pipWebUI2Themes`, but in a single list;
* `defaultPipThemesConfig` - default configuration for module:
```typescript
const defaultPipThemesConfig: PipThemesConfig = {
    defaultThemeName: 'pip-blue',
    themes: [
        pipWebui2Themes.Blue
    ],
    path: '/assets/themes/',
    namePatterns: ['{themeName}'],
    localStorageKey: 'pip-webui2-themes',
    useMinified: true
};
```
* `PIP_THEMES_CONFIG` - InjectionToken of `PipThemesConfig` to provide config from module to service.