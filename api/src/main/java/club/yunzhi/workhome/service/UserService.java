package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;

public interface UserService {

    User findByUsername(String username);
}
