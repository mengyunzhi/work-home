/**
 * 用户
 * @author yz
 */
import {TestingUtils} from '../../testing/testingUtils';
import {Observable, of} from 'rxjs';
import {User} from '../../common/user';

export class UserStubService {

  constructor() { }

  getCurrentUser(): User {
    const user = new User();
    user.id = TestingUtils.randomNumber();
    user.username = TestingUtils.randomString('测试用户名');
    user.password = TestingUtils.randomString('测试密码');
    user.role = User.ROLE_STUDENT;
    return user;
  }

  login(user: User): Observable<User> {
    return of (new User());
  }

  setCurrentLoginUser(user: User): void {
    return;
  }
}
