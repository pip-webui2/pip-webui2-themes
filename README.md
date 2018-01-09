# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Color Themes

![](https://img.shields.io/badge/license-MIT-blue.svg)

Pip.WebUI 2 Themes module contains a mechanism to define and dynamically switch color themes for both Angular Material and custom controls.

<a href="https://github.com/pip-webui2/pip-webui2-themes/raw/master/doc/images/image.png" style="display: block;">
    <img src="https://github.com/pip-webui2/pip-webui2-themes/raw/master/doc/images/image.png"/>
</a>

**Using**

Add module to imports:
```typescript
import { PipThemesModule } from 'pip-webui2-themes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    PipThemesModule,
    ...
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
```

Use service to change theme, get theme list and name of current theme.
```typescript
import { PipThemesService, Theme } from 'pip-webui2-themes';

export class AppComponent {
    public themes: Theme[];
    public theme: Theme;

    constructor(
        private service: PipThemesService
    ) {
        this.themes = this.service.themes;
        this.theme = this.service.selectedTheme;
    }

    changeTheme() {
        this.service.selectedTheme = this.theme;
  }
}
```

Theme model:
```typescript
class Theme {
    name: string;
    palette: string = 'light';
}
```

## Installation

To install this module using npm:

```bash
npm install pip-webui2-themes --save
```

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
