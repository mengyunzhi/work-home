package club.yunzhi.workhome.exceptionHandler;

import club.yunzhi.workhome.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @author panjie on 2018/1/16
 * 全局异常处理
 */
@RestController // 以rest形式返回异常信息
@ControllerAdvice   // 全局异常处理器
public class GlobalExceptionHandler {
    private final static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class.getName());

    @ExceptionHandler(value = {AssociateDeleteException.class})
    public ResponseEntity<JsonErrorResult> associateDeleteExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("关联删除异常：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, "数据完整性异常：" + exception.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = {FormatInconsistencyException.class})
    public ResponseEntity<JsonErrorResult> formatInconsistencyExceptionHandler(final HttpServletRequest httpServletRequest, final FormatInconsistencyException exception) {
        logger.error("格式异常：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, "输入的参数不符合规则：" + exception.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {ValidationException.class})
    public ResponseEntity<JsonErrorResult> yunzhiValidationExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("发生校验错误：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = {javax.validation.ValidationException.class})
    public ResponseEntity<JsonErrorResult> validationExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("实体较验发生错误 Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(value = NullPointerException.class)
    public ResponseEntity<JsonErrorResult> nullPointerExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("空指针异常 Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        exception.printStackTrace();
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<JsonErrorResult> definedAccessDeniedExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("权限验证发生错误：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.FORBIDDEN);

    }

    @ExceptionHandler(value = ObjectNotFoundException.class)
    public ResponseEntity<JsonErrorResult> objectNotFoundExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("未找到传入的实体：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.NOT_FOUND);
    }

    /**
     * 手动捕获数据冲突异常，经测试，该异常系由Spring抛出，但未捕获
     *
     * @return HttpStatus.CONFLICT
     * 冲突错误，409
     * 参考：
     * https://stackoverflow.com/questions/37248719/couldnt-catch-dataintegrityviolationexception-with-spring-data-rest
     */
    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public ResponseEntity<JsonErrorResult> dataIntegrityViolationException(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("数据完整性冲突：Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, "您刚刚发起的操作将引发其它关联数据异常，已被系统禁止。"), HttpStatus.CONFLICT);
    }

    /**
     * 调用间隔非法异常
     * 用于：调用间隔过短，或是调用间隔过长，均适用本异常处理器
     *
     * @return HttpStatus.LOCKED
     * 已锁定 423
     */
    @ExceptionHandler(value = CallingIntervalIllegalException.class)
    public ResponseEntity<JsonErrorResult> CallingIntervalIllegalException(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.warn("调用同一方法的间隔过短:Host {} invokes url {} Error: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.LOCKED);
    }

    /**
     * 接收到了非法的参数
     * 用于：Assert判断
     *
     * @return HttpStatus.INTERNAL_SERVER_ERROR
     * 服务器较验异常 500
     */
    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<JsonErrorResult> IllegalArgumentExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("参数校验发生异常: Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, exception), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = org.springframework.transaction.TransactionSystemException.class)
    public ResponseEntity<JsonErrorResult> TransactionSystemExceptionHandler(final HttpServletRequest httpServletRequest, final Exception exception) {
        logger.error("操作数据库发生异常: Host {} invokes url {} ERROR: {}", httpServletRequest.getRemoteHost(), httpServletRequest.getRequestURL(), exception.getMessage());
        return new ResponseEntity<>(new JsonErrorResult(httpServletRequest, "在操作数据的过程中发生异常：" + exception + "。请确认数据的完整性及合法性"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
