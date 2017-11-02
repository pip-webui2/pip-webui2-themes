import { Component } from '@angular/core';
import { MatSelect } from '@angular/material';
import { PipThemesService, ThemeModel } from './pip-webui2-themes';
import { ObservableMedia, MediaChange } from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public themes: ThemeModel[];
  public theme: ThemeModel;
  public picture: string;
  public mode: string;
  public app: string = 'Themes';
  public activeMediaQuery: boolean;

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
