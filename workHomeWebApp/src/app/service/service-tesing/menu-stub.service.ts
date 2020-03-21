import {Menu} from '../../common/menu';
import {TestingUtils} from '../../testing/testingUtils';
import {Observable, of} from 'rxjs';

export class MenuStubService {
  private menus = new Array<Menu>();

  constructor() {
    const menu = new Menu();
    menu.name = TestingUtils.randomString('测试菜单');
    menu.url = TestingUtils.randomString('测试url');
    menu.role = Menu.ROLE_STUDENT;
    this.menus.push(menu);

    const menu1 = new Menu();
    menu1.name = TestingUtils.randomString('测试菜单');
    menu1.url = TestingUtils.randomString('测试url');
    menu1.role = Menu.ROLE_TEACHER;
    this.menus.push(menu1);
  }

  getAll(): Observable<Array<Menu>> {
    return of(this.menus);
  }

  addMenu(menu: Menu) {
    this.menus.push(menu);
  }
}
