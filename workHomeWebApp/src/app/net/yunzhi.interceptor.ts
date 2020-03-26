import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import { config } from '../conf/app.config';
import { isDefined } from '../utils';
import {CommonService} from '../service/common.service';

/**
 * Yunzhi拦截器，用于实现添加url，添加header，全局异常处理
 */
@Injectable({
  providedIn: 'root'
})
export class YunzhiInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) {

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    /**
     * 为request加上服务端前缀
     */
    let url = req.url;

    if (url.startsWith('attachment') && req.method !== 'GET' ||
      !url.startsWith('attachment') && !url.startsWith('https://') && !url.startsWith('http://') && !url.endsWith('config.json')
    ) {
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
     * 过滤到null及undefined
     */
    let cleanedParams = new HttpParams();
    request.params.keys().forEach(x => {
      if (isDefined(request.params.get(x))) {
        cleanedParams = cleanedParams.append(x, req.params.get(x));
      }
    });


    request = request.clone({headers, params: cleanedParams});

    this.commonService.setLoading(true);

    /**
     * 数据过滤
     */
    return next.handle(request).pipe(
      // mergeMap = merge + map
      mergeMap((event: any) => {
        return of(event);
      }),
      finalize(() => this.commonService.setLoading(false)),
      catchError((error: HttpErrorResponse) => {
        return this.handleHttpException(error);
      })
    );
  }

  private handleHttpException(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    switch (error.status) {
      case 401:
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
