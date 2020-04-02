package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.exception.AccessDeniedException;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author  yz
 * 学生
 */
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserService userService;

    public StudentServiceImpl(StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder encoder, UserService userService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.userService = userService;
    }

    @Override
    public Student getCurrentStudent() {
        User user = this.userService.getCurrentLoginUser();
        return this.studentRepository.findByUser(user)
                .orElseThrow(() -> new AccessDeniedException("未找到登录用户对应的学生信息"));
    }

    @Override
    public Student save(Student student) {
        Assert.notNull(student, "学生信息不能为空");
        Assert.notNull(student.getNo(), "学生学号不能为空");
        Assert.notNull(student.getUser(), "对应用户不能为空");
        Assert.notNull(student.getUser().getPassword(), "对应密码不能为空");
        if (student.getUser().getUsername() == null) {
            student.getUser().setUsername(student.getNo());
        }
        Student newStudent = new Student();
        newStudent.setNo(student.getNo());
        newStudent.setName(student.getName());
        newStudent.setUser(new User());
        newStudent.getUser().setRole(User.ROLE_STUDENT);
        newStudent.getUser().setPassword(encoder.encode(student.getUser().getPassword()));
        newStudent.getUser().setUsername(student.getUser().getUsername());
        userRepository.save(newStudent.getUser());
        return this.studentRepository.save(newStudent);
    }

    @Override
    public Page<Student> getAll(@NotNull Pageable pageable) {
        return (Page<Student>) studentRepository.findAll(pageable);
    }

    @Override
    public Page<Student> getAll(String studentName, String studentSno, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "Pageable不能为null");
        return this.studentRepository.getAll(studentName, studentSno, pageable);
    }

    @Override
    public Student findById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到相关学生"));
    }

    @Override
    public void update(Long id, Student student) {
        Student student1 = findById(id);
        student1.setName(student.getName());
        studentRepository.save(student1);
    }

    @Override
    public void delete(Long id) {
        Student student = findById(id);
        // 删除学生
        studentRepository.deleteById(student.getId());
        userRepository.deleteById(student.getUser().getId());
    }
}