import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  /**
   * 当前是否为默认密码
   */
  default: boolean;

  constructor() {
  }

  ngOnInit() {
    /**
     * 验证当前用户是否为默认密码
     */

  }

  /**
   * 关闭提示信息
   */
  closeToast() {
    this.default = false;
  }
}
