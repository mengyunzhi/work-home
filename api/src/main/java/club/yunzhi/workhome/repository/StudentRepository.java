package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
