import {Component, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  showLogin = false;
  title = 'workHomeWebApp';
  @ViewChild('alert', {static: true})
  public alert: SwalComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * 操作成功提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  success(callback?: () => void, description: string = '', title: string = '操作成功'): void {
    /**
     * 更新提示框信息
     */
    this.alert.update({
      titleText: title,
      text: description,
      icon: 'success',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      showCancelButton: false
    });
    /**
     * 订阅提示框确认消息
     */
    const result = this.alert.confirm.subscribe(() => {
      // 执行回调
      if (callback) {
        callback();
      }
      // 取消订阅
      result.unsubscribe();
    });
    /**
     * 显示提示框
     */
    this.alert.fire();
  }

  /**
   * 操作失败提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  error(callback?: () => void, description: string = '', title: string = '操作失败'): void {
    /**
     * 更新提示框信息
     */
    this.alert.update({
      titleText: title,
      text: description,
      icon: 'error',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      showCancelButton: false
    });
    /**
     * 订阅提示框确认消息
     */
    const result = this.alert.confirm.subscribe(() => {
      // 执行回调
      if (callback) {
        callback();
      }
      // 取消订阅
      result.unsubscribe();
    });
    /**
     * 显示提示框
     */
    this.alert.fire();
  }

  /**
   * 是否确认提示框
   * @param callback    回调
   * @param description 描述
   * @param title       标题
   */
  confirm(callback?: () => void, description: string = '', title: string = '是否确认'): void {
    /**
     * 更新提示框信息
     */
    this.alert.update({
      titleText: title,
      text: description,
      icon: 'question',
      background: '#F7F8FA',
      allowOutsideClick: false,
      confirmButtonText: '确定',
      confirmButtonColor: '#007BFF',
      showCancelButton: true,
      cancelButtonText: '取消'
    });

    /**
     * 订阅提示框确认消息
     */
    const result = this.alert.confirm.pipe(first()).subscribe(() => {
      // 执行回调
      if (callback) {
        callback();
      }
      // 取消订阅
      cancel.unsubscribe();
    });

    const cancel = this.alert.cancel.pipe(first()).subscribe(() => {
      result.unsubscribe();
    });

    /**
     * 显示提示框
     */
    this.alert.fire();
  }
}
