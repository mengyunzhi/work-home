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

    private String name;

    private String ext;

    private String sha1;

    private String md5;

    @ManyToOne
    @CreatedBy
    @JsonView(CreateUserJsonView.class)
    private User createUser;

    public Attachment() {
    }

    public Attachment(Long id) {
        this.id = id;
    }

    public String getOriginName() {
        return this.originName;
    }

    public void setOriginName(String originName) {
        this.originName = originName;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExt() {
        return this.ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getSha1() {
        return this.sha1;
    }

    public void setSha1(String sha1) {
        this.sha1 = sha1;
    }

    public String getMd5() {
        return this.md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public User getCreateUser() {
        return this.createUser;
    }

    public void setCreateUser(User createUser) {
        this.createUser = createUser;
    }

    public interface CreateUserJsonView {
    }
}
