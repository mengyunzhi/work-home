package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface StudentService {

    /**
     * 保存学生
     * @param student
     * @return
     */
    Student save(Student student);

    /**
     * 获取所有学会
     * @return
     */
    Page<Student> getAll(@NotNull Pageable pageable);

    /**
     * 综合查询
     * @param studentName 学生姓名
     * @param studentSno 学生学号
     * @param pageable
     * @return
     */
    Page<Student> getAll(String studentName, String studentSno, @NotNull Pageable pageable);

    /**
     * 根据id获取学生
     * @param id
     * @return
     */
    Student findById(Long id);

    /**
     * 更新学生
     * @param id
     * @param student
     */
    void update(Long id, Student student);

    /**
     * 删除学生
     * @param id 学生ID
     */
    void delete(Long id);

    /**
     * 获取当前登录的学生
     * @return 学生 | null
     */
    Student getCurrentStudent();
}
