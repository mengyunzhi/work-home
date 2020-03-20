package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author  yz
 */
@Entity
public class Teacher extends AbstractEntity {

	private String name;

	@ManyToOne
	@JsonView(UserJsonView.class)
	@JoinColumn(nullable = false)
	private User user;

	public Teacher() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public interface UserJsonView {}
}
