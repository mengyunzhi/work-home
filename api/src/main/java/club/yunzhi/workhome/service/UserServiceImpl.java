package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.UserRepository;
import club.yunzhi.workhome.vo.VUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public User getCurrentLoginUser() {
        logger.debug("初始化用户");
        User user = null;

        logger.debug("获取用户认证信息");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        logger.debug("根据认证信息查询用户");
        if (authentication != null && authentication.isAuthenticated()) {
            user = userRepository.findByUsername(authentication.getName());
        }

        return user;
    }

    @Override
    public boolean checkPasswordIsRight(VUser vUser) {
        logger.debug("获取当前用户");
        User user = this.getCurrentLoginUser();

        logger.debug("比较密码是否正确");
        return this.passwordEncoder.matches(vUser.getPassword(), user.getPassword());
    }

    @Override
    public void updatePassword(VUser vUser) {
        logger.debug("获取当前用户");
        User currentUser = this.getCurrentLoginUser();

        logger.debug("校验原密码是否正确");
        if (!this.checkPasswordIsRight(vUser)) {
            throw new ValidationException("原密码不正确");
        }

        logger.debug("更新密码");
        currentUser.setPassword(this.passwordEncoder.encode(vUser.getNewPassword()));
        this.userRepository.save(currentUser);
    }
}
