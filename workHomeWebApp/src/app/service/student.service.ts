import {Injectable} from '@angular/core';
import {Student} from '../common/student';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'Student';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 保存学生
   * @param student 保存学生
   */
  public save(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.url, student);
  }

  /**
   * 分页
   * @param params name:名称,no:学号, page:第几页,size:每页大小
   */
  page(params: { name?: string, no?: string, page?: number, size?: number }):
    Observable<{ totalPages: number, content: Array<Student> }> {

    /* 设置默认值 */
    if (params.page === undefined) {
      params.page = 0;
    }
    if (params.size === undefined) {
      params.size = 10;
    }

    /* 初始化查询参数 */
    const queryParams = new HttpParams()
      .set('name', params.name ? params.name : '')
      .set('no', params.no ? params.no : '')
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    console.log(queryParams);

    return this.httpClient.get<{ totalPages: number, content: Array<Student> }>(`${this.url}/getAll`, {params: queryParams});
  }

  /**
   * 获取当前登录的学生
   */
  public getCurrentStudent(): Observable<Student> {
    return this.httpClient.get<Student>(`${this.url}/getCurrentStudent`);
  }
  /**
   * 根据id获取学生
   * @param id  学生id
   */
  public getById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.url}/${id}`);
  }

  /**
   * 更新学生信息
   * @param id  学生id
   * @param student 学生信息
   */
  public update(id: number, student: Student): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}`, student);
  }

  /**
   * 删除学生
   * @param id  学生id
   */
  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
