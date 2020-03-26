package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.UserRepository;
import org.junit.Assert;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;


public class UserServiceImplTest extends ServiceTest{

    @Mock
    private UserRepository userRepository;
    private String initialPassword = "yunzhi";

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void resetPassword() {
        User user= new User();
        user.setId(this.random.nextLong());
        user.setUsername("testUserName");
        Mockito.doReturn(user).when(userRepository).save(Mockito.any(User.class));
        userService.resetPassword(user);
        Assert.assertTrue(passwordEncoder.matches(initialPassword, user.getPassword()));
    }
}