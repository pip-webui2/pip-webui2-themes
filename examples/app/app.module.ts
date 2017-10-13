import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PipTestModule } from './pip-webui2-themes';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { MatButton, MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { PipThemesModule } from './pip-webui2-themes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PipTestModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    PipThemesModule,
    BrowserAnimationsModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
