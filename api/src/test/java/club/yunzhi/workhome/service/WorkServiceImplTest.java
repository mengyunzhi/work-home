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

import java.util.Arrays;
import java.util.Optional;


class WorkServiceImplTest extends ServiceTest {
    WorkRepository workRepository;
    UserService userService;
    ItemRepository itemRepository;

    WorkServiceImpl workService;

    @BeforeEach
    public void beforeEach() {
        super.beforeEach();
        this.workRepository = Mockito.mock(WorkRepository.class);
        this.userService = Mockito.mock(UserService.class);
        this.itemRepository = Mockito.mock(ItemRepository.class);
        this.workService = Mockito.spy(new WorkServiceImpl(this.workRepository, this.studentService,
                this.userService, this.itemRepository));
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
        oldWork.setItem(new Item());

        Mockito.when(this.workRepository.findById(Mockito.eq(id)))
                .thenReturn(Optional.of(oldWork));

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
}