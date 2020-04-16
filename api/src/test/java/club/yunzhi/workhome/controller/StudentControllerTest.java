package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.StudentService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.json.JSONObject;

import org.junit.jupiter.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class StudentControllerTest extends ControllerTest {
    private static Logger logger = LoggerFactory.getLogger(StudentControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    private String url = "/student";
    @MockBean
    StudentService studentService;
    @Autowired
    private ResourceLoader loader;

    @Test
    public void findAll() throws Exception {
        logger.info("初始化模拟返回数据");
        List<Student> students = new ArrayList<>();
        User user = new User();
        user.setId(-2L);
        user.setUsername("test user name");
        for (long i = 0; i < 2; i++) {
            Student student = new Student();
            student.setId(-i - 1);
            student.setUser(user);
            students.add(student);
        }

        logger.info("初始化分页信息及设置模拟返回数据");
        Page<Student> mockOutStudentPage = new PageImpl<Student>(
                students,
                PageRequest.of(1, 2),
                4
        );

        Mockito.when(this.studentService
                .getAll(Mockito.anyString(),
                        Mockito.anyString(),
                        Mockito.any(Pageable.class)))
                .thenReturn(mockOutStudentPage);

        logger.info("以'每页2条，请求第1页'为参数发起请求，断言返回状态码为200，并接收响应数据");
        String url = "/student/getAll";
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("userId", "1")
                        .param("studentName", "testName")
                        .param("studentNo", "testSno")
                        .param("page", "1")
                        .param("size", "2"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("totalPages").value(2))  // 总页数2
                .andExpect(MockMvcResultMatchers.jsonPath("content.size()").value(2))  // 返回了两个作业
                .andReturn();

        LinkedHashMap returnJson = JsonPath.parse(mvcResult.getResponse().getContentAsString()).json();
        JSONArray content = (JSONArray) returnJson.get("content");

        logger.info("测试返回的作业");
        for (int i = 0; i < 2; i++) {
            LinkedHashMap studentHashMap = (LinkedHashMap) content.get(i); // 获取第一个作业
            Assertions.assertEquals(studentHashMap.get("id"), -i-1);
            logger.info("测试返回作业所在的实验");
            LinkedHashMap userHashMap = (LinkedHashMap) studentHashMap.get("user");
            Assertions.assertEquals(userHashMap.get("id"), -2);
            Assertions.assertEquals(userHashMap.get("username"), "test user name");
        }

    }
    @Test
    public void getCurrentStudent() throws Exception {
        MockHttpServletRequestBuilder getRequest = MockMvcRequestBuilders.get( "/Student/getCurrentStudent");
        this.mockMvc.perform(getRequest)
                .andExpect(status().isOk());
    }
}
