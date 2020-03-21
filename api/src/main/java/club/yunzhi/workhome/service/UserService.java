package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;

public interface UserService {

    User findByUsername(String username);

    /**
     * 获取登录用户
     * @return 登录用户 | null
     */
    User getCurrentLoginUser();
}
