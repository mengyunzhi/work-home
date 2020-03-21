import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FuncTestingController} from '../../func-testing-controller';

@Component({
  selector: 'app-editor-component',
  template: `
    <p>
      editor-component works!
    </p>
  `,
  styles: []
})
export class EditorComponentComponent implements OnInit {
  @Input()
  content: string;

  @Output()
  contentEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private controller: FuncTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
