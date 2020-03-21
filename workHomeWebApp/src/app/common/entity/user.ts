/**
 * 用户
 */
export class User {
  static ROLE_TEACHER = 0;
  static ROLE_STUDENT = 1;
  id: number;
  username: string;
  password: string;
  role: number;

  constructor(data?: { id?: number, username?: string, password?: string, role?: number }) {
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
    }

  }
}
