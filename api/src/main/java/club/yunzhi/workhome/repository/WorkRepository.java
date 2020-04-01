package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.specs.WorkSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
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

    default Page getAll(Item item,  String studentName, String studentSno, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "传入的Pageable不能为null");
        Specification<Work> specification = WorkSpecs.containingName(studentName)
                .and(WorkSpecs.startWithNo(studentSno))
                .and(WorkSpecs.belongToItem(item));
        return this.findAll(specification, pageable);
    }
}
