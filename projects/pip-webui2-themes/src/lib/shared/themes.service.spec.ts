import { TestBed, inject } from '@angular/core/testing';
import { sample, sampleSize, random } from 'lodash';

import { Theme } from './Theme';
import { PipThemesService } from './themes.service';

describe('Themes service', () => {
    let service: PipThemesService;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PipThemesService
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([PipThemesService], (srv) => {
        service = srv;
    }));

    it('should have an instance', () => {
        expect(service).toBeDefined();
    });

    it('themes property should return list of themes', () => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
    });

    it('selectedTheme function should change theme', () => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
        const theme = sample(service.themes);
        service.selectedThemeName = theme.name;
        expect(service.selectedThemeName).toEqual(theme.name);
        service.selectedThemeName = null;
        expect(service.selectedThemeName).toEqual(theme.name);
        service.selectedTheme = null;
        expect(service.selectedThemeName).toEqual(theme.name);
        let anotherTheme = sample(service.themes);
        if (anotherTheme.name === theme.name) {
            while (anotherTheme.name === theme.name) {
                anotherTheme = sample(service.themes);
            }
        }
        service.selectedTheme = anotherTheme;
        expect(service.selectedThemeName).toEqual(anotherTheme.name);
        expect(service.selectedTheme).toEqual(anotherTheme);

    });

    it('themes property should receive and set new themes list', () => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
        const themes = sampleSize(service.themes, random(1, service.themes.length));
        service.themes = themes;
        expect(service.themes).toEqual(themes);
    });

    it('themes$ should change when property changed', (done: DoneFn) => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
        const themesToSet = sampleSize(service.themes, random(1, service.themes.length));
        service.themes$.subscribe((themes: Theme[]) => {
            expect(themes).toEqual(service.themes);
            done();
        });
        service.themes = themesToSet;
    });

    it('selectedTheme$ should change when property changed', (done: DoneFn) => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
        const theme = sample(service.themes);
        service.selectedTheme$.subscribe((selectedTheme: Theme) => {
            expect(selectedTheme).toEqual(service.selectedTheme);
            done();
        });
        service.selectedTheme = theme;
    });

    it('body should have theme name in class list', () => {
        expect(service.themes).toEqual(jasmine.any(Array));
        expect(service.themes.length).toBeGreaterThan(0);
        const theme = sample(service.themes);
        service.selectedThemeName = theme.name;
        expect(document.body.classList.contains(theme.name)).toBeTruthy();
        let anotherTheme = sample(service.themes);
        if (anotherTheme.name === theme.name) {
            while (anotherTheme.name === theme.name) {
                anotherTheme = sample(service.themes);
            }
        }
        service.selectedTheme = anotherTheme;
        expect(document.body.classList.contains(theme.name)).toBeFalsy();
        expect(document.body.classList.contains(anotherTheme.name)).toBeTruthy();
    });
});
