package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.vo.VUser;

public interface UserService {

    User findByUsername(String username);

    /**
     * 获取登录用户
     *
     * @return 登录用户 | null
     */
    User getCurrentLoginUser();

    /**
     * 校验密码是否正确
     *
     * @param vUser 带有密码的VUser
     * @return true 正确 false 不正确
     */
    boolean checkPasswordIsRight(VUser vUser);

    /**
     * 修改密码
     *
     * @param vUser 带有新密码和旧密码VUser
     */
    void updatePassword(VUser vUser);
}
