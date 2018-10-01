import { TestBed, inject } from '@angular/core/testing';

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

  /*  beforeEach(() => {
        //form = $('<form>');
        document.body.appendChild(new jasmine.HtmlReporter());
    });*/

    // instantiation through framework injection
    beforeEach(inject([PipThemesService], (srv) => {
        service = srv;
    }));

    it('should have an instance', () => {
        expect(service).toBeDefined();
    });

    it('selectedTheme function should change theme', () => {
        // service.selectedTheme = 'new-theme';
        // expect(service.selectedTheme).toEqual('new-theme');
    });
});
