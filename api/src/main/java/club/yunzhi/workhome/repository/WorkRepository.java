package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Work;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * 作业
 * @author  yz
 */
public interface WorkRepository extends CrudRepository<Work, Long> {

    /**
     * 获取学生的所有作业
     * @return 作业
     */
    List<Work> findAllByStudent();
}
