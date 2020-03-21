/**
 * 菜单
 */
export class Menu {
  /** 名称 */
  name: string;

  /** 路由 */
  url: string;

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
