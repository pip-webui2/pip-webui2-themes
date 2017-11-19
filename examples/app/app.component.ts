import { Component } from '@angular/core';
import { MatSelect } from '@angular/material';
import { PipThemesService, Theme } from './pip-webui2-themes';
import { ObservableMedia, MediaChange } from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public themes: Theme[];
  public theme: Theme;
  public picture: string;
  public mode: string;
  public app: string = 'Themes';
  public activeMediaQuery: boolean;
  public themesLocalNames: any = {
    "candy-theme": 'Candy',
    "unicorn-dark-theme": 'Unicorn Dark',
    "pip-blue-theme": 'Blue',
    "pip-grey-theme": 'Grey',
    "pip-pink-theme": 'Pink',
    "pip-green-theme": 'Green',
    "pip-navy-theme": 'Navy',
    "pip-amber-theme": 'Amber',
    "pip-orange-theme": 'Orange',
    "pip-dark-theme": 'Dark',
    "pip-black-theme": 'Black',
    "bootbarn-warm-theme": 'Bootbarn Warm',
    "bootbarn-cool-theme": 'Bootbarn Cool',
    "bootbarn-mono-theme": 'Bootbarn Mono'
  }
  
  public constructor(private service: PipThemesService,
		public media: ObservableMedia) {
    this.themes = this.service.themes;
    this.theme = this.service.selectedTheme;
    this.picture = this.theme.palette == 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
    
    media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change && change.mqAlias == 'xs'? true : false;
      this.mode = change && change.mqAlias == 'xs'? null : 'side';
    })

  }
  public changeTheme() {
    console.log(this.theme);
    this.service.selectedTheme = this.theme;
    this.picture = this.theme.palette == 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
  }
}
