/**
 * 用户
 * @author yz
 */
import {User} from '../../common/entity/user';
import {TestingUtils} from '../../testing/testingUtils';

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
}
