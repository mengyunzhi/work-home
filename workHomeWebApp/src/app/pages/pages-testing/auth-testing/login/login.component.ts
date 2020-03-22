import {Component, OnInit} from '@angular/core';
import {AuthTestingController} from '../auth-testing-controller';

@Component({
  selector: 'app-login',
  template: `
    <p>
      login works!
    </p>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private controller: AuthTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
