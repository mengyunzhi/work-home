package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

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
    }

    @Test
    void save() {
        Work work = new Work();
        this.workService.save(work);
        Mockito.verify(this.workRepository, Mockito.times(1))
                .save(Mockito.eq(work));
    }
}