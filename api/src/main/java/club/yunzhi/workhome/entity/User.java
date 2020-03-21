package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * @author  yz
 */
@Entity
public class User extends AbstractEntity {

	@Column(unique = true, nullable = false)
	private String username;

	@JsonView(PasswordJsonView.class)
	private String password;

	private int role;

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

	public interface PasswordJsonView {}
}
