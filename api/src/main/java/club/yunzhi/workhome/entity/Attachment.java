package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

/**
 * 附件实体
 * @author yz
 */
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Attachment extends AbstractEntity {

    private String originName;

    private String path;


    private String ext;

    private String sha1;

    private String md5;

    @ManyToOne
    @CreatedBy
    @JsonView(CreateUserJsonView.class)
    private User createUser;

    private String size;

    private Long createTime;

    private Long updateTime;

    private String savePath;

    private String saveName;

    private String MIME;

    public Attachment() {
    }

    public Attachment(User createUser, String sha1, String md5, String ext, String size, Long createTime, Long updateTime, String name, String savePath, String saveName, String MIME) {
        this.createUser = createUser;
        this.sha1 = sha1;
        this.md5 = md5;
        this.ext = ext;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.savePath = savePath;
        this.saveName = saveName;
        this.MIME = MIME;
    }

    public String getSha1() {
        return sha1;
    }

    public void setSha1(String sha1) {
        this.sha1 = sha1;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public String getSavePath() {
        return savePath;
    }

    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }

    public String getSaveName() {
        return saveName;
    }

    public void setSaveName(String saveName) {
        this.saveName = saveName;
    }

    public String getMIME() {
        return MIME;
    }

    public void setMIME(String MIME) {
        this.MIME = MIME;
    }

    public String getOriginName() {
        return originName;
    }

    public void setOriginName(String originName) {
        this.originName = originName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public User getCreateUser() {
        return createUser;
    }

    public void setCreateUser(User createUser) {
        this.createUser = createUser;
    }

    @Override
    public String toString() {
        return "Attachment{" +
                "id=" + id +
                ", operator=" + createUser +
                ", sha1='" + sha1 + '\'' +
                ", md5='" + md5 + '\'' +
                ", ext='" + ext + '\'' +
                ", size='" + size + '\'' +
                ", createTime=" + createTime +
                ", lastModifiedTime=" + updateTime +
                ", savePath='" + savePath + '\'' +
                ", saveName='" + saveName + '\'' +
                ", MIME='" + MIME + '\'' +
                '}';
    }

    public interface CreateUserJsonView {
    }
}
