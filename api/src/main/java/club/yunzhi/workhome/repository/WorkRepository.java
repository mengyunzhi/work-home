package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

/**
 * 作业
 *
 * @author yz
 */
public interface WorkRepository extends PagingAndSortingRepository<Work, Long>, JpaSpecificationExecutor {

    /**
     * 获取学生的所有作业
     *
     * @param student 学生
     * @return 作业
     */
    List<Work> findAllByStudent(Student student);

    /**
     * 获取作业
     * @param itemId 实验ID
     * @param studentId 学生ID
     * @return 作业
     */
    Optional<Work> findByItemIdAndStudentId(Long itemId, Long studentId);
}
