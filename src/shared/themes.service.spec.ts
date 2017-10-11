import { TestBed, inject } from '@angular/core/testing';
import { Component, Renderer, ElementRef } from '@angular/core';
import { MatSidenavModule } from '@angular/material'

import { PipThemesService } from './themes.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('Themes service', () => {
    let service: PipThemesService;
    let form;

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
    beforeEach(inject([PipThemesService], (PipThemesService) => {
        service = PipThemesService;
    }));

    it('should have an instance', () => {
        expect(service).toBeDefined();
    });

    it('useTheme function should change theme', () => {
        //service.useTheme('new theme');
        //expect(service.theme).toEqual('new theme');  
    });
});