package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

/**
 * @author  yz
 *
 */
public interface StudentRepository extends CrudRepository<Student, Long> {
    /**
     * 通过用户找学生
     *
     * @param user 用户
     * @return 学生 | null
     */
    Optional<Student> findByUser(User user);
}
