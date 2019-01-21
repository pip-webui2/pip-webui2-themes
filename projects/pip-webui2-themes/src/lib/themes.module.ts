import { NgModule, ModuleWithProviders } from '@angular/core';

import { THEMES_CONFIG, DEFAULT_THEMES_CONFIG } from './shared/ThemeConfig';
import { PipThemesService } from './shared/themes.service';

@NgModule()
export class PipThemesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipThemesModule,
      providers: [
        PipThemesService,
        {
          provide: THEMES_CONFIG,
          useValue: DEFAULT_THEMES_CONFIG
        }
      ]
    };
  }
}
