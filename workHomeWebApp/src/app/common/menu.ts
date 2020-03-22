/**
 * 菜单
 */
export class Menu {
  static ROLE_TEACHER = 0;
  static ROLE_STUDENT = 1;
  /** 名称 */
  name: string;

  /** 路由 */
  url = '';

  icon: string;

  roles = [Menu.ROLE_STUDENT];

  order = 0;

  constructor(data?: { name?: string, url?: string, roles?: number[], icon?: string , order?: number}) {
    if (data) {
      if (data.name) {
        this.name = data.name;
      }

      if (data.url) {
        this.url = data.url;
      }

      if (data.roles) {
        this.roles = data.roles;
      }

      if (data.icon) {
        this.icon = data.icon;
      }

      if (data.order) {
        this.order = data.order;
      }
    }
  }
}
