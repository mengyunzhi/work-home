package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.exception.AccessDeniedException;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author yz
 */
@Service
public class WorkServiceImpl implements WorkService {
    final WorkRepository workRepository;
    final StudentService studentService;
    final UserService userService;
    final ItemRepository itemRepository;

    public WorkServiceImpl(WorkRepository workRepository, StudentService studentService, UserService userService, ItemRepository itemRepository) {
        this.workRepository = workRepository;
        this.studentService = studentService;
        this.userService = userService;
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Work> getAllOfCurrentStudent() {
        Optional<Student> student = this.studentService.getCurrentStudent();
        if (student.isPresent()) {
            return this.workRepository.findAllByStudent(student.get());
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public Optional<Work> getByItemIdOfCurrentStudent(Long itemId) {
        Optional<Student> student = this.studentService.getCurrentStudent();
        if (!student.isPresent()) {
            return Optional.empty();
        }

        return this.getByItemIdAndStudentId(itemId, student.get().getId());
    }

    @Override
    public Optional<Work> getByItemIdAndStudentId(@NotNull Long itemId, @NotNull Long studentId) {
        Assert.notNull(itemId, "实验ID不能为null");
        Assert.notNull(studentId, "学生id不能为null");
        return this.workRepository.findByItemIdAndStudentId(itemId, studentId);
    }

    @Override
    public Work getOrElseCreateNewByItemIdOfCurrentStudent(@NotNull Long itemId) {
        Optional<Work> workOptional = this.getByItemIdOfCurrentStudent(itemId);
        if (workOptional.isPresent()) {
            return workOptional.get();
        } else {
            return this.saveWorkByItemIdOfCurrentStudent(itemId);
        }
    }

    @Override
    public Work update(Long id, Work work) {
        return null;
    }

    @Override
    public Work save(Work work) {
        return this.workRepository.save(work);
    }

    @Override
    public Work saveWorkByItemIdOfCurrentStudent(@NotNull Long itemId) {
        Item item = this.itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("未找到id为" + itemId + "的实验"));

        Optional<Student> student = this.studentService.getCurrentStudent();
        if (!student.isPresent()) {
            throw new AccessDeniedException("学生未登录");
        }
        Work work = new Work();
        work.setItem(item);
        work.setStudent(student.get());
        return this.save(work);
    }

}
