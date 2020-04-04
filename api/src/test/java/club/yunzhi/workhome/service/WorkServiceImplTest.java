package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.User;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.StudentRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


class WorkServiceImplTest extends ServiceTest {
    private static final Logger logger = LoggerFactory.getLogger(WorkServiceImplTest.class);

    WorkRepository workRepository;
    UserService userService;
    ItemRepository itemRepository;
    ItemService itemService;
    WorkServiceImpl workService;
    AttachmentService attachmentService;
    StudentService studentService;
    StudentRepository studentRepository;
    ResourceLoader loader;

    @BeforeEach
    public void beforeEach() {
        super.beforeEach();
        this.loader = Mockito.mock(ResourceLoader.class);
        this.itemService = Mockito.mock(ItemService.class);
        this.workRepository = Mockito.mock(WorkRepository.class);
        this.userService = Mockito.mock(UserService.class);
        this.itemRepository = Mockito.mock(ItemRepository.class);
        this.studentService = Mockito.mock(StudentService.class);
        this.studentRepository = Mockito.mock(StudentRepository.class);
        this.workService = Mockito.spy(new WorkServiceImpl(this.workRepository, this.studentService,
                this.userService, this.itemRepository, this.attachmentService, this.studentRepository));
    }

    @Test
    void getByItemIdOfCurrentStudent() {
        Long itemId = this.random.nextLong();
        Optional<Work> workOptional = Optional.of(new Work());
        Mockito.when(this.studentService.getCurrentStudent()).thenReturn(this.currentStudent);
        Mockito.doReturn(workOptional)
                .when(this.workService)
                .getByItemIdAndStudentId(Mockito.eq(itemId),
                        Mockito.eq(this.currentStudent.getId()));

        Assertions.assertEquals(workOptional,
                this.workService.getByItemIdOfCurrentStudent(itemId));
    }

    @Test
    void getByItemIdAndStudentId() {
        Long itemId = this.random.nextLong();
        Long studentId = this.random.nextLong();
        Optional<Work> workOptional = Optional.of(new Work());
        Mockito.when(this.workRepository.findByItemIdAndStudentId(
                Mockito.eq(itemId), Mockito.eq(studentId)
        )).thenReturn(workOptional);

        Assertions.assertEquals(workOptional,
                this.workService.getByItemIdAndStudentId(itemId, studentId));
    }

    @Test
    void saveWorkByItemIdOfCurrentStudent() {
        Long itemId = this.random.nextLong();
        Item item = new Item();
        Mockito.when(this.itemRepository.findById(Mockito.eq(itemId)))
                .thenReturn(Optional.of(item));
        Mockito.when(this.studentService.getCurrentStudent()).thenReturn(this.currentStudent);
        Work work = new Work();
        Mockito.doReturn(work).when(this.workService)
                .save(Mockito.any(Work.class));

        this.workService.saveWorkByItemIdOfCurrentStudent(itemId);

        ArgumentCaptor<Work> workArgumentCaptor = ArgumentCaptor.forClass(Work.class);
        Mockito.verify(this.workService).save(workArgumentCaptor.capture());
        Assertions.assertEquals(item, workArgumentCaptor.getValue().getItem());
        Assertions.assertEquals(currentStudent, workArgumentCaptor.getValue().getStudent());
    }

    @Test
    void save() {
        Work work = new Work();
        this.workService.save(work);
        Mockito.verify(this.workRepository, Mockito.times(1))
                .save(Mockito.eq(work));
    }

    @Test
    public void updateOfCurrentStudent() {
        Long id = this.random.nextLong();
        Work oldWork = new Work();
        oldWork.setStudent(this.currentStudent);
        oldWork.setItem(Mockito.spy(new Item()));

        Mockito.when(this.workRepository.findById(Mockito.eq(id)))
                .thenReturn(Optional.of(oldWork));

        Mockito.when(this.studentService.getCurrentStudent()).thenReturn(currentStudent);

        Mockito.doReturn(true)
                .when(oldWork.getItem())
                .getActive();

        Work work = new Work();
        work.setContent(RandomString.make(10));
        work.setAttachments(Arrays.asList(new Attachment()));

        Work resultWork = new Work();
        Mockito.when(this.workRepository.save(Mockito.eq(oldWork)))
                .thenReturn(resultWork);



        Assertions.assertEquals(resultWork, this.workService.updateOfCurrentStudent(id, work));

        Assertions.assertEquals(oldWork.getContent(), work.getContent());
        Assertions.assertEquals(oldWork.getAttachments(), work.getAttachments());
    }

    @Test
    public void uploadWork() throws IOException {
        logger.debug("定义常量");
        final String NAME = "attachment";
        final String FILE_NAME = "example.jpeg";
        Attachment attachment = AttachmentService.getOneAttachment();
        // 创建mock资源
        MockMultipartFile mockMultipartFile = new MockMultipartFile("test", "hello".getBytes());
        logger.debug("创建模拟文件");
        MultipartFile multipartFile = new MockMultipartFile(NAME, FILE_NAME, "image/jpeg", mockMultipartFile.getInputStream());
        Mockito.doReturn(attachment).when(workService).uploadWork(multipartFile, null, null);

        Assertions.assertEquals(attachment, this.workService.uploadWork(multipartFile, null, null));
    }

    /**
     * 分页查询
     * 1. 模拟输入、输出、调用WorkRepository
     * 2. 调用测试方法
     * 3. 断言输入与输出与模拟值相符
     */
    @Test
    public void getAll() {
        Pageable mockInPageable = PageRequest.of(1, 20);
        List<Work> mockWorks = Arrays.asList(new Work());
        Page<Work> mockOutWrokPage = new PageImpl<Work>(
                mockWorks,
                PageRequest.of(1, 20),
                21);
        Mockito.when(this.workRepository.findAll(Mockito.any(Pageable.class)))
                .thenReturn(mockOutWrokPage);

        Page<Work> workPage = this.workService.getAll(mockInPageable);

        org.assertj.core.api.Assertions.assertThat(workPage).isEqualTo(mockOutWrokPage);
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        Mockito.verify(this.workRepository).findAll(pageableArgumentCaptor.capture());
        org.assertj.core.api.Assertions.assertThat(pageableArgumentCaptor.getValue()).isEqualTo(mockInPageable);
    }

    @Test
    public void updateScore() {
        Long id = this.random.nextLong();

        Work oldWork = new Work();
        oldWork.setScore(0);
        oldWork.setStudent(this.currentStudent);
        oldWork.setItem(Mockito.spy(new Item()));

        Work testWork = new Work();
        testWork.setScore(0);
        testWork.setReviewed(true);
        testWork.setStudent(this.currentStudent);
        testWork.setItem(Mockito.spy(new Item()));

        int score = 100;
        List<Work> works= Arrays.asList(oldWork, testWork);

        Mockito.doReturn(Optional.of(oldWork))
                .when(this.workRepository)
                .findById(Mockito.eq(id));
        Mockito.doReturn(works)
                .when(this.workRepository)
                .findAllByStudent(oldWork.getStudent());
        Mockito.doReturn(true)
                .when(oldWork.getItem())
                .getActive();
        Mockito.doReturn(this.currentStudent)
                .when(this.studentService)
                .findById(oldWork.getStudent().getId());

        Work work = new Work();
        work.setScore(score);
        work.setReviewed(true);

        Work resultWork = new Work();
        Mockito.when(this.workRepository.save(Mockito.eq(oldWork)))
                .thenReturn(resultWork);

        Mockito.doReturn(true).when(workService).isTeacher();
        Assertions.assertEquals(resultWork, this.workService.updateScore(id, score));
        Assertions.assertEquals(oldWork.getScore(), work.getScore());

        Assertions.assertEquals(oldWork.getReviewed(),work.getReviewed());
        Assertions.assertEquals(oldWork.getStudent().getTotalScore(), 100);
        Assertions.assertEquals(oldWork.getStudent().getAverageScore(), 50);
    }

    @Test
    public void findAllSpecs() {
        /* 参数初始化 */
        String name = "hello";
        String sno = "032282";
        Long itemId = 1L;
        Pageable pageable = PageRequest.of(0, 2);
        List<Work> works = Arrays.asList();
        Page<Work> mockStudentPage = new PageImpl<>(works, pageable, 100L);

        /* 设置模拟返回值 */
        Mockito.when(this.workRepository
                .getAll(Mockito.any(Item.class),
                        Mockito.eq(name),
                        Mockito.eq(sno),
                        Mockito.eq(pageable)))
                .thenReturn(mockStudentPage);

        /* 调用测试方法，获取返回值并断言与预期相同 */
        Page<Work> returnStudentPage = this.workService.getAll(itemId, name, sno, pageable);
        Assertions.assertEquals(returnStudentPage, mockStudentPage);

        /* 获取M层调用workRepository的getAll方法时item的参数值，并进行断言 */
        ArgumentCaptor<Item> itemArgumentCaptor = ArgumentCaptor.forClass(Item.class);
        Mockito.verify(this.workRepository).getAll(itemArgumentCaptor.capture(), Mockito.eq(name), Mockito.eq(sno),  Mockito.eq(pageable));
        Assertions.assertEquals(itemArgumentCaptor.getValue().getId(), itemId);

        Mockito.verify(this.workRepository).getAll(itemArgumentCaptor.capture(), Mockito.any(String.class), Mockito.any(String.class),  Mockito.any(Pageable.class));
        Assertions.assertEquals(itemArgumentCaptor.getValue().getId(), itemId);
    }

}