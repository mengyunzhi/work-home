package club.yunzhi.workhome.controller;


import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import org.json.JSONObject;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest extends ControllerTest{
    private String url = "/user";
    private static final Logger logger = LoggerFactory.getLogger(UserControllerTest.class);
    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder encoder;
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
        Long Id = this.random.nextLong();
        JSONObject userJsonObject = new JSONObject();
        userJsonObject.put("id", Id.toString());
        User user = new User();
        user.setId(this.random.nextLong());
        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put(this.url + "/resetPassword",user)
                .contentType("application/json;charset=UTF-8")
                .content(String.valueOf(userJsonObject));
        this.mockMvc.perform(putRequest)
                .andExpect(status().isOk());
    }
}