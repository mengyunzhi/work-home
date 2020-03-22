import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {isDefined} from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  showLogin = true;
  title = 'workHomeWebApp';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      if (isDefined(user)) {
        this.showLogin = false;
      } else {
        this.showLogin = true;
      }
    });
  }

}
