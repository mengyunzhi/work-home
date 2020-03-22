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
   * 根据实验ID获取当前学生对应的作业
   * @param itemId 实验
   */
  getByItemIdOfCurrentStudent(itemId: number): Observable<Work> {
    Assert.isNumber(itemId, '学期号必须是有效的numbert');
    const params = new HttpParams().set('itemId', itemId.toString());
    return this.httpClient.get<Work>(`#{this.url}/getByItemIdOfCurrentStudent`, {params});
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
}
