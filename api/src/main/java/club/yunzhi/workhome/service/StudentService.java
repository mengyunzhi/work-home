package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;

import java.util.List;

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
    List<Student> getAll();

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
     * @param id
     */
    void delete(Long id);
}
