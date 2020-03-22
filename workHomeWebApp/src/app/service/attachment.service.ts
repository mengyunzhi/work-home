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
    Assert.isDefined(attachment.md5, 'md5未定义');
    Assert.isDefined(attachment.sha1, 'sh1未定义');
    Assert.isDefined(attachment.id, 'id未定义');
    Assert.isDefined(attachment.originName, 'originName未定义');

    /** 从附件中获取参数 */
    const md5 = attachment.md5;
    const sha1 = attachment.sha1;
    const id = attachment.id;
    const originName = attachment.originName;
    /** 下载附件对象 */
    return this.httpClient.get<Blob>(`${this.baseUrl}/${md5}/${sha1}/${id}/${originName}`, { responseType: 'blob' as 'json' });
  }
}
