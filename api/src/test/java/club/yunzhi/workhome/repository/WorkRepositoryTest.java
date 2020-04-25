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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findAllByStudent() {
    }

    @Test
    @Transactional
    void findByItemIdAndStudentId() {

        Optional<Work> workOptional = Optional.of(new Work());
        Item item = new Item();

        Student student = new Student();
        student.setNo(RandomString.make(6));
        student.setUser(new User());
        student.getUser().setPassword(RandomString.make(6));
        Work work = new Work();
        work.setItem(item);

        work.setAttachments(workOptional.get().getAttachments());
        work.setStudent(this.studentService.save(student));
        this.itemRepository.save(item);
        this.workRepository.save(work);

        Optional<Work> work1 = this.workRepository.findByItemIdAndStudentId(work.getItem().getId(), work.getStudent().getId());
        Assertions.assertEquals(work.getId(),
                work1.get().getId());
    }

    @Test
    @Transactional
    public void findAll() {
        /* 初始化2个班级并持久化*/
        Item item = new Item();
        this.itemRepository.save(item);

        Item item1 = new Item();
        this.itemRepository.save(item1);

        Student student = new Student();
        student.setName("testStudentName");
        student.setNo("032282");
        User user = new User();
        user.setUsername(RandomString.make(6));
        this.userRepository.save(user);
        student.setUser(user);
        this.studentRepository.save(student);

        /* 初始化2个不同班级的学生并持久化 */
        Student student1 = new Student();
        student1.setName("testStudentName1");
        student1.setNo("032291");
        User user1 = new User();
        user1.setUsername(RandomString.make(6));
        this.userRepository.save(user1);
        student1.setUser(user);
        this.studentRepository.save(student1);

        Work work = new Work();
        work.setItem(item);
        work.setStudent(student);
        work.setReviewed(true);
        this.workRepository.save(work);

        Work work1 = new Work();
        work1.setItem(item1);
        work1.setStudent(student1);
        work1.setReviewed(false);
        this.workRepository.save(work1);

        Page workPage = this.workRepository.getAll(item,"testStudentName", "032282", null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                1);

        workPage = this.workRepository.getAll(item,"testStudentName12", "032282", null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                0);

        workPage = this.workRepository.getAll(item,"testStudentName", "0322821", null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                0);

        workPage = this.workRepository.getAll( item1,"testStudentName", "032282", null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                0);

        workPage = this.workRepository.getAll(item,null, "032282", null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                1);

        workPage = this.workRepository.getAll(null, null, null, null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                2);

        workPage = this.workRepository.getAll(new Item(),null, null, null, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                2);

        workPage = this.workRepository.getAll(new Item(),null, null, true, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                1);

        workPage = this.workRepository.getAll(new Item(),null, null, false, PageRequest.of(0, 2));
        Assertions.assertEquals(workPage.getTotalElements(),
                1);
    }
}