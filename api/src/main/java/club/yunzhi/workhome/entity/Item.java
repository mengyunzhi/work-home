package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.mengyunzhi.core.entity.YunzhiEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * 实验项目
 *
 * @author yunzhi
 */
@Entity
public class Item extends AbstractEntity implements YunzhiEntity {

    private String name;

    private Timestamp beginTime;

    private Timestamp endTime;

    private String description;

    /**
     * 是否是最终实验
     */
    private Boolean isFinalExperiment = false;

    @ManyToMany
    @JsonView(AttachmentsJsonView.class)
    private List<Attachment> attachments = new ArrayList<>();

    public Item() {
    }

    public Item(Timestamp beginTime, Timestamp endTime) {
        this.beginTime = beginTime;
        this.endTime = endTime;
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

    public Boolean getActive() {
        long current = System.currentTimeMillis();
        if (this.beginTime != null && this.endTime != null) {
            if (current > this.beginTime.getTime() && current < this.endTime.getTime()) {
                return true;
            }
        }
        return false;
    }

    public Boolean getFinalExperiment() {
        return isFinalExperiment;
    }

    public void setFinalExperiment(Boolean finalExperiment) {
        isFinalExperiment = finalExperiment;
    }

    public interface AttachmentsJsonView {
    }
}
