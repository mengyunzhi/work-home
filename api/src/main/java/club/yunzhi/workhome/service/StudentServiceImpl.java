package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.exception.ObjectNotFoundException;
import club.yunzhi.workhome.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

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
    public Optional<Student> getCurrentStudent() {
        User user = this.userService.getCurrentLoginUser();
        return this.studentRepository.findByUser(user);
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
        student.getUser().setRole(1);
        student.getUser().setPassword(encoder.encode(student.getUser().getPassword()));
        userRepository.save(student.getUser());
        return this.studentRepository.save(student);
    }

    @Override
    public List<Student> getAll() {
        return (List<Student>) studentRepository.findAll();
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