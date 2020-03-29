import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YunzhiInterceptor } from '../net/yunzhi.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;
  private url = 'config.json';


  constructor(private httpClient: HttpClient) {
    this.config = require('./../../config.json');
    this.$onInit();
  }

  /**
   * 由于浏览器的缓存机制。当应用程序前后台更新时
   * 用户使用可能还是浏览器缓存的老前台。此时老前台+新后台，则会发生一些非预期内的错误
   * 解决方法：
   * 程序启动时向服务器发起版本请求
   * 如果版本相同，则说明当前台与服务器的前台版本统一
   * 不同，则使用location.reload(true)方法来强制刷新浏览器
   * 从而达到清空缓存的目的
   */
  $onInit() {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set(YunzhiInterceptor.DONT_INTERCEPT_HEADER_KEY, 'true');
    this.httpClient.get<Config>(this.url, {headers})
      .subscribe(data => {
        if (data.version !== this.config.version) {
          this.httpClient.get('', {headers, responseType: 'text'})
            .subscribe(() => location.reload());
        }
      });
  }
}

class Config {
  version: string;
  maxFileSize: string;
}
