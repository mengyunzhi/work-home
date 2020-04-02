package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Arrays;
import java.util.List;

public class StudentServiceImplTest extends ServiceTest {
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImplTest.class);

    WorkRepository workRepository;
    UserService userService;
    ItemRepository itemRepository;
    ItemService itemService;
    WorkServiceImpl workService;
    StudentRepository studentRepository;
    PasswordEncoder encoder;
    UserRepository userRepository;
    StudentService studentService;
    @Autowired
    private ResourceLoader loader;

    @BeforeEach
    public void beforeEach() {
        super.beforeEach();
        this.workService = Mockito.mock(WorkServiceImpl.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        this.encoder = Mockito.mock(PasswordEncoder.class);
        this.userRepository = Mockito.mock(UserRepository.class);
        this.studentService = Mockito.spy((new StudentServiceImpl(this.studentRepository, 
                this.userRepository, this.encoder, this.userService)));
    }
    /**
     * 分页查询
     * 1. 模拟输入、输出、调用WorkRepository
     * 2. 调用测试方法
     * 3. 断言输入与输出与模拟值相符
     */
    @Test
    public void getAll() {
        Pageable mockInPageable = PageRequest.of(1, 20);
        List<Student> mockStudents = Arrays.asList(new Student());
        Page<Student> mockOutStudentPage = new PageImpl<Student>(
                mockStudents,
                PageRequest.of(1, 20),
                21);
        Mockito.doReturn(mockOutStudentPage).when(this.studentRepository).findAll(Mockito.any(Pageable.class));
        Page<Student> studentPage = this.studentService.getAll(mockInPageable);

        org.assertj.core.api.Assertions.assertThat(studentPage).isEqualTo(mockOutStudentPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.studentRepository).findAll(pageableArgumentCaptor.capture());
        org.assertj.core.api.Assertions.assertThat(pageableArgumentCaptor.getValue()).isEqualTo(mockInPageable);
    }
}
