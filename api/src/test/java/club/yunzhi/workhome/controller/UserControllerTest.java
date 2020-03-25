package club.yunzhi.workhome.controller;


import ch.qos.logback.classic.Level;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import club.yunzhi.workhome.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Random;


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class UserControllerTest extends ControllerTest{
    private String url = "/user";
    @Autowired
    MockMvc mockMvc;

    @MockBean
    StudentRepository studentRepository;

    @MockBean
    UserRepository userRepository;

    public UserControllerTest() {
    }


    /**
     * 重置密码测试
     * 1.新建一个学生
     * 2.拼接请求的json串
     * 3.模拟请求并断言返回了201
     * 断言密码重置成功
     * @throws Exception
     */
    @Test
     public void resetPassword() throws Exception {
        // 准备替身及调用替身后的模拟返回值
        // 第一个替身（间谍）
        Long id = this.random.nextLong();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id",id.toString());
        Student student = new Student();
        student.setId(this.random.nextLong());
        student.setUser(new User());
        student.getUser().setId(this.random.nextLong());
        String url = "/user/resetPassword";
        this.mockMvc.perform(MockMvcRequestBuilders
                .put(this.url + "/resetPassword" ,student)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonObject.toString()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}