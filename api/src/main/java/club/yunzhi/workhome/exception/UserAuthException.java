package club.yunzhi.workhome.exception;

/**
 * 用户认证异常
 */
public class UserAuthException extends RuntimeException {

    public UserAuthException(String msg) {
        super(msg);
    }
}
