import {Observable, of} from 'rxjs';
import {Work} from '../../common/work';
import {TestingUtils} from '../../testing/testingUtils';
import {Attachment} from '../../common/attachment';
import {Page} from '../../base/page';
import {Injectable} from '@angular/core';
import {Item} from '../../common/item';
import {Student} from '../../common/student';

@Injectable({
  providedIn: 'root'
})
export class WorkStubService {

  /* 传入参数缓存 */
  pageParamsCache: { page: number, size: number};
  workIdCache: number;
  updateScoreCache: { id: number, work: Work};

  constructor() {
  }

  getAllOfCurrentStudent(): Observable<Array<Work>> {
    const work = new Work();
    work.id = TestingUtils.randomNumber();
    work.item.name = TestingUtils.randomString('实验名称');
    work.item.beginTime = TestingUtils.randomNumber();
    work.item.endTime = TestingUtils.randomNumber();
    work.item.active = (TestingUtils.randomNumber() % 2) === 0;
    work.content = null;
    work.reviewed = true;
    work.score = 90;
    return of([work]);
  }

  getByItemIdOfCurrentStudent(itemId: number): Observable<Work> {
    const work = new Work();
    work.id = TestingUtils.randomNumber();
    work.content = TestingUtils.randomString('作业内容');
    work.attachments = [new Attachment()];
    work.item.attachments = [new Attachment()];
    work.item.name = TestingUtils.randomString('实验名称');
    return of(work);
  }

  updateOfCurrentStudent(id: number, work: Work): Observable<Work> {
    const resultWork = new Work();
    resultWork.id = TestingUtils.randomNumber();
    resultWork.content = TestingUtils.randomString('作业内容');
    resultWork.attachments = [new Attachment()];
    return of(resultWork);
  }

  /**
   * getAll模拟方法
   * @param params 查询参数
   */
  getAll(params: {page: number, size: number, reviewed?: boolean}): Observable<Page<Work>> {
    this.pageParamsCache = params;
    const work1 = new Work({
      id: 1, content: '123', item: new Item({name: 'Item'}), score: 100,
      student: new Student({name: 'Student', no: '123'}), reviewed: true });
    const work2 = new Work({
      id: 2, content: '456', item: new Item({name: 'Item'}), score: 100,
      student: new Student({name: 'Student', no: '456'}), reviewed: false });

    let mockResult = new Page<Work>();
    if (params.reviewed === true) {
      mockResult = new Page<Work>(
        {content: new Array<Work>( work1 ), number: 1, size: 2, totalPages: 5}
      );
    } else if (params.reviewed === false) {
      mockResult = new Page<Work>(
        {content: new Array<Work>( work2 ), number: 1, size: 2, totalPages: 5}
      );
    } else {
      mockResult = new Page<Work>(
        {content: new Array<Work>( work1, work2 ), number: 1, size: 2, totalPages: 5}
      );
    }


    return of(mockResult);
  }

  getById(params: { id: number }): Observable<Work> {
    this.workIdCache = params.id;
    const mockResult = new Work(
      {
            id: 1, content: '<p>content</p>', item: new Item({name: 'Item', description: 'TestItem'}),
            score: 100, student: new Student({name: 'Student'}), reviewed: true});
    return of(mockResult);
  }

  /**
   * 更新成绩
   * @param id 作业ID
   * @param work Work
   */
  updateScore(params: { id: number, work: Work }): Observable<Work> {
    this.updateScoreCache = params;
    return of(params.work);
  }

  getNextNotReviewedWork(): Observable<Work> {
    return of(null);
  }
}
