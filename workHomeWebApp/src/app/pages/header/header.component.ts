import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // // 当前用户
  // currentUser: User;

  environment = environment;

  private subscription: Subscription;

  constructor(private router: Router,
              ) {
  }

  ngOnInit() {
    // this.init();
  }

  // init() {
  //   this.subscription = this.authService.getCurrentLoginUser$()
  //     .subscribe(user => this.currentUser = user);
  // }
  //
  // logout() {
  //   /**
  //    * complete 时跳转
  //    */
  //   this.authService.logout()
  //     .subscribe(() => {
  //       this.router.navigateByUrl('auth');
  //     }, () => {
  //       this.router.navigateByUrl('auth');
  //     });
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
