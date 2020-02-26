import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl, Validators } from '@angular/forms';

import { PipThemesService, Theme } from 'pip-webui2-themes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public themes: Theme[];
  public theme: Theme;
  public picture: string;
  public mode: string;
  public app = 'Themes';
  public email = new FormControl('', [Validators.required, Validators.email]);
  public newText = 'Random text from outside';

  public constructor(
    private service: PipThemesService,
    public media: MediaObserver
  ) {
    this.service.initThemes();
    this.themes = Array.from(this.service.themes.values());
    this.theme = this.service.currentTheme;
    this.picture = this.theme.info.palette === 'light' ? '/assets/1.jpg' : '/assets/2.jpg';

    // media.asObservable().subscribe((changes: MediaChange[]) => { });

  }
  public changeTheme(theme: Theme) {
    this.theme = theme;
    this.service.selectTheme(theme.name);
    this.picture = this.theme.info.palette === 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
