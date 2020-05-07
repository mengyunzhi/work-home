package club.yunzhi.workhome.filter;

import club.yunzhi.workhome.service.StudentService;
import club.yunzhi.workhome.service.WorkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;

@WebFilter
public class PowerFilter extends HttpFilter {
    private final static Logger logger = LoggerFactory.getLogger(PowerFilter.class);

    List<String> powerUrls;
    @Autowired
    WorkService workService;

    @Autowired
    StudentService studentService;
    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        powerUrls.add("work/updateScore");
        powerUrls.add("item");
        powerUrls.add("user/resetPassword");
        powerUrls.add("Student");


        // 获取请求的url
        String url = request.getRequestURI();
        logger.info(url);

//        if (!workService.isTeacher()) {
//            if (url.contains("work/updateScore") || url.contains("/item") || url.contains("user/resetPassword")) {
//                logger.info("已拦截1");
//                throw new AccessDeniedException("无操作权限");
//            }
//
//            if (url.contains("/Student")) {
//                logger.info(request.getParameter("id"));
//                logger.info(studentService.getCurrentStudent().getId().toString());
//                if (request.getParameter("id") != studentService.getCurrentStudent().getId().toString()) {
//                    logger.info("已拦截2");
//                    throw new AccessDeniedException("无操作权限");
//                }
//            }
//        }
        if (!workService.isTeacher()) {
            for (String powerUrl: powerUrls) {
                if (url.contains(powerUrl)) {
                    throw new AccessDeniedException("无操作权限");
                }
            }
        }

        logger.info("在控制器被调用以前执行");

        // 转发数据。spring开始调用控制器中的特定方法
        chain.doFilter(request, response);

        logger.info("在控制器被调用以后执行");
    }

}
