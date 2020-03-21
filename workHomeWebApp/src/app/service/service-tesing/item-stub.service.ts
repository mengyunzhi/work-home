import {Item} from '../../common/item';
import {Observable, of} from 'rxjs';
import {TestingUtils} from '../../testing/testingUtils';

export class ItemStubService {

  constructor() { }

  getCurrentActiveItem(): Observable<Item> {
    const item = new Item();
    item.id = TestingUtils.randomNumber();
    item.name = TestingUtils.randomString('实验项目名称');
    return of(item);
  }
}
