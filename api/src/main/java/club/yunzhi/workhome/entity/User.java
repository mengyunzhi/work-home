package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * @author  yz
 */
@Entity
public class User extends AbstractEntity {

	public static final int ROLE_STUDENT = 1;
	public static final boolean ADMIN_TEACHER = true;
    @Column(unique = true, nullable = false)
	private String username;

	@JsonView(PasswordJsonView.class)
	private String password;

	private int role;

	private boolean admin;

	public User() {
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

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public interface PasswordJsonView {}
}
