# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> PipWebui2 Themes

![](https://img.shields.io/badge/license-MIT-blue.svg)


Pip.WebUI2 Themes module provides a mechanism to define, build and dynamically switch color themes for Angular Material projects.

<a href="https://github.com/pip-webui2/pip-webui2-themes/raw/master/doc/images/image.png" style="display: block;">
    <img src="https://github.com/pip-webui2/pip-webui2-themes/raw/master/doc/images/image.png"/>
</a>

## Contents
* [Installation](#installation)
* [How to](#how-to)
  * [Step 1: Init](#step-1)
  * [Step 2: Configuration of build](#step-2)
  * [Step 3: Build](#step-3)
  * [Step 4: Configuration of application](#step-4)
* [Links](#links)
* [License](#license)

## Installation

To install this module using npm:

```bash
npm install pip-webui2-themes --save
```

## How to

### <a id="step-1"></a>Step 1: Init
First thing you have to do is init module itself.
```
pip-webui2-themes init
```
Default initialization will create files `themes.json` and `themes.scss` in `src` directory, but you could define another source path with option `--src` like that:
```
pip-webui2-themes init --src ./
```

### <a id="step-2"></a>Step 2: Configuration of build
To configure which themes should be built and some build options you should edit `themes.json` file. You could check schema in [this documentation page](doc/schema-themes.json.md).
Usually, you have to provide list of themes and output directory:
```json
{
    "$schema": "../node_modules/pip-webui2-themes/themes.schema.json",
    "themes": [
        {
            "name": "pip-blue",
            "path": "../node_modules/pip-webui2-themes/assets/themes/pip-blue"
        },
        {
            "name": "pip-orange",
            "path": "../node_modules/pip-webui2-themes/assets/themes/pip-orange"
        },
        {
            "name": "pip-green",
            "path": "../node_modules/pip-webui2-themes/assets/themes/pip-green"
        },
        {
            "name": "pip-unicorn-dark",
            "path": "../node_modules/pip-webui2-themes/assets/themes/pip-unicorn-dark",
            "outputNamePattern": "pip-ud"
        }
    ],
    "output": {
        "directories": [
            "./assets/themes",
            "../dist/angular-app/assets/themes"
        ]
    }
}
```
**NB!** All paths should be relative to `themes.json` file or your custom config file.

## <a id="step-3"></a>Step 3: Build
When configuration is done it's time to build themes:
```
pip-webui2-themes build
```

## <a id="step-4"></a>Step 4: Configuration of application
Now you have your themes in provided output directories, but application doesn't recognize what's going on and what kind of themes it should use. That's why you have to import and configure angular module which provided by PipWebUI2 Themes.

Add module to imports:
```typescript
import { PipThemesModule, Theme } from 'pip-webui2-themes';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    ...
    // Default import with default configuration
    // PipThemesModule,
    // Import with custom configuration which was described above
    PipThemesModule.withConfig({
      themes: [
        pipWebui2Themes.Blue,
        pipWebui2Themes.Orange,
        pipWebui2Themes.Green,
        // Use custom name which was provided in "outputNamePattern" property
        Object.assign({}, pipWebui2Themes.UnicornDark, {
          namePatterns: ['pip-ud']
        } as Theme)
      ]
    })
    ...
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
```

And it's done! Now you could use this service to work with themes in any other component, service, etc.
You could find some description of this module's service and models in the [documentation](doc/contents.md).

## Links
* [PipWebUI2 Themes Documentation](doc/contents.md)
* [PipWebUI2 Workspace](https://github.com/pip-webui2/pip-webui2-ws)

## License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
