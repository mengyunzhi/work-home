package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

class WorkControllerTest extends ControllerTest {
    private String url = "/work";
    @MockBean
    WorkService workService;
    @Test
    void getByItemId() throws Exception {
        Long itemId = this.random.nextLong();

        Work work = new Work();
        work.setItem(new Item());
        work.getItem().setId(itemId);
        work.setId(this.random.nextLong());
        Mockito.doReturn(work).when(this.workService).getOrElseCreateNewByItemIdOfCurrentStudent(Mockito.anyLong());

        this.mockMvc.perform(MockMvcRequestBuilders
                .get(this.url + "/getByItemIdOfCurrentStudent")
        .param("itemId", itemId.toString()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(work.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("item.id").value(itemId))
        ;

        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.workService).getOrElseCreateNewByItemIdOfCurrentStudent(longArgumentCaptor.capture());
        Assertions.assertEquals(longArgumentCaptor.getValue(), itemId);
    }
}