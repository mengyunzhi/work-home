package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author  yz
 */
@Service
public class StudentServiceImpl implements StudentService {
    final UserService userService;
    @Autowired
    StudentRepository studentRepository;

    public StudentServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Student getCurrentStudent() {
        User user = this.userService.getCurrentLoginUser();
        return this.studentRepository.findByUser(user).orElseThrow(() -> new Objec)
    }
}
