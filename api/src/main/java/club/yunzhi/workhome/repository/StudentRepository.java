package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.specs.StudentSpecs;
import club.yunzhi.workhome.repository.specs.WorkSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.Optional;

/**
 * @author
 *
 */
public interface StudentRepository extends PagingAndSortingRepository<Student, Long>, JpaSpecificationExecutor {
    /**
     * 通过用户找学生
     *
     * @param user 用户
     * @return 学生 | null
     */
    Optional<Student> findByUser(User user);

    default Page getAll(String studentName, String studentNo, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Student> specification = StudentSpecs.containingName(studentName)
                .and(StudentSpecs.startWithNo(studentNo));
        return this.findAll(specification, pageable);
    }
}
