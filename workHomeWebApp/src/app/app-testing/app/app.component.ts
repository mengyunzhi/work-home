import {Component, OnInit} from '@angular/core';
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


  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功'): void {
    if (callback) {
      callback();
    }
  }

  /**
   * 操作失败提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  error(callback?: () => void, description: string = '', title: string = '操作失败'): void {
    if (callback) {
      callback();
    }
  }

  /**
   * 是否确认提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  confirm(callback?: () => void, description: string = '', title: string = '是否确认'): void {
    if (callback) {
      callback();
    }
  }
}
