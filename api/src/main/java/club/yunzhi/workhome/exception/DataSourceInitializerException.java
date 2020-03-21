package club.yunzhi.workhome.exception;

/**
 * 数据库初始化异常
 */
public class DataSourceInitializerException extends RuntimeException{
    final static String MESSAGE = "数据库初始化错误";
    public DataSourceInitializerException(String message) {
        super(MESSAGE + message);
    }

    public DataSourceInitializerException(String message, Class cl) {
        super(MESSAGE + message + ", 出错位置:" + cl.getName());
    }
}
