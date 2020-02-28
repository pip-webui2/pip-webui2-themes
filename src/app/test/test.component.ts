import { Component, EventEmitter, Input, Output, HostBinding, Renderer2 } from '@angular/core';

@Component({
  selector: 'pip-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  @HostBinding('class.pip-test') pipTestClass = true;
  @HostBinding('class.mat-primary') matPrimaryClass = false;
  @HostBinding('class.mat-accent') matAccentClass = false;
  @HostBinding('class.mat-warn') matWarnClass = false;

  @Input() set color(color: string) {
    switch (color) {
      case 'primary':
        this.matPrimaryClass = true;
        this.matAccentClass = false;
        this.matWarnClass = false;
        break;
      case 'accent':
        this.matPrimaryClass = false;
        this.matAccentClass = true;
        this.matWarnClass = false;
        break;
      case 'warn':
        this.matPrimaryClass = false;
        this.matAccentClass = false;
        this.matWarnClass = true;
        break;
    }
  }
  @Input() text = 'This is a test component';
  @Output() event = new EventEmitter();

  public onClick(): void {
    this.event.emit(this.text);
  }

}
