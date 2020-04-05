import {Observable, of} from 'rxjs';
import {Student} from '../../common/student';

export class StudentStubService {

  constructor() { }

  /* 传入参数缓存 */
  pageParamsCache: { no?: string, name?: string, page?: number, size?: number };

  /**
   * page模拟方法
   * @param params 查询参数
   */
  page(params: { no?: string, name?: string, page?: number, size?: number })
    : Observable<{ totalPages: number, content: Array<Student> }> {
    this.pageParamsCache = params;
    const mockResult = {
      totalPages: 100,
      content: new Array<Student>(
        new Student({id: 1, name: 'testStudent', no: 'testStudentNo'}),
        new Student({id: 2, name: 'testStudent1', no: 'testStudentNo1'}))
    };
    return of(mockResult);
  }

  public getById(id: number): Observable<Student> {
      const student = new Student();
      student.id = id;
      return of(student);
  }
  public getCurrentStudent(): Observable<Student> {
    const student = new Student();
    return of(student);
  }
}
