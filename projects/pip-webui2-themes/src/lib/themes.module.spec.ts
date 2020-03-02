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
        // Service provided in 'root'
        expect(() => TestBed.get(PipThemesService)).toBeTruthy();
    });
});

describe('PipThemesModule.withConfig()', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PipThemesModule.withConfig({
                defaultThemeName: 'pip-test'
            })]
        });
    });

    it(`should provide 'PipThemesService' with custom config`, () => {
        const service: PipThemesService = TestBed.get(PipThemesService);
        expect(service).toBeTruthy();
        expect(service.defaultThemeName).toBe('pip-test');
    });
});
