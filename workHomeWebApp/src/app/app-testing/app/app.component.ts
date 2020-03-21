import { Component, OnInit } from '@angular/core';
import {AppTestingController} from '../app-testing-controller';

@Component({
  selector: 'app-app',
  template: `
    <p>
      app works!
    </p>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private controller: AppTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
