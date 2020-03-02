import { Theme, ThemePalette } from './Theme';

describe('Themes model', () => {
    it('default palette should be \'light\'', () => {
        expect(new Theme().info.palette).toEqual(ThemePalette.Light);
    });
});
