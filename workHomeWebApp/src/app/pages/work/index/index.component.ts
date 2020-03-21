import {Component, OnInit} from '@angular/core';
import {Work} from '../../../common/work';
import {WorkService} from '../../../service/work.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  works = new Array<Work>();

  constructor(private workService: WorkService) {
  }

  ngOnInit() {
    this.workService.getAllOfCurrentStudent()
      .subscribe(data => {
        this.works = data;
      });
  }

}
