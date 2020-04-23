import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../common/item';


@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.sass']
})
export class ItemSelectComponent implements OnInit {

  @Output() selected = new EventEmitter<Item>();
  @Input() item: Item;
  url = '/item/active';

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(item: Item): void {
    console.log(item);
    this.selected.emit(item);
  }

}
