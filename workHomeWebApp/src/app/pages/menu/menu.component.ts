import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {MenuService} from '../../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  // currentLoginUser: User;

  environment = environment;

  // primaryMenus: Array<BaseMenu>;

  // menus: Array<BaseMenu>;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getAll().
    // this.primaryMenus = menus;
    // this.subscription = this.authService.getCurrentLoginUser$()
    //   .subscribe((user: User) => {
    //     if (user === null) {
    //       this.menus = [];
    //       return;
    //     }
    //     this.currentLoginUser = user;
    //
    //     /**
    //      * 构造 当前用户被授权的菜单 url 集合
    //      */
    //     const urlSet = new Set<string>();
    //     for (const role of this.currentLoginUser.roles) {
    //       for (const menu of role.menus) {
    //         urlSet.add(menu.url);
    //       }
    //     }
    //
    //     /**
    //      * 过滤菜单，只显示用户有权访问菜单 或 默认显示菜单
    //      */
    //     this.menus = this.primaryMenus.filter(menu => urlSet.has(menu.url) || menu.defaultShow);
    //   });
  }

  // navigate(menu: BaseMenu): void {
  //   this.router.navigateByUrl(menu.url);
  // }
  //
  // getBackgroundColor(menu: BaseMenu): string {
  //   if (this.active(menu)) {
  //     return environment.color;
  //   }
  // }

  // getTextColor(menu: BaseMenu): string {
  //   if (this.active(menu)) {
  //     return 'white';
  //   }
  // }

  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
  // active(menu: BaseMenu): boolean {
  //   // 截取/的位置
  //   const start = this.router.url.indexOf('/');
  //   const end = this.router.url.indexOf('/', start + 1);
  //
  //   // 定义主路由
  //   let mainRoute: string;
  //
  //   // 根据是否有第2个/选择截取方式
  //   if (end !== -1) {
  //     mainRoute = this.router.url.substring(start + 1, end);
  //   } else {
  //     mainRoute = this.router.url.substring(start + 1, this.router.url.length);
  //   }
  //
  //   // 判断当前路由是否激活
  //   return mainRoute === menu.url;
  // }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
