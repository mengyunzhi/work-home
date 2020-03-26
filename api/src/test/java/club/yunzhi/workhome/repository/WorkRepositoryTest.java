package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.ItemService;
import club.yunzhi.workhome.service.StudentService;
import club.yunzhi.workhome.service.WorkService;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@RunWith(SpringRunner.class)
class WorkRepositoryTest {

    @Autowired
    WorkRepository workRepository;

    @Autowired
    StudentService studentService;

    @Autowired
    ItemService itemService;

    @Autowired
    WorkService workService;

    @Test
    void findAllByStudent() {
    }

    @Test
    void findByItemIdAndStudentId() {

        Optional<Work> workOptional = Optional.of(new Work());
        Item item = new Item();
        Timestamp time1 = Timestamp.valueOf("2020-02-25 8:00:00");
        Timestamp time2 = Timestamp.valueOf("2020-02-26 8:00:00");
        item.setBeginTime(time1);
        item.setEndTime(time2);
        Student student = new Student();
        student.setNo(RandomString.make(6));
        student.setUser(new User());
        student.getUser().setPassword(RandomString.make(6));
        Work work = new Work();
        work.setItem(item);
        work.setStudent(student);
        work.setAttachments(workOptional.get().getAttachments());
        this.studentService.save(student);
        this.itemService.save(item);
        this.workService.save(work);

        Optional<Work> work1 = this.workRepository.findByItemIdAndStudentId(work.getItem().getId(), work.getStudent().getId());
        Assertions.assertEquals(work.getId(),
                work1.get().getId());
    }
}