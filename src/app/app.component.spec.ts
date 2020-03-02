import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { PipThemesService, pipWebUI2Themes } from 'pip-webui2-themes';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should change langulage', async(async () => {
    const translate: TranslateService = TestBed.get(TranslateService);
    const spyOnTranslateUse = spyOn(translate, 'use');
    component.changeLanguage('ru');
    await fixture.whenStable();
    expect(component.language).toEqual('ru');
    expect(spyOnTranslateUse).toHaveBeenCalledWith('ru');
  }));

  it('should change theme', async(async () => {
    const service: PipThemesService = TestBed.get(PipThemesService);
    const spyOnSelectTheme = spyOn(service, 'selectTheme');
    component.changeTheme(pipWebUI2Themes.Amber);
    await fixture.whenStable();
    expect(component.theme).toEqual(pipWebUI2Themes.Amber);
    expect(spyOnSelectTheme).toHaveBeenCalledWith(pipWebUI2Themes.Amber.name);
  }));

  it('should retrieve error messwage', () => {
    component.email.setErrors({ required: true });
    expect(component.getErrorMessage()).toEqual('APP.ERROR.REQUIRED');
    component.email.setErrors({ email: true });
    expect(component.getErrorMessage()).toEqual('APP.ERROR.INVALID');
    component.email.setErrors({});
    expect(component.getErrorMessage()).toEqual('');
  });
});

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  it('should use default language if browser one is missing', () => {

    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
    const translate: TranslateService = TestBed.get(TranslateService);
    spyOn(translate, 'getBrowserLang').and.returnValue('fr');
    const spyOnTranslateUse = spyOn(translate, 'use');
    fixture = TestBed.createComponent(AppComponent);
    expect(spyOnTranslateUse).toHaveBeenCalledWith('en');
  });
});
