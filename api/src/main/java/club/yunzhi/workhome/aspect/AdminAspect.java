package club.yunzhi.workhome.aspect;
import club.yunzhi.workhome.exception.AccessDeniedException;
import club.yunzhi.workhome.service.WorkService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AdminAspect {

    private static final Logger logger = LoggerFactory.getLogger(AdminAspect.class);

    @Autowired
    WorkService workService;
    @Pointcut(value = "@annotation(club.yunzhi.workhome.annotation.Admin)")
    public void annotationPointCut() {

    }

    @Before("annotationPointCut()")
    public Object doBefore(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getMethod().getName();
        System.out.println("方法名：" + methodName);

        if(!validate()){
           throw new AccessDeniedException("无操作权限");
        }
      return null;
    }

    private boolean validate(){
        System.out.println(this.workService.isTeacher());
      return this.workService.isTeacher();
    }
}
