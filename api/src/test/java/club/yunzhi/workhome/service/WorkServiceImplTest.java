package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private ResourceLoader loader;

    @BeforeEach
    public void beforeEach() {
        super.beforeEach();
        this.itemService = Mockito.mock(ItemService.class);
        this.workRepository = Mockito.mock(WorkRepository.class);
        this.userService = Mockito.mock(UserService.class);
        this.itemRepository = Mockito.mock(ItemRepository.class);
        this.workService = Mockito.spy(new WorkServiceImpl(this.workRepository, this.studentService,
                this.userService, this.itemRepository, this.attachmentService));
    }

    @Test
    void getByItemIdOfCurrentStudent() {
        Long itemId = this.random.nextLong();
        Optional<Work> workOptional = Optional.of(new Work());
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

        logger.debug("获取资源");
        Resource resource = loader.getResource(ResourceUtils.CLASSPATH_URL_PREFIX + FILE_NAME);

        logger.debug("创建模拟文件");
        MultipartFile multipartFile = new MockMultipartFile(NAME, FILE_NAME, "image/jpeg", resource.getInputStream());
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
        oldWork.setStudent(this.currentStudent);
        oldWork.setItem(Mockito.spy(new Item()));
        int score = 100;

        Mockito.when(this.workRepository.findById(Mockito.eq(id)))
                .thenReturn(Optional.of(oldWork));

        Mockito.doReturn(true)
                .when(oldWork.getItem())
                .getActive();

        Work work = new Work();
        work.setScore(score);


        Work resultWork = new Work();
        Mockito.when(this.workRepository.save(Mockito.eq(oldWork)))
                .thenReturn(resultWork);

        Assertions.assertEquals(resultWork, this.workService.updateScore(id, score));
        Assertions.assertEquals(oldWork.getScore(), work.getScore());

    }

}