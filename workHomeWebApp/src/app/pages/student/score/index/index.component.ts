import { Component, OnInit } from '@angular/core';
import {Work} from '../../../../common/work';
import {Item} from '../../../../common/item';
import {WorkService} from '../../../../service/work.service';
import {ItemService} from '../../../../service/item.service';
import {User} from '../../../../common/user';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  works = new Array<Work>();
  currentItems = new Array<Item>();
  /**
   * 当前登录用户
   */
  currentUser: User;
  /**
   * 已批阅作业数目
   */
  reviewedWork: number;
  constructor(private workService: WorkService,
              private itemService: ItemService,
              private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.itemService.findAllActiveItems()
      .subscribe(data => {
        this.currentItems = data;
      });
    this.workService.getAllOfCurrentStudent()
      .subscribe(data => {
        this.works = data;
        this.reviewedWork = 0;
        data.forEach((work) => {
          if (work.reviewed === true) {
            this.reviewedWork++;
          }
        });
      });
  }

}
