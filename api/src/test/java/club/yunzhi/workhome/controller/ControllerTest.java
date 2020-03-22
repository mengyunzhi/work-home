package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Random;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "username")
public abstract class ControllerTest {
    @MockBean
    protected UserService userService;

    protected User currentUser;
    protected Random random = new Random();

    @Autowired
    protected MockMvc mockMvc;

    @BeforeEach
    public void beforeEach() {
        Mockito.doReturn(this.currentUser)
                .when(this.userService)
                .getCurrentLoginUser();
    }
}
