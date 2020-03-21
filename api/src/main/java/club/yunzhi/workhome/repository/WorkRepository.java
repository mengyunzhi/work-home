package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * 作业
 *
 * @author yz
 */
public interface WorkRepository extends CrudRepository<Work, Long> {

    /**
     * 获取学生的所有作业
     *
     * @param student 学生
     * @return 作业
     */
    List<Work> findAllByStudent(Student student);
}
