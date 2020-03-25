/**
 * 用户
 * @author yz
 */
import {TestingUtils} from '../../testing/testingUtils';
import {Observable, of, Subject} from 'rxjs';
import {User} from '../../common/user';
import {Student} from '../../common/student';

export class UserStubService {
  currentLoginUser$ = new Subject<User>();
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
  resetPassword(student: Student): Observable<void> {
    return of();
  }

}
