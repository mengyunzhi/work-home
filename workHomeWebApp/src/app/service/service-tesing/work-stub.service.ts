import {Observable, of} from 'rxjs';
import {Work} from '../../common/work';
import {TestingUtils} from '../../testing/testingUtils';

export class WorkStubService {

  constructor() { }

  getAllOfCurrentStudent(): Observable<Array<Work>> {
    const work = new Work();
    work.id = TestingUtils.randomNumber();
    work.item.name =  TestingUtils.randomString('实验名称');
    work.item.beginTime = TestingUtils.randomNumber();
    work.item.endTime = TestingUtils.randomNumber();
    work.reviewed = true;
    work.score = 90;
    return of([work]);
  }
}
