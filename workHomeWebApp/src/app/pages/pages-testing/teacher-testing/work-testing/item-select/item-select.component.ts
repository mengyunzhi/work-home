import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../common/item';
import {WorkTestingController} from '../work-testing-controller';

@Component({
  selector: 'app-item-select',
  template: `
    <p>
      item-select works!
    </p>
  `,
  styles: []
})
export class ItemSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<Item>();
  @Input() item: Item;
  constructor(private controller: WorkTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
