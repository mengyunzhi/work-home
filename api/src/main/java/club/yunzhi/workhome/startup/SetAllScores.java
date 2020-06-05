package club.yunzhi.workhome.startup;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import club.yunzhi.workhome.service.AttachmentService;
import club.yunzhi.workhome.service.ItemService;
import club.yunzhi.workhome.service.StudentService;
import club.yunzhi.workhome.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 初始化测试账户
 * admin / admin
 */
@Component
public class SetAllScores implements ApplicationListener<ContextRefreshedEvent> {

    private static final Logger logger = LoggerFactory.getLogger(SetAllScores.class);

    final WorkRepository workRepository;
    final StudentService studentService;
    final UserService userService;
    final ItemRepository itemRepository;
    final ItemService itemService;
    final AttachmentService attachmentService;
    final StudentRepository studentRepository;

    public SetAllScores(WorkRepository workRepository, StudentService studentService, UserService userService, ItemRepository itemRepository, AttachmentService attachmentService, StudentRepository studentRepository, ItemService itemService) {
        this.workRepository = workRepository;
        this.studentService = studentService;
        this.userService = userService;
        this.itemRepository = itemRepository;
        this.attachmentService = attachmentService;
        this.studentRepository = studentRepository;
        this.itemService = itemService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        // 获取id 为5的项目（大作业）
        Item item = itemService.findById((long) 5);
        // 如果不是空值，就设置权重为3
        if (item != null) {
            item.setPower(3);
        }
        // 保存项目
        itemRepository.save(item);
        // 创建分页数据
        Pageable pageable = PageRequest.of(0,10000);
        // 取出所有学生
        Page<Student> students = studentService.getAll(pageable);

        for (Student currentStudent : students) {
            //取出此学生的所有作业
            List<Work> currentStudentWorks = this.workRepository.findAllByStudent(currentStudent);
            currentStudent.setTotalScore(0);

            //初始化已评阅作业总数
            int viewed = 0;

            for (Work aWork : currentStudentWorks) {
                if (aWork.getStatus() == 2) {
                    // 已评阅作业数，加权
                    viewed += aWork.getItem().getPower();
                    //总成绩 = 各作业成绩 * 作业的项目的权重
                    currentStudent.setTotalScore( currentStudent.getTotalScore() + aWork.getScore() * aWork.getItem().getPower() );
                    //平均成绩 = 总成绩 / 总权重
                    currentStudent.setAverageScore( currentStudent.getTotalScore() / viewed );
                }
            }

            studentRepository.save(currentStudent);
        }
    }
}
