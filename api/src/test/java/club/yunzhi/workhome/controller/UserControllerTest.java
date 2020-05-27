package club.yunzhi.workhome.controller;


import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.WorkService;
import net.bytebuddy.utility.RandomString;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class UserControllerTest extends ControllerTest{
    private static final Logger logger = LoggerFactory.getLogger(UserControllerTest.class);

    @MockBean
    WorkService workService;

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
        Mockito.when(workService.isTeacher()).thenReturn(true);
        Long id = this.random.nextLong();
        JSONObject JsonObject = new JSONObject();
        JsonObject.put("id", id.toString());
        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders.put( "/user/resetPassword/{id}",id)
                .contentType("application/json;charset=UTF-8")
                .content(String.valueOf(JsonObject));
        this.mockMvc.perform(putRequest)
                .andExpect(status().isOk());
    }
}