import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartTestingController} from '../part-testing-controller';

@Component({
  selector: 'app-size-select',
  template: `
    <p>
       size-select works!
    </p>
  `,
  styles: []
})
export class SizeSelectComponent implements OnInit {
  @Input() size: number;

  @Output() changeSize = new EventEmitter<number>();

  constructor(private controller: PartTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
