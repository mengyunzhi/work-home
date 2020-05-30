package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * @author panjie
 * 作业
 */
@Entity
public class Work extends AbstractEntity {

	@Column(columnDefinition = "text")
	private String content = "";

	@CreationTimestamp
	private Timestamp createTime;

	@UpdateTimestamp
	private Timestamp updateTime;

	private Integer score = 0;

	private Long lastReviewedUserId = 0L;

	private Short status = 0;
	@ManyToMany
	@JsonView(AttachmentsJsonView.class)
	private List<Attachment> attachments = new ArrayList<>();

	@ManyToOne
	@JsonView(ItemJsonView.class)
	@JoinColumn(nullable = false)
	private Item item;

	@ManyToOne
	@JsonView(StudentJsonView.class)
	@JoinColumn(nullable = false)
	private Student student;

	public Work() {
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public Timestamp getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Timestamp updateTime) {
		this.updateTime = updateTime;
	}

	public List<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}

	public int getScore() {
		return score;
	}

	public void setStatus(Short status) {
		this.status = status;
	}

	public Short getStatus() {
		return status;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public Long getLastReviewedUserId() {
		return lastReviewedUserId;
	}

	public void setLastReviewedUserId(Long lastReviewedUserId) {
		this.lastReviewedUserId = lastReviewedUserId;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public interface AttachmentsJsonView {}
	public interface ItemJsonView {}
	public interface StudentJsonView {}
}
