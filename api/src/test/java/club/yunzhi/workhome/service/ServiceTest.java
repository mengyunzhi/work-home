package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Transactional
@SpringBootTest
public abstract class ServiceTest {
    protected Random random = new Random();
    protected StudentService studentService;
    protected Student currentStudent = new Student();

    @BeforeEach
    public void beforeEach() {
        this.studentService = Mockito.mock(StudentService.class);
        this.currentStudent.setId(this.random.nextLong());
        Mockito.doReturn(currentStudent)
                .when(this.studentService)
                .getCurrentStudent();
    }
}
