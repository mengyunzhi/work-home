import {Component, OnInit} from '@angular/core';
import {Work} from '../../../common/work';
import {WorkService} from '../../../service/work.service';
import {Item} from '../../../common/item';
import {ItemService} from '../../../service/item.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  works = new Array<Work>();
  currentItem = new Item();

  constructor(private workService: WorkService,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemService.getCurrentActiveItem()
      .subscribe(data => {
        this.currentItem = data;
      });
    this.workService.getAllOfCurrentStudent()
      .subscribe(data => {
        this.works = data;
      });
  }
}
