package club.yunzhi.workhome.exception;

/**
 * Description: 格式不符异常
 * @Author: liyiheng
 */
public class FormatInconsistencyException extends RuntimeException {
    private static final long serialVersionUID = -7859961453042018247L;

    public FormatInconsistencyException(String message) {
        super(message);
    }
}
