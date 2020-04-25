package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.*;
import club.yunzhi.workhome.exception.AccessDeniedException;
import club.yunzhi.workhome.exception.ObjectNotFoundException;
import club.yunzhi.workhome.exception.ValidationException;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static club.yunzhi.workhome.service.AttachmentService.CONFIG_PATH;
import static club.yunzhi.workhome.service.AttachmentService.checkDir;

/**
 * @author yz
 * 作业
 */
@Service
public class WorkServiceImpl implements WorkService {
    private static final Logger logger = LoggerFactory.getLogger(WorkServiceImpl.class);

    private static final String WORK_PATH = "work/";

    final WorkRepository workRepository;
    final StudentService studentService;
    final UserService userService;
    final ItemRepository itemRepository;
    final AttachmentService attachmentService;
    final StudentRepository studentRepository;

    public WorkServiceImpl(WorkRepository workRepository, StudentService studentService, UserService userService, ItemRepository itemRepository, AttachmentService attachmentService, StudentRepository studentRepository) {
        this.workRepository = workRepository;
        this.studentService = studentService;
        this.userService = userService;
        this.itemRepository = itemRepository;
        this.attachmentService = attachmentService;
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Work> getAllOfCurrentStudent() {
        Student student = this.studentService.getCurrentStudent();
        return this.workRepository.findAllByStudent(student);
    }

    @Override
    public Optional<Work> getByItemIdOfCurrentStudent(Long itemId) {
        Student student = this.studentService.getCurrentStudent();
        return this.getByItemIdAndStudentId(itemId, student.getId());
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
    public Work save(Work work) {
        return this.workRepository.save(work);
    }

    @Override
    public void deleteAttachment(Long workId, Long attachmentId) {
        Work work = this.findById(workId);
        List<Attachment> attachments = work.getAttachments();

        logger.debug("删除关联关系");
        attachments.removeIf(attachment -> attachment.getId().equals(attachmentId));

        work.setAttachments(attachments);
        this.save(work);
    }

    @Override
    public Work findById(Long id) {
        return this.workRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到该作业"));
    }

    @Override
    public Page<Work> getAll(Pageable pageable) {
        return this.workRepository.findAll(pageable);
    }

    @Override
    public Work updateScore(Long id, int score) {
        Work work = this.workRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("未找到ID为" + id + "的作业"));
        if (!this.isTeacher()) {
            throw new AccessDeniedException("无权判定作业");
        }
        work.setScore(score);
        work.setReviewed(true);
        logger.info(String.valueOf(work.getScore()));

        //取出此学生的所有作业
        List<Work> currentStudentWorks = this.workRepository.findAllByStudent(work.getStudent());
        //取出此学生
        Student currentStudent = this.studentService.findById(work.getStudent().getId());
        currentStudent.setTotalScore(0);
        int viewed = 0;

        for (Work awork : currentStudentWorks) {
            if (awork.getReviewed() == true) {
                viewed++;
                //计算总成绩
                currentStudent.setTotalScore(currentStudent.getTotalScore()+awork.getScore());
                //计算平均成绩
                currentStudent.setAverageScore(currentStudent.getTotalScore()/viewed);
            }
        }

        studentRepository.save(currentStudent);
        return this.save(work);
    }

    @Override
    public Page<Work> getAll(Long itemId, String studentName, String studentSno, Boolean reviewed, @NotNull Pageable pageable) {
        Assert.notNull(pageable, "Pageable不能为null");
        Item item = new Item();
        item.setId(itemId);

        return this.workRepository.getAll(item, studentName, studentSno, reviewed, pageable);
    }

    @Override
    public boolean isTeacher() {
        User user = this.userService.getCurrentLoginUser();
        if (user.getRole() == 1) {
            return false;
        }
        return true;
    }

    @Override
    public Work saveWorkByItemIdOfCurrentStudent(@NotNull Long itemId) {
        Item item = this.itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("未找到id为" + itemId + "的实验"));

        Student student = this.studentService.getCurrentStudent();

        Work work = new Work();
        work.setItem(item);
        work.setStudent(student);
        return this.save(work);
    }

    @Override
    public Work updateOfCurrentStudent(Long id, @NotNull Work work) {
        Assert.notNull(work, "更新的作业实体不能为null");
        Work oldWork = this.workRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("未找到ID为" + id + "的作业"));
        if (!oldWork.getStudent().getId().equals(this.studentService.getCurrentStudent().getId())) {
            throw new AccessDeniedException("无权更新其它学生的作业");
        }

        if (!oldWork.getItem().getActive()) {
            throw new ValidationException("禁止提交已关闭的实验作业");
        }

        oldWork.setContent(work.getContent());
        oldWork.setAttachments(work.getAttachments());
        return this.workRepository.save(oldWork);
    }

    @Override
    public Attachment uploadWork(MultipartFile multipartFile, String itemId, String uploadDir) {
        Path saveFilePath = getWorkSavePath(uploadDir, itemId);

        return attachmentService.saveAttachmentCanDuplicate(multipartFile, saveFilePath, true);
    }

    /**
     * 通过扩展名确定存储的目录
     *
     * @param uploadDir 扩展名
     * @param workDir   设置的作业目录
     * @return 存储路径对象
     */
    private Path getWorkSavePath(String uploadDir, String workDir) {
        if (workDir != null && !workDir.isEmpty()) {
            uploadDir = '/' + workDir + uploadDir;
        }
        if (!checkDir(uploadDir)) {
            throw new ValidationException("目录格式不合法");
        }
        Student student = this.studentService.getCurrentStudent();

        return Paths.get
                (CONFIG_PATH + WORK_PATH + student.getNo() + uploadDir);
    }

    /**
     * 得到下一个未评阅的作业
     * @return 作业
     */

    @Override
    public Work getNextNotReviewedWork() {
        return workRepository.findTopByReviewedIsFalse();
    }
}
