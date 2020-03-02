[↑ Main contents](contents.md)

# PipThemesService description

## Properties
* `config` ([PipThemesConfig](./tmec.md#PipThemesConfig)) - get/set whole configuration. Modifying of this value properties won't change them, keep that in mind, so you have to modify whole config or modify it's properties using properties of service itself;
  ```typescript
  // Wrong
  this.service.config.useMinified = false;
  // Correct
  this.service.config = Object.assign({}, this.service.config, {  useMinified: false});
  // Also correct
  this.service.useMinified = false;
  ```
* `defaultThemeName` (string) - get/set name of default theme;
* `path` (string) - get/set path from where themes will be loaded;
* `namePatterns` - get/set name patterns for theme name generation;
* `useMinified` - get/set flag to use minified version (adds '.min') before extension of themes;
* `currentTheme` - get current theme;
* `themes` - get map of registered themes;
* `themesArray` - get array of registered themes;

## Methods

* `initThemes` - async method to initialize themes and select theme saved by user or default one;
* `registerTheme` - register new themes;
* `removeTheme` - remove theme from registered list;
* `selectTheme` - async method to select registered theme;