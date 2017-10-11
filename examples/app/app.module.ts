import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PipTestModule } from './pip-webui2-themes';

import { AppComponent } from './app.component';


import {MatButton, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PipTestModule,
    MatButtonModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
 