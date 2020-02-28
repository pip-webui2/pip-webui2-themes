import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
  public email = new FormControl('', [Validators.required, Validators.email]);
  public newText = 'Random text from outside';
  public languages = ['en', 'ru'];
  public language: string;
  public sliderValue = 50;

  public constructor(
    private service: PipThemesService,
    private translate: TranslateService,
    public media: MediaObserver
  ) {
    // Themes init
    this.service.initThemes();
    this.themes = Array.from(this.service.themes.values());
    this.theme = this.service.currentTheme;
    this.picture = this.theme.info.palette === 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
    // Translations init
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    this.language = this.translate.currentLang;
  }

  public changeLanguage(language: string) {
    this.language = language;
    this.translate.use(language);
  }

  public changeTheme(theme: Theme) {
    this.theme = theme;
    this.service.selectTheme(theme.name);
    this.picture = this.theme.info.palette === 'light' ? '/assets/1.jpg' : '/assets/2.jpg';
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'APP.ERROR.REQUIRED' :
      this.email.hasError('email') ? 'APP.ERROR.INVALID' :
        '';
  }
}
