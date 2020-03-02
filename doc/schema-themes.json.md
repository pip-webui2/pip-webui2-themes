[↑ Main contents](contents.md)

`themes.json` file has it's own schema described in `themes.schema.json` which you could find in the root directory of this module. There's complete description of every possible property:

```js
{
    // Reference to schema to validate this file
    "$schema": "../projects/pip-webui2-themes/themes.schema.json",
    // List of themes
    "themes": [
        {
            // Theme name. Converts into variable
            "name": "pip-blue",
            // Path to scss file
            "path": "../projects/pip-webui2-themes/src/assets/themes/pip-blue",
            // Custom pattern to name output file for current theme
            "outputNamePattern": "{themeName}",
            // Custom pattern to name output file in "MixinsOnly"
            // mode for current theme
            "mixinsOnlyNamePattern": "{themeName}-app"
        }
    ],
    // Output options
    "output": {
        // Directories to write build themes
        "directories": [
            "./assets/themes",
            "../dist/pip-webui2-themes-app/assets/themes"
        ],
        // Custom pattern to name output file for all themes
        "outputNamePattern": "{themeName}",
        // Custom pattern to name output file in "MixinsOnly"
        // mode for all themes
        "mixinsOnlyNamePattern": "{themeName}-app"
    },
    // Callback functions to run after process complete
    // Doesn't depend on build status
    "complete": [
        "./callbacks/example.js"
    ]
}
```
Required fields and default values:
```js
{
    // Not required
    // generated by default, but could be manually set
    "$schema": "../projects/pip-webui2-themes/themes.schema.json",
    // Required field
    "themes": [
        {
            // Required field
            "name": "pip-blue",
            // Required field
            "path": "../projects/pip-webui2-themes/src/assets/themes/pip-blue",
            // Not required
            // Default value "{themeName}"
            "outputNamePattern": "{themeName}",
            // Not Required
            // Default value "{themeName}-mixins"
            "mixinsOnlyNamePattern": "{themeName}-app"
        }
    ],
    // Required field
    "output": {
        // Required field
        "directories": [
            "./assets/themes",
            "../dist/pip-webui2-themes-app/assets/themes"
        ],
        // Not required
            // Default value "{themeName}"
        "outputNamePattern": "{themeName}",
        // Not Required
            // Default value "{themeName}-mixins"
        "mixinsOnlyNamePattern": "{themeName}-app"
    },
    // Not required
    "complete": [
        "./callbacks/example.js"
    ]
}
```

Important notes:
* `outputNamePattern` and `mixinsOnlyNamePattern` 'theme' properties has greater priority than 'output' ones, so you could define some individual names for theme files;
* complete callbacks will run even if build fails. It will return 2 arrays of theme names: themes, that wasn't built (errors happened) and themes, that was built (successful build).