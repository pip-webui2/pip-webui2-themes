import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';

import { PIP_THEMES_CONFIG, PipThemesConfig } from './shared/ThemeConfig';
import { PipThemesService } from './shared/themes.service';

export function pipThemesModuleInitializer(service: PipThemesService) {
  // Should be created variable and then returned, throws error otherway
  const res = () => service.initThemes();
  return res;
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: pipThemesModuleInitializer,
      deps: [PipThemesService]
    }
  ]
})
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
