import { Component, OnInit } from '@angular/core';
import {PartTestingController} from '../part-testing-controller';

@Component({
  selector: 'app-layout',
  template: `
    <p>
      layout works!
    </p>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor(private controller: PartTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
