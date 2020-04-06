import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


/**
 * 应用程序准备完毕的影响元素
 * 用于程序程序时，设置：应用程序准备完毕状态
 * 比如系统启用动需要首先获取当前登录用户及系统菜单
 * 当所有的加载完成后，我们认为系统已准备完毕，此时可以进行相应的其它请求
 *
 * 使用示例详见：userService
 */
class AppOnReadyItem {

  /*本元素（比如：系统菜单）是否准备完毕*/
  private _ready = false;

  /* 当发送是否准备完毕状态时执行的回调方法 */
  private readonly sendReadyFn: (state: boolean) => void = (() => {
  });

  constructor(fn: (readyState: boolean) => void) {
    this.sendReadyFn = fn;
  }

  get ready(): boolean {
    return this._ready;
  }

  set ready(value: boolean) {
    this._ready = value;
    this.sendReadyFn(value);
  }
}

/**
 * 返回window
 */
function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /**
   * 应用是否准备完毕
   */
  private appIsReadySubject = new BehaviorSubject<boolean>(true);
  private appIsReady$: Observable<boolean>;
  private loadingSubject = new Subject<boolean>();
  public loading$: Observable<boolean>;

  /**
   * 缓存的当应用准备完毕后回调的函数
   * 该函数仅当应用准备完毕后调用1次
   */
  private appOnReadyCacheCallbacks: Array<() => void> = [];

  /**
   * 影响应用准备完毕的项
   * 遵循：对扩展开放，对修改关闭的原则。其它模块如果有影响系统启动的项时，将其添加到本属性中即可
   */
  private appOnReadyItems = Array<AppOnReadyItem>();

  constructor() {
    this.$onInit();
  }

  $onInit(): void {
    this.loading$ = this.loadingSubject.asObservable();
    this.appIsReady$ = this.appIsReadySubject.asObservable();
    this.appIsReady$.subscribe(isReady => {
      if (isReady) {
        this.invokeOnReadyCacheCallback();
      }
    });
  }

  public getAppOnReadyItem(isReady = false): AppOnReadyItem {
    // 实初化
    const appOnReadyItem = new AppOnReadyItem((readyState) => {
      this.computeAppIsReady(readyState);
    });
    appOnReadyItem.ready = isReady;
    this.appOnReadyItems.push(appOnReadyItem);

    // 当前项为：未就绪，则重新计算
    if (!isReady) {
      this.computeAppIsReady(isReady);
    }
    return appOnReadyItem;
  }

  /**
   * 应用程序准备就绪
   * @param callback 回调方法
   */
  appOnReady(callback: () => void) {
    if (this.appIsReadySubject.getValue()) {
      callback();
    } else {
      this.appOnReadyCacheCallbacks.push(callback);
    }
  }


  /**
   * 计算是否所有的系统启动项均已准备完毕
   * 遍历元素，所有的元素全部准备完毕，发送true
   * @param readyState 准备状态
   */
  private computeAppIsReady(readyState) {
    if (!readyState) {
      this.appIsReadySubject.next(false);
    } else {
      let result = true;
      this.appOnReadyItems.forEach(readyItem => {
        if (!readyItem.ready) {
          result = false;
        }
      });
      this.appIsReadySubject.next(result);
    }
  }

  get nativeWindow(): any {
    return _window();
  }

  /**
   * 调用缓存的回调方法，并在调用后清空缓存以防止被二次调用
   */
  invokeOnReadyCacheCallback() {
    this.appOnReadyCacheCallbacks.forEach(callback => {
      callback();
    });
    this.appOnReadyCacheCallbacks.splice(0, this.appOnReadyCacheCallbacks.length);
  }

  setLoading(state: boolean): void {
    this.loadingSubject.next(state);
  }
}

