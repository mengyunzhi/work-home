import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  showLogin = false;
  title = 'workHomeWebApp';

  constructor() {
  }

  ngOnInit(): void {
  }

}
