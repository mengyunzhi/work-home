package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Random;

import static org.junit.Assert.*;

public class UserServiceImplTest extends ServiceTest{
private UserServiceImpl userService;
private UserRepository userRepository;
private  PasswordEncoder passwordEncoder;
private  PasswordEncoder encoder;
private StudentRepository studentRepository;
private String initialPassword = "yunzhi";
    @Before
    public void before() {
        this.userRepository = Mockito.mock(UserRepository.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        this.passwordEncoder = Mockito.mock(PasswordEncoder.class);
        this.encoder = Mockito.mock(PasswordEncoder.class);
        UserServiceImpl userService = new UserServiceImpl(this.userRepository,this.passwordEncoder,this.encoder);
        this.userService = Mockito.spy(userService);
    }

    @Test
    public void resetPassword() {
        Student mockResultStudent = new Student();
        mockResultStudent.setId(this.random.nextLong());
        mockResultStudent.setName(RandomString.make(4));
        mockResultStudent.setNo(RandomString.make(6));
        User mockResultUser = new User();
        mockResultUser.setRole(1);
        mockResultUser.setUsername(mockResultStudent.getNo());
        mockResultUser.setPassword(encoder.encode(RandomString.make(6)));
        mockResultUser.setId(this.random.nextLong());
        studentRepository.save(mockResultStudent);
        userRepository.save(mockResultUser);
        userService.resetPassword(mockResultStudent);
        User result = userRepository.findByUsername(mockResultUser.getUsername());
        String resultPassword = encoder.encode(this.initialPassword);
        Assert.assertEquals(result,resultPassword);
    }
}