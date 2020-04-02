package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.service.ItemService;
import club.yunzhi.workhome.service.StudentService;
import club.yunzhi.workhome.service.WorkService;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@RunWith(SpringRunner.class)
public class StudentRepositoryTest {

    @Autowired
    WorkRepository workRepository;

    @Autowired
    StudentService studentService;

    @Autowired
    ItemService itemService;

    @Autowired
    WorkService workService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    public void findAll() {
        Student student = new Student();
        student.setName("testStudentName");
        student.setNo("032282");
        User user = new User();
        user.setUsername(RandomString.make(6));
        this.userRepository.save(user);
        student.setUser(user);
        this.studentRepository.save(student);
        
        Student student1 = new Student();
        student1.setName("testStudentName1");
        student1.setNo("032291");
        User user1 = new User();
        user1.setUsername(RandomString.make(6));
        this.userRepository.save(user1);
        student1.setUser(user);
        this.studentRepository.save(student1);

        Page studentPage = this.studentRepository.getAll("testStudentName", "032282",  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                1);

        studentPage = this.studentRepository.getAll("testStudentName12", "032282",  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                0);

        studentPage = this.studentRepository.getAll("testStudentName", "0322821",  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                0);

        studentPage = this.studentRepository.getAll( "testStudentName1", "032282",  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                0);

        studentPage = this.studentRepository.getAll(null, "032282",  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                1);

        studentPage = this.studentRepository.getAll(null, null, PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                2);

        studentPage = this.studentRepository.getAll(null,null,  PageRequest.of(0, 2));
        Assertions.assertEquals(studentPage.getTotalElements(),
                2);
    }
}
