import {Component, OnInit} from '@angular/core';
import {Work} from '../../../../common/work';
import {WorkService} from '../../../../service/work.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../../service/common.service';
import {User} from '../../../../common/user';
import {UserService} from '../../../../service/user.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  work = new Work();
  host: string;
  protocol: string;  // 协议
  currentUser: User;
  _window: any;
  constructor(private workService: WorkService,
              private router: Router,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private userService: UserService,
              ) { }

  ngOnInit() {
    this.commonService.appOnReady(() => {
      this._window = this.commonService.nativeWindow;
      this.host = this._window.location.host;
      this.protocol = this._window.location.protocol;
      this.getCurrentUser();
      this.load();
    });
    this.load();
  }
  public load() {
    this.route.params.subscribe((params: Params) => {
      const _id = params.workId;
      this.workService.getById({id: _id})
        .subscribe((data) => {
          this.work = data;
        }, () => {
          console.log('error');
        });
    });
  }

  public getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }
  getWorkDir(): string {
    if (this.work.item.dir) {
      return this.work.item.dir;
    }
    return '';
  }
}
