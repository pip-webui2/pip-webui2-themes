import { NgModule, ModuleWithProviders } from '@angular/core';

import { PIP_THEMES_CONFIG, PipThemesConfig } from './shared/ThemeConfig';

@NgModule()
export class PipThemesModule {
  static withConfig(config: Partial<PipThemesConfig>): ModuleWithProviders<PipThemesModule> {
    return {
      ngModule: PipThemesModule,
      providers: [
        {
          provide: PIP_THEMES_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
