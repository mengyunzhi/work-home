package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author  yz
 */
@Service
public class WorkServiceImpl implements WorkService {
    final
    WorkRepository workRepository;

    final
    StudentService studentService;

    public WorkServiceImpl(WorkRepository workRepository, StudentService studentService) {
        this.workRepository = workRepository;
        this.studentService = studentService;
    }

    @Override
    public List<Work> getAllOfCurrentStudent() {
        Student student = this.studentService.getCurrentStudent();
        return this.workRepository.findAllByStudent(student);
    }
}
