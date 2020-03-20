import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { config } from '../../conf/app.config';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

/**
 * Yunzhi拦截器，用于实现添加url，添加header，全局异常处理
 */
@Injectable({
  providedIn: 'root'
})
export class YunzhiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    /**
     * 为request加上服务端前缀
     */
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = config.server + url;
    }
    let request = req.clone({url});

    /**
     * 设置headers，防止弹出对话框
     * https://stackoverflow.com/questions/37763186/spring-boot-security-shows-http-basic-auth-popup-after-failed-login
     */
    let headers = request.headers;
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    request = request.clone({headers});

    /**
     * 数据过滤
     */
    return next.handle(request).pipe(
      // mergeMap = merge + map
      mergeMap((event: any) => {
        return of(event);
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpException(error);
      })
    );
  }

  private handleHttpException(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    switch (error.status) {
      case 401:
        if (this.router.url !== 'admin/login') {
          swal.fire({
            icon: 'error',
            title: '操作失败',
            text: '请先登陆!'
          }).then(() => {
            // 未登录，跳转到登录页
            this.router.navigateByUrl('admin/login');
          });
        }
        break;
      case 403:
        break;
      case 404:
        break;
    }
    // 最终将异常抛出来，便于组件个性化处理
    throw error;
  }
}
