import {Injectable} from '@angular/core';
import {Menu} from '../common/menu';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menusSubject = new BehaviorSubject<Array<Menu>>([
    new Menu({name: '我的作业'}),
    new Menu({name: '个人中心'})
  ]);

  constructor() {
  }

  getAll(): Observable<Array<Menu>> {
    return this.menusSubject.asObservable();
  }

  addMenu(menu: Menu) {
    const menus = this.menusSubject.value;
    menus.push(menu);
    this.menusSubject.next(menus);
  }
}