import {Observable, of} from 'rxjs';
import {Student} from '../../common/student';

export class StudentStubService {

  constructor() { }

  public getById(id: number): Observable<Student> {
      const student = new Student();
      student.id = id;
      return of(student);
  }
}
