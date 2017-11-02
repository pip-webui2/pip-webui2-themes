import { Component } from '@angular/core';
import { MatSelect } from '@angular/material';
import { PipThemesService, ThemeModel } from './pip-webui2-themes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public themes: ThemeModel[];
  public theme: ThemeModel;
  public picture: string;
  public constructor(private service: PipThemesService) {
    this.themes = this.service.themes;
    this.theme = this.service.selectedTheme;
    this.picture = this.theme.palette == 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
  }
  public changeTheme() {
    console.log(this.theme);
    this.service.selectedTheme = this.theme;
    this.picture = this.theme.palette == 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
  }
}
