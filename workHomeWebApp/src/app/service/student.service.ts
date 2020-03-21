import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../common/student';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'student';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 保存学生
   * @param student 保存学生
   */
  public save(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.url, student);
  }
}
