package club.yunzhi.workhome.service;

import club.yunzhi.workhome.repository.ItemRepository;
import club.yunzhi.workhome.repository.WorkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


class WorkServiceImplTest {
    WorkRepository workRepository;
    StudentService studentService;
    UserService userService;
    ItemRepository itemRepository;

    WorkServiceImpl workService;

    @BeforeEach
    public void beforeEach() {
        this.workRepository = Mockito.mock(WorkRepository.class);
        this.studentService = Mockito.mock(StudentService.class);
        this.userService = Mockito.mock(UserService.class);
        this.itemRepository = Mockito.mock(ItemRepository.class);
        this.workService = Mockito.spy(new WorkServiceImpl(this.workRepository, this.studentService,
                this.userService, this.itemRepository));
    }

    @Test
    void getByItemIdOfCurrentStudent() {
    }

    @Test
    void getByItemIdAndStudentId() {

    }

    @Test
    void saveWorkByItemIdOfCurrentStudent() {
    }

    @Test
    void save() {
    }
}