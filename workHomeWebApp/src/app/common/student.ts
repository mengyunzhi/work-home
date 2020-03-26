import {User} from './user';

/**
 * 学生
 */

export class Student {
  id: number;

  name: string;

  no: string;

  user = new User();

  constructor(params?: {id?: number; name?: string; no?: string; user?: User}) {
    if (!params) {
      return;
    }
    this.id = params.id ? params.id : null;
    this.name = params.name ? params.name : null;
    this.no = params.no ? params.no : null;
    this.user = params.user ? params.user : new User();
  }
}
