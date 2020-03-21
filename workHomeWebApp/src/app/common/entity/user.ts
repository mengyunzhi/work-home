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


  constructor(id: number, username: string, password: string, role: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
