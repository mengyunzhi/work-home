import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserService} from '../../service/user.service';
import {User} from '../../common/user';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   *  当前用户
   */
  currentUser: User;

  environment = environment;

  private subscription: Subscription;

  constructor(private router: Router,
              private userService: UserService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.commonService.appOnReady(() => {
      this.currentUser = this.userService.getCurrentUser();
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(() => {
      }, () => {
      }, () => {
        this.router.navigateByUrl('');
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
