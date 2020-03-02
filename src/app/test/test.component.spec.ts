import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set color', async(async () => {
    component.color = 'primary';
    await fixture.whenStable();
    expect(component.matAccentClass).toBeFalsy();
    expect(component.matPrimaryClass).toBeTruthy();
    expect(component.matWarnClass).toBeFalsy();
    component.color = 'accent';
    await fixture.whenStable();
    expect(component.matAccentClass).toBeTruthy();
    expect(component.matPrimaryClass).toBeFalsy();
    expect(component.matWarnClass).toBeFalsy();
    component.color = 'warn';
    await fixture.whenStable();
    expect(component.matAccentClass).toBeFalsy();
    expect(component.matPrimaryClass).toBeFalsy();
    expect(component.matWarnClass).toBeTruthy();
    component.color = 'unknown';
    await fixture.whenStable();
    expect(component.matAccentClass).toBeFalsy();
    expect(component.matPrimaryClass).toBeFalsy();
    expect(component.matWarnClass).toBeFalsy();
  }));

  it('should emit clicks', () => {
    const spyOnClickEmit = spyOn(component.event, 'emit');
    component.text = 'test';
    component.onClick();
    expect(spyOnClickEmit).toHaveBeenCalledWith('test');
    spyOnClickEmit.calls.reset();
    component.text = 'test2';
    component.onClick();
    expect(spyOnClickEmit).toHaveBeenCalledWith('test2');
  });
});
