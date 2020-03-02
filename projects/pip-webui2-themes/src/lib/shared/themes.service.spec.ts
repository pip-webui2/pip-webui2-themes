import { HttpClientModule } from '@angular/common/http';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { cloneDeep, defaultsDeep } from 'lodash';
import { of } from 'rxjs';

import { PipThemesService } from './themes.service';
import { pipWebUI2Themes, defaultPipThemesConfig, PipThemesConfig } from './ThemeConfig';
import { Theme } from './Theme';

describe('Themes service', () => {
    const config = defaultsDeep({
        defaultThemeName: 'pip-blue',
        themes: [pipWebUI2Themes.Blue, pipWebUI2Themes.Orange]
    }, defaultPipThemesConfig) as PipThemesConfig;
    let service: PipThemesService;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });
        service = TestBed.get(PipThemesService);
        service.config = cloneDeep(config);
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    describe('should init themes', () => {

        beforeEach(() => service.config = cloneDeep(config));

        it('should init themes with name from local storage', () => {
            window.localStorage.setItem(service.config.localStorageKey, pipWebUI2Themes.Orange.name);
            const spyOnSelectTheme = spyOn(service, 'selectTheme');
            service.initThemes();
            expect(spyOnSelectTheme).toHaveBeenCalledWith(pipWebUI2Themes.Orange.name);
            window.localStorage.removeItem(config.localStorageKey);
        });

        it('should init themes with default name', () => {
            const spyOnSelectTheme = spyOn(service, 'selectTheme');
            service.initThemes();
            expect(spyOnSelectTheme).toHaveBeenCalledWith(service.config.defaultThemeName);
        });

        it('should not init themes, because of empty list or no default theme found', () => {
            window.localStorage.setItem(service.config.localStorageKey, pipWebUI2Themes.UnicornDark.name);
            service.config.defaultThemeName = pipWebUI2Themes.UnicornDark.name;
            const spyOnSelectTheme = spyOn(service, 'selectTheme');
            service.initThemes();
            expect(spyOnSelectTheme).not.toHaveBeenCalled();
            window.localStorage.removeItem(config.localStorageKey);
        });

    });

    it('should return and set properties', () => {
        expect(service.config).toEqual(jasmine.objectContaining(config));
        service.config = defaultsDeep({ themes: [pipWebUI2Themes.Blue, pipWebUI2Themes.Orange, pipWebUI2Themes.Black] }, config);
        expect(service.themes).toEqual(new Map<string, Theme>([
            [pipWebUI2Themes.Blue.name, pipWebUI2Themes.Blue],
            [pipWebUI2Themes.Orange.name, pipWebUI2Themes.Orange],
            [pipWebUI2Themes.Black.name, pipWebUI2Themes.Black]
        ]));
        expect(service.themesArray).toEqual([
            pipWebUI2Themes.Blue,
            pipWebUI2Themes.Orange,
            pipWebUI2Themes.Black
        ]);
        service.defaultThemeName = pipWebUI2Themes.Orange.name;
        expect(service.defaultThemeName).toEqual(pipWebUI2Themes.Orange.name);
        service.path = '/test/path';
        expect(service.path).toEqual('/test/path');
        service.namePatterns = ['{themeName}-test'];
        expect(service.namePatterns).toEqual(['{themeName}-test']);
        service.useMinified = true;
        expect(service.useMinified).toBeTruthy();
        spyOn(service, 'selectTheme');
        service.initThemes();
        expect(service.currentTheme).toEqual(pipWebUI2Themes.Orange);
        expect(service.currentTheme.info.palette).toEqual(pipWebUI2Themes.Orange.info.palette);
        service.config = null;
        expect(service.defaultThemeName).toEqual(defaultPipThemesConfig.defaultThemeName);
        expect(service.path).toEqual(defaultPipThemesConfig.path);
        expect(service.namePatterns).toEqual(defaultPipThemesConfig.namePatterns);
    });

    it('shoud register and remove themes', () => {
        const spyOnThemesSet = spyOn(service.themes, 'set');
        const spyOnThemesDelete = spyOn(service.themes, 'delete');
        service.registerTheme(null);
        expect(spyOnThemesSet).not.toHaveBeenCalled();
        service.registerTheme({} as Theme);
        expect(spyOnThemesSet).not.toHaveBeenCalled();
        service.registerTheme(pipWebUI2Themes.Blue);
        expect(spyOnThemesSet).not.toHaveBeenCalled();
        service.registerTheme(pipWebUI2Themes.Blue, true);
        expect(spyOnThemesSet).toHaveBeenCalledWith(pipWebUI2Themes.Blue.name, pipWebUI2Themes.Blue);
        service.registerTheme(pipWebUI2Themes.Green);
        expect(spyOnThemesSet).toHaveBeenCalledWith(pipWebUI2Themes.Green.name, pipWebUI2Themes.Green);
        service.removeTheme(pipWebUI2Themes.Green.name);
        expect(spyOnThemesDelete).not.toHaveBeenCalled();
        service.removeTheme(pipWebUI2Themes.Blue.name);
        expect(spyOnThemesDelete).toHaveBeenCalledWith(pipWebUI2Themes.Blue.name);
        spyOnProperty(service, 'currentTheme').and.returnValues(null, pipWebUI2Themes.Blue);
        const spyOnInitThemes = spyOn(service, 'initThemes');
        console.log('currentTheme should be null');
        service.removeTheme(pipWebUI2Themes.Blue.name);
        expect(spyOnThemesDelete).toHaveBeenCalledWith(pipWebUI2Themes.Blue.name);
        expect(spyOnInitThemes).not.toHaveBeenCalled();
        service.removeTheme(pipWebUI2Themes.Blue.name);
        expect(spyOnThemesDelete).toHaveBeenCalledWith(pipWebUI2Themes.Blue.name);
        expect(spyOnInitThemes).toHaveBeenCalled();
    });

    describe('should select theme', () => {

        beforeEach(() => service.config = cloneDeep(config));
        afterEach(() => window.localStorage.removeItem(config.localStorageKey));

        it('shouln\'t select not registered nor default theme', () => {
            const spyOnHttpGet = spyOn((service as any).http, 'get');
            spyOnProperty(service, 'currentTheme').and.returnValue(pipWebUI2Themes.Blue);
            service.selectTheme(pipWebUI2Themes.Grey.name);
            expect(spyOnHttpGet).not.toHaveBeenCalled();
            service.selectTheme(pipWebUI2Themes.Blue.name);
            expect(spyOnHttpGet).not.toHaveBeenCalled();
        });

        it('should select theme', fakeAsync(async () => {
            const spyOnStleManagerRemoveStyle = spyOn((service as any).styleManager, 'removeStyle');
            const spyOnStleManagerSetStyle = spyOn((service as any).styleManager, 'setStyle');
            const spyOnHttpGet = spyOn((service as any).http, 'get').and.returnValue(of(''));
            service.defaultThemeName = pipWebUI2Themes.Blue.name;
            service.registerTheme(defaultsDeep({ path: 'a/b' }, pipWebUI2Themes.Orange), true);
            await service.selectTheme(pipWebUI2Themes.Orange.name);
            expect(spyOnHttpGet).toHaveBeenCalledWith('a/b/' + pipWebUI2Themes.Orange.name + '.min.css', { responseType: 'text' });
            expect(spyOnStleManagerRemoveStyle).toHaveBeenCalled();
            expect(spyOnStleManagerSetStyle).toHaveBeenCalledWith('theme', '');
            spyOnStleManagerRemoveStyle.calls.reset();
            await service.selectTheme(pipWebUI2Themes.Blue.name);
            expect(spyOnHttpGet).toHaveBeenCalledWith(config.path + pipWebUI2Themes.Blue.name + '.min.css', { responseType: 'text' });
            expect(spyOnStleManagerRemoveStyle).toHaveBeenCalled();
            expect(spyOnStleManagerSetStyle).toHaveBeenCalledWith('theme', '');
            spyOnStleManagerRemoveStyle.calls.reset();
            service.config = null;
            service.registerTheme(pipWebUI2Themes.Orange, true);
            await service.selectTheme(pipWebUI2Themes.Orange.name);
            expect(spyOnHttpGet)
                .toHaveBeenCalledWith('assets/themes/' + pipWebUI2Themes.Orange.name + '.min.css', { responseType: 'text' });
            expect(spyOnStleManagerRemoveStyle).toHaveBeenCalled();
            expect(spyOnStleManagerSetStyle).toHaveBeenCalledWith('theme', '');
            spyOnStleManagerRemoveStyle.calls.reset();
            service.config = cloneDeep(config);
            service.useMinified = false;
            await service.selectTheme(pipWebUI2Themes.Blue.name);
            expect(spyOnHttpGet).toHaveBeenCalledWith(config.path + pipWebUI2Themes.Blue.name + '.css', { responseType: 'text' });
            expect(spyOnStleManagerRemoveStyle).toHaveBeenCalled();
            expect(spyOnStleManagerSetStyle).toHaveBeenCalledWith('theme', '');
            spyOnStleManagerRemoveStyle.calls.reset();
        }));

        it('should generate theme names', fakeAsync(async () => {
            spyOn((service as any).styleManager, 'removeStyle');
            spyOn((service as any).styleManager, 'setStyle');
            const spyOnHttpGet = spyOn((service as any).http, 'get').and.returnValue(of(''));
            service.registerTheme({ name: 3 } as any);
            service.selectTheme(3 as any);
            expect(spyOnHttpGet).toHaveBeenCalledWith(config.path + '3.min.css', { responseType: 'text' });
            service.namePatterns = ['{themeName}-{themeTest}'];
            service.selectTheme(3 as any);
            expect(spyOnHttpGet).toHaveBeenCalledWith(config.path + '3-{themeTest}.min.css', { responseType: 'text' });
        }));
    });
});
