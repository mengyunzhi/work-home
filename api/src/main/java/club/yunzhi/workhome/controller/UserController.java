package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.annotation.Admin;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.StudentService;
import club.yunzhi.workhome.service.UserService;
import club.yunzhi.workhome.vo.VUser;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

/**
 * @author yz
 */
@RestController
@RequestMapping("User")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;
    private final StudentService studentService;

    public UserController(UserService userService, StudentService studentService) {
        this.userService = userService;
        this.studentService = studentService;
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

    /**
     * 校验密码是否正确
     *
     * @param vUser 带有密码的VUser
     * @return true 正确 false 不正确
     */
    @PostMapping("checkPasswordIsRight")
    public boolean checkPasswordIsRight(@RequestBody VUser vUser) {
        return this.userService.checkPasswordIsRight(vUser);
    }

    /**
     * 修改密码
     *
     * @param vUser 带有新密码和旧密码VUser
     */
    @PutMapping("updatePassword")
    public void updatePassword(@RequestBody VUser vUser) {
        this.userService.updatePassword(vUser);
    }
    @Admin
    @PostMapping("register")
    public void register(@RequestBody Student student) {
        logger.debug("保存");
        studentService.save(student);
    }
    @Admin
    @PutMapping("resetPassword/{id}")
    public void resetPassword(@PathVariable Long id){
        logger.debug("密码重置");
        userService.resetPassword(id);
    }

    public interface MeJsonView {
    }

    public interface GetCurrentLoginUser {
    }
}
