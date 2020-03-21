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

  role = this.ROLE_STUDENT;

  constructor(data?: { name?: string, url?: string }) {
    if (data) {
      if (data.name) {
        this.name = data.name;
      }

      if (data.url) {
        this.url = data.url;
      }
    }
  }
}
