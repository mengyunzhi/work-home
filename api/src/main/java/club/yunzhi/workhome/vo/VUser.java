package club.yunzhi.workhome.vo;

/**
 * user 对应的 vo
 */
public class VUser {
    /**
     * 原密码
     */
    private String password;

    /**
     * 新密码
     */
    private String newPassword;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
