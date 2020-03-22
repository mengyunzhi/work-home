package club.yunzhi.workhome.transfer;

/**
 * 学生注册信息
 */
public class StudentRegisterInformation {

    /** 学号 */
    private String no;

    /** 姓名 */
    private String name;

    /** 用户名 */
    private String username;

    /** 明文密码 */
    private String password;

    public StudentRegisterInformation() {
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
