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
  pageParamsCache: { page: number, size: number , workId: number};

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

  // 之前的getById，没有被调用过
  /*getById(id: number) {
    return of(new Work());
  }*/

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
  getAll(params: {page: number, size: number}): Observable<Page<Work>> {
    this.pageParamsCache.page = params.page;
    this.pageParamsCache.size = params.size;
    const mockResult = new Page<Work>(
      {content: new Array<Work>(
        new Work({
          id: 1, content: '123', item: new Item({name: 'Item'}), score: 100, student: new Student({name: 'Student'}), reviewed: true}),
        new Work({
          id: 2, content: '456', item: new Item({name: 'Item'}), score: 100, student: new Student({name: 'Student'}), reviewed: true})
        ), number: 1, size: 2, totalPages: 5}
    );
    return of(mockResult);
  }

  getById(params: { id: number }): Observable<Work> {
    this.pageParamsCache.workId = params.id;
    const mockResult = new Work(
      {
            id: 1, content: '<p>content</p>', item: new Item({name: 'Item'}),
            score: 100, student: new Student({name: 'Student'}), reviewed: true});
    return of(mockResult);
  }
}
