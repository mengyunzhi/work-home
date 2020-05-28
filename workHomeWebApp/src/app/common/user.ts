/**
 * 用户实体
 */
export class User {
  static ROLE_TEACHER = 0;
  static ROLE_STUDENT = 1;
  /** id */
  id: number;

  /** 名称 */
  name: string;

  /** 用户名 */
  username: string;

  /** 密码 */
  password: string;

  /** 角色 */
  role: number;

  /** 是否为admin */
  admin: boolean;

  constructor(data?: { id?: number, username?: string, password?: string, role?: number, admin?: boolean}) {
    if (data) {
      if (data.id) {
        this.id = data.id;
      }

      if (data.username) {
        this.username = data.username;
      }

      if (data.password) {
        this.password = data.password;
      }

      if (data.role) {
        this.role = data.role;
      }

      if (data.admin) {
        this.admin = data.admin;
      }
    }

  }
}
