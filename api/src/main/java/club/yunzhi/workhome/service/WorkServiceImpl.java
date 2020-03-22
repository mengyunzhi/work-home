package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.WorkRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

/**
 * @author yz
 */
@Service
public class WorkServiceImpl implements WorkService {
    final WorkRepository workRepository;
    final StudentService studentService;
    final UserService userService;

    public WorkServiceImpl(WorkRepository workRepository, StudentService studentService, UserService userService) {
        this.workRepository = workRepository;
        this.studentService = studentService;
        this.userService = userService;
    }

    @Override
    public List<Work> getAllOfCurrentStudent() {
        Student student = this.studentService.getCurrentStudent();
        return this.workRepository.findAllByStudent(student);
    }

    @Override
    public Work update(Long id, Work work) {
        Work oldWork = this.findById(id);
        oldWork.setAttachments(work.getAttachments());
        oldWork.setContent(work.getContent());
        return this.workRepository.save(oldWork);
    }

    @Override
    public void deleteAttachment(Long workId, Long attachmentId) {
        Work work = this.findById(workId);
        work.getAttachments().removeIf(attachment -> attachment.getId().equals(attachmentId));
        this.workRepository.save(work);
    }

    @Override
    public Work findById(Long id) {
        return this.workRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到该作业"));
    }

}
