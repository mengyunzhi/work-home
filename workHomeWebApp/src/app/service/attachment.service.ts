import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from '../common/attachment';
import { Assert } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private baseUrl = 'attachment';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 上传附件
   * @param blob 文件对象
   */
  upload(blob: Blob): Observable<Attachment> {
    /** 创建 FormData */
    const data: FormData = new FormData();
    data.append('attachment', blob);
    /** 发起请求 */
    return this.httpClient.post<Attachment>(`${this.baseUrl}`, data);
  }

  /**
   * 下载附件
   * @param attachment 附件对象
   */
  download(attachment: Attachment): Observable<Blob> {
    Assert.isDefined(attachment.savePath, 'savePath未定义');
    Assert.isDefined(attachment.saveName, 'saveName未定义');
    const url = `${attachment.savePath}/${attachment.saveName}`;
    /** 下载附件对象 */
    return this.httpClient.get<Blob>(url, {responseType: 'blob' as 'json'});
  }
}
