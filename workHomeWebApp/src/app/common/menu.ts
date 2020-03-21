/**
 * 菜单
 */
export class Menu {
  static ROLE_TEACHER = 0;
  static ROLE_STUDENT = 1;
  /** 名称 */
  name: string;

  /** 路由 */
  url: string;

  icon: string;

  role = Menu.ROLE_STUDENT;

  order = 0;

  constructor(data?: { name?: string, url?: string, role?: number, icon?: string , order?: number}) {
    if (data) {
      if (data.name) {
        this.name = data.name;
      }

      if (data.url) {
        this.url = data.url;
      }

      if (data.role) {
        this.role = data.role;
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
