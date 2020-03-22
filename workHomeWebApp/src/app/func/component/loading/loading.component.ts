import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit, OnDestroy {
  tips = '';
  timeOut: number;

  constructor() {
  }

  ngOnInit() {
    this.getTips();
  }

  getTips() {
    this.timeOut = setTimeout(() => {
      if (this.tips.length < 4) {
        this.tips = this.tips + '.';
      } else {
        this.tips = '';
      }
      this.getTips();
    }, 500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }

}
