import { Component } from '@angular/core';
import { MatSelect } from '@angular/material';
import { PipThemesService } from './pip-webui2-themes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public themes: string[];
  public theme: string;
  public constructor(private service: PipThemesService) {
    this.themes = this.service.themes;

  }
  public changeTheme() {
    console.log(this.theme);
    this.service.useTheme(this.theme);
  }
}
