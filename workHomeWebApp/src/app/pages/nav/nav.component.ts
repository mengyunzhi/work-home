import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  title: string;
  show: boolean;

  private titleSubscription: Subscription;
  private backSubscription: Subscription;

  constructor(private commonService: CommonService,
  ) {
  }

  ngOnInit() {
    // /** 订阅标题 */
    // this.titleSubscription = this.titleService.title()
    //   .subscribe((title: string) => this.title = title);
    // /** 订阅是否允许返回 */
    // this.backSubscription = this.commonService.canBack()
    //   .subscribe((canBack: boolean) => this.show = canBack);
  }

  back(): void {
    // this.commonService.back();
  }

  ngOnDestroy(): void {
    /** 统一取消订阅 */
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }

    if (this.backSubscription) {
      this.backSubscription.unsubscribe();
    }
  }

}
