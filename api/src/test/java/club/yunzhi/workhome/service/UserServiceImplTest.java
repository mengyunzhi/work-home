package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;


public class UserServiceImplTest extends ServiceTest{
private UserServiceImpl userService;
private UserRepository userRepository;
private StudentRepository studentRepository;
private String initialPassword = "yunzhi";

@Autowired
PasswordEncoder passwordEncoder;

@Autowired
PasswordEncoder encoder;
    @Before
    public void before() {
        this.userRepository = Mockito.mock(UserRepository.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        UserServiceImpl userService = new UserServiceImpl(this.userRepository,this.passwordEncoder,this.encoder);
        this.userService = Mockito.spy(userService);
    }

    @Test
    public void resetPassword() {
        User user= new User();
        user.setId(this.random.nextLong());
        Mockito.doReturn(user).when(userRepository).save(user);
        userService.resetPassword(user);
        String resultPassword = encoder.encode(this.initialPassword);
        Assert.assertEquals(user.getPassword(),resultPassword);
    }
}