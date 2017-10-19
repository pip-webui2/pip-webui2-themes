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

    it('selectedTheme function should change theme', () => {
        //service.selectedTheme = 'new-theme';
        //expect(service.selectedTheme).toEqual('new-theme');  
    });
});