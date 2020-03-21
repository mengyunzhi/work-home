import { Component, OnInit } from '@angular/core';
import {Work} from '../../../common/work';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  works = new Array<Work>();
  constructor() { }

  ngOnInit() {
  }

}
