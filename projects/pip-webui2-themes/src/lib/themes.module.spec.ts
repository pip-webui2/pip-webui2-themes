import { TestBed } from '@angular/core/testing';

import { PipThemesModule } from './themes.module';
import { PipThemesService } from './shared/themes.service';

describe('PipThemesModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PipThemesModule]
        });

    });

    it(`should not provide 'PipThemesService' service`, () => {
        expect(() => TestBed.get(PipThemesService)).toThrowError(/No provider for/);
    });
});

describe('PipThemesModule.forRoot()', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PipThemesModule.forRoot()]
        });
    });

    it(`should provide 'PipThemesService'`, () => {
        expect(TestBed.get(PipThemesService)).toBeTruthy();
    });
});
