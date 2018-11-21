import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatSidenavModule } from '@angular/material';
import { PipThemesModule } from 'pip-webui2-themes';

import { AppComponent } from './app.component';
import { TestModule } from './test/test.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FlexLayoutModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatSelectModule,
        MatSidenavModule,

        PipThemesModule,
        TestModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
  it(`should have as title 'Themes'`, async(() => {
    expect(component.app).toEqual('Themes');
  }));
  it('should contain specific text in first h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Изменение картинки в зависимости от светлой или темной темы');
  }));
  it('should change picture if theme is dark', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img.app-pic').getAttribute('src')).toBe('/assets/1.jpg');
    component.changeTheme({name: 'unicorn-dark-theme', palette: 'dark'});
    fixture.detectChanges();
    expect(compiled.querySelector('img.app-pic').getAttribute('src')).toBe('/assets/2.jpg');
  }));
});
