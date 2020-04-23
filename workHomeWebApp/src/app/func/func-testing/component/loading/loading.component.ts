import {Component, OnInit} from '@angular/core';
import {FuncTestingController} from '../../func-testing-controller';

@Component({
  selector: 'app-loading',
  template: `
    <p>
      loading works!
    </p>
  `,
  styles: []
})
export class LoadingComponent implements OnInit {

  constructor(private controller: FuncTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
