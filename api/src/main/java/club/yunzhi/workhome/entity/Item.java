package club.yunzhi.workhome.entity;

import javax.persistence.Entity;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * 实验项目
 * @author yunzhi
 */
@Entity
public class Item extends AbstractEntity {

	private String name;

	private Timestamp beginTime;

	private Timestamp endTime;

	private String description;

	private List<Attachment> attachments = new ArrayList<>();

	public Item() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Timestamp beginTime) {
		this.beginTime = beginTime;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Attachment> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
}
