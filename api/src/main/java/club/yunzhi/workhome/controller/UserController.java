package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.UserService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@RestController
@RequestMapping("User")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("me")
    @JsonView(MeJsonView.class)
    public User me(@AuthenticationPrincipal Principal user) {
        logger.debug("获取用户名");
        String username = user.getName();

        return this.userService.findByUsername(username);
    }

    @GetMapping("logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        logger.info("用户注销");
        // 获取用户认证信息
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 存在认证信息，注销
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }
    }

    @GetMapping("user")
    @JsonView(GetCurrentLoginUser.class)
    public User getCurrentLoginUser() {
        return this.userService.getCurrentLoginUser();

    }

    public interface MeJsonView {
    }

    public interface GetCurrentLoginUser {
    }
}
