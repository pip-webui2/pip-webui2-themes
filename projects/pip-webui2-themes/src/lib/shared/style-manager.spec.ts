import { PipStyleManager } from './style-manager';
import { TestBed } from '@angular/core/testing';

describe('Style manager service', () => {

    let manager: PipStyleManager;

    beforeEach(() => manager = TestBed.get(PipStyleManager));

    it('should set and remove links', () => {
        const spyOnAppendChild = spyOn(document.head, 'appendChild').and.callThrough();
        const spyOnRemoveChild = spyOn(document.head, 'removeChild').and.callThrough();
        manager.setLink('test', 'assets/themes/pip-blue.min.css');
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add('style-manager-test');
        linkEl.setAttribute('href', 'assets/themes/pip-blue.min.css');
        expect(spyOnAppendChild).toHaveBeenCalledWith(linkEl);
        manager.removeLink('test2');
        expect(spyOnRemoveChild).not.toHaveBeenCalled();
        manager.removeLink('test');
        expect(spyOnRemoveChild).toHaveBeenCalledWith(linkEl);
    });

    it('should set and remove styles', () => {
        const spyOnAppendChild = spyOn(document.head, 'appendChild').and.callThrough();
        const spyOnRemoveChild = spyOn(document.head, 'removeChild').and.callThrough();
        manager.setStyle('test', 'div.test{color:red};');
        const styleEl = document.createElement('style');
        styleEl.classList.add('style-manager-test');
        styleEl.innerHTML = 'div.test{color:red};';
        expect(spyOnAppendChild).toHaveBeenCalledWith(styleEl);
        manager.removeStyle('test2');
        expect(spyOnRemoveChild).not.toHaveBeenCalled();
        manager.removeStyle('test');
        expect(spyOnRemoveChild).toHaveBeenCalledWith(styleEl);
    });
});
