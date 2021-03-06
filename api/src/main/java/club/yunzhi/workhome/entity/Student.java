package club.yunzhi.workhome.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

/**
 * 学生
 *
 * @author yunzhi
 */
@Entity
public class Student extends AbstractEntity {
    private String name;
    @Column(nullable = false)
    private String no;

    @OneToOne
    @JoinColumn(nullable = false)
    @JsonView(UserJsonView.class)
    private User user;

    private Integer totalScore;

    private Integer averageScore;

    public Student() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Integer averageScore) {
        this.averageScore = averageScore;
    }

    public interface UserJsonView {
    }
}
