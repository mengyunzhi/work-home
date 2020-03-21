package club.yunzhi.workhome.exception;

/**
 * @author panjie on 2018/1/16
 * 较验错误
 */
public class ValidationException extends javax.validation.ValidationException {
    private static final long serialVersionUID = -4745231334267846879L;

    public ValidationException(String message) {
        super(message);
    }
}
