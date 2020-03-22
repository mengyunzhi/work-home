import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Work} from '../common/work';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Assert} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private url = 'work';

  constructor(private httpClient: HttpClient) {
  }

  getAllOfCurrentStudent(): Observable<Array<Work>> {
    return this.httpClient.get<Array<Work>>(`${this.url}/getAllOfCurrentStudent`);
  }

  getById(id: number): Observable<Work> {
    return of(new Work());
    // return this.httpClient.get<Work>(this.url + '/' + id);
  }

  /**
   * 更新前台学生作业
   * @param id 作业ID
   * @param work 作业
   */
  updateOfCurrentStudent(id: number, work: Work): Observable<Work> {
    Assert.isNumber(id, '未接收到有效的id值 ');
    Assert.isDefined(work, '未接收到有效的work值');
    return this.httpClient.put<Work>(this.url + '/updateOfCurrentStudent/' + id, work);
  }

  deleteAttachment(workId: number, attachmentId: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/deleteAttachment/' + workId + '/' + attachmentId);
  }

  getByItemIdOfCurrentStudent(itemId: number): Observable<Work> {
    const params: { [key: string]: any } = {itemId};
    return this.httpClient.get<Work>(this.url + '/getByItemIdOfCurrentStudent', {params});
  }
}
