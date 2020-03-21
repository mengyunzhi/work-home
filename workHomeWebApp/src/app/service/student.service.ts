import {Injectable} from '@angular/core';
import {Student} from '../common/student';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
   * 获取所有学生
   */
  public getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.url + '/getAll');
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
