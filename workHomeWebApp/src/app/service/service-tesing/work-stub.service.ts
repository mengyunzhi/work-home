import {Observable, of} from 'rxjs';
import {Work} from '../../common/work';
import {TestingUtils} from '../../testing/testingUtils';
import {Attachment} from '../../common/attachment';

export class WorkStubService {

  constructor() {
  }

  getAllOfCurrentStudent(): Observable<Array<Work>> {
    const work = new Work();
    work.id = TestingUtils.randomNumber();
    work.item.name = TestingUtils.randomString('实验名称');
    work.item.beginTime = TestingUtils.randomNumber();
    work.item.endTime = TestingUtils.randomNumber();
    work.item.active = (TestingUtils.randomNumber() % 2) === 0;
    work.reviewed = true;
    work.score = 90;
    return of([work]);
  }

  getById(id: number) {
    return of(new Work());
  }

  getByItemIdOfCurrentStudent(itemId: number): Observable<Work> {
    const work = new Work();
    work.id = TestingUtils.randomNumber();
    work.content = TestingUtils.randomString('作业内容');
    work.attachments = [new Attachment()];
    return of(work);
  }

  updateOfCurrentStudent(id: number, work: Work): Observable<Work> {
    const resultWork = new Work();
    resultWork.id = TestingUtils.randomNumber();
    resultWork.content = TestingUtils.randomString('作业内容');
    resultWork.attachments = [new Attachment()];
    return of(resultWork);
  }
}
