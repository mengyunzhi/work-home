package club.yunzhi.workhome.repository.specs;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import org.springframework.data.jpa.domain.Specification;

public class StudentSpecs {


    public static Specification<Student> containingName(String studentName) {
        if (studentName != null) {
            return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("name").as(String.class), String.format("%%%s%%", studentName));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Student> startWithNo(String studentNo) {
        if (studentNo == null) {
            return Specification.where(null);
        }
        return (Specification<Student>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("no").as(String.class), String.format("%s%%", studentNo));
    }
}
