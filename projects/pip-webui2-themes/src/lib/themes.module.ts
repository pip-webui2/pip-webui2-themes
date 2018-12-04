import { NgModule, ModuleWithProviders } from '@angular/core';

import { PipThemesService } from './shared/themes.service';

@NgModule()
export class PipThemesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipThemesModule,
      providers: [PipThemesService]
    };
  }
}
