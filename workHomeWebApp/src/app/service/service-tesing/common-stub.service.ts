import {Subject} from 'rxjs';
import {CommonService} from '../common.service';

export class CommonStubService extends CommonService {
  /**
   * 手动控制应用是否准备完毕
   */
  private _isReady = true;
  private onReadyCacheCallbacks: Array<() => void> = new Array();

  get isReady(): boolean {
    return this._isReady;
  }

  set isReady(value: boolean) {
    this._isReady = value;
    this.isReadySubject.next(value);
  }

  private isReadySubject = new Subject<boolean>();

  constructor() {
    super();
  }

  /**
   * 直接将callback添加到缓存中
   * @param callback 回调
   */
  appOnReady(callback): void {
    if (this._isReady) {
      if (callback) {
        callback();
      }
    } else {
      this.onReadyCacheCallbacks.push(callback);
    }
  }


}
