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

    public interface MeJsonView {}
}
