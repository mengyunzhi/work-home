package club.yunzhi.workhome.repository.specs;

import club.yunzhi.workhome.controller.ItemController;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import club.yunzhi.workhome.service.ItemService;
import club.yunzhi.workhome.service.ItemServiceImpl;
import club.yunzhi.workhome.service.StudentService;
import org.assertj.core.api.Assertions;
import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class WorkSpecsTest {
    private static final Logger logger = LoggerFactory.getLogger(WorkSpecsTest.class);

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private WorkRepository workRepository;

    private Work work;

    @Autowired
    private StudentRepository studentRepository;

    @Before
    public void before() {
        logger.info("初始化测试数据");
        Item item = new Item();

        Student student = new Student();
        student.setNo("032282");
        student.setName("testName");
        student.setUser(new User());
        student.getUser().setPassword(RandomString.make(6));

        this.work = new Work();
        this.itemRepository.save(item);
        this.work.setItem(item);
        this.work.setStudent(this.studentRepository.save(student));
        this.workRepository.save(this.work);
    }

    @Test
    @Transactional
    public void belongToItem() {
        Item item = this.work.getItem();

        logger.info("以item进行综合查询，断言条数为1");
        List works = this.workRepository.findAll(WorkSpecs.belongToItem(item));
        Assertions.assertThat(works.size()).isEqualTo(1);

//        logger.info("将item的ID设置为-1，断言查询的条数为0。预测：jpa是根据关联实体的ID值进行查询的");
//        item.setId(-1L);
//        works = this.workRepository.findAll(WorkSpecs.belongToItem(item));
//        Assertions.assertThat(works.size()).isEqualTo(0);
    }

    @Test
    @Transactional
    public void containingName() {
        List works = this.workRepository.findAll(WorkSpecs.containingName("testName"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.containingName("tes"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.containingName("stNa"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.containingName("tName"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.containingName("testName12"));
        Assertions.assertThat(works.size()).isEqualTo(0);

    }

    @Test
    @Transactional
    public void startWithSno() {
        List works = this.workRepository.findAll(WorkSpecs.startWithNo("032282"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.startWithNo("032"));
        Assertions.assertThat(works.size()).isEqualTo(1);

        works = this.workRepository.findAll(WorkSpecs.startWithNo("3228"));
        Assertions.assertThat(works.size()).isEqualTo(0);

    }
}