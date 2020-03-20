package club.yunzhi.workhome.startup;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 初始化测试账户
 * admin / admin
 */
@Component
public class InitTestUser implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger logger = LoggerFactory.getLogger(InitTestUser.class);

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    public InitTestUser(PasswordEncoder encoder, UserRepository userRepository) {
        this.encoder = encoder;
        this.userRepository = userRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        logger.debug("查询已有用户");
        List<User> users = (List<User>) userRepository.findAll();

        if (!users.isEmpty()) {
            logger.debug("用户存在，return");
            return;
        }

        User user = new User();
        user.setUsername("admin");
        user.setPassword(encoder.encode("admin"));
        users.add(user);

        logger.debug("保存");
        userRepository.saveAll(users);
    }
}
