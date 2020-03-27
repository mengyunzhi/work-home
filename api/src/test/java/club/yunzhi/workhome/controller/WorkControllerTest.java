package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class WorkControllerTest extends ControllerTest {
    private static Logger logger = LoggerFactory.getLogger(WorkControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    private String url = "/work";
    @MockBean
    WorkService workService;

    @Test
    public void getByItemId() throws Exception {
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

    @Test
    public void update() throws Exception {
        Long workId = this.random.nextLong();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", workId.toString());

        Work work = new Work();
        work.setItem(new Item());
        work.getItem().setId(this.random.nextLong());
        work.setId(this.random.nextLong());

        Mockito.doReturn(work).when(this.workService)
                .updateOfCurrentStudent(Mockito.any(Long.class), Mockito.any(Work.class));

        this.mockMvc.perform(MockMvcRequestBuilders
                .put(this.url + "/updateOfCurrentStudent/" + workId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonObject.toString()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(work.getId().toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("item.id").value(work.getItem().getId().toString()))
        ;

        ArgumentCaptor<Work> workArgumentCaptor = ArgumentCaptor.forClass(Work.class);
        Mockito.verify(this.workService).updateOfCurrentStudent(Mockito.eq(workId), workArgumentCaptor.capture());
        Assertions.assertEquals(workId.compareTo(workArgumentCaptor.getValue().getId()), 0);
    }

    @Test
    public void findAllRequestParam() throws Exception {
        String url = "/work/getAll";
        logger.info("只传入page size，不报错");
        this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

    @Test
    public void getById() throws Exception {
        // 准备传入的参数数据
        Long id = new Random().nextLong();

        // 准备服务层替身被调用后的返回数据
        Work work = new Work();
        work.setId(id);
        work.setStudent(new Student());
        work.getStudent().setId(new Random().nextLong());
        work.setItem(new Item());
        work.getItem().setId(new Random().nextLong());

        Mockito.when(this.workService.findById(Mockito.anyLong())).thenReturn(work);

        // 按接口规范，向url以规定的参数发起get请求。
        // 断言请求返回了正常的状态码
        String url = "/work/" + id.toString();
        MvcResult mvcResult = this.mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("id").value(id))
                .andExpect(MockMvcResultMatchers.jsonPath("student.id").value(work.getStudent().getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("student.name").value(work.getStudent().getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("item.id").value(work.getItem().getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("item.name").value(work.getItem().getName()))
                .andReturn();

        // 断言C层进行了数据转发（替身接收的参数值符合预期）
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.workService).findById(longArgumentCaptor.capture());
        org.assertj.core.api.Assertions.assertThat(longArgumentCaptor.getValue()).isEqualTo(id);
    }

    @Test
    public void findAll() throws Exception {
        logger.info("初始化模拟返回数据");
        List<Work> works = new ArrayList<>();
        Item item = new Item();
        item.setId(-2L);
        item.setName("test item name");
        for (long i = 0; i < 2; i++) {
            Work work = new Work();
            work.setId(-i - 1);
            work.setItem(item);
            works.add(work);
        }

        logger.info("初始化分页信息及设置模拟返回数据");
        Page<Work> mockOutWorkPage = new PageImpl<Work>(
                works,
                PageRequest.of(1, 2),
                4
        );

        Mockito.when(this.workService
                .getAll(Mockito.any(Pageable.class)))
                .thenReturn(mockOutWorkPage);

        logger.info("以'每页2条，请求第1页'为参数发起请求，断言返回状态码为200，并接收响应数据");
        String url = "/Work/getAll";
        MvcResult mvcResult = this.mockMvc.perform(
                MockMvcRequestBuilders.get(url)
//                        .param("name", "testName")
//                        .param("sno", "testSno")
//                        .param("itemId", "1")
                        .param("page", "1")
                        .param("size", "2"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("totalPages").value(2))  // 总页数2
                .andExpect(MockMvcResultMatchers.jsonPath("content.size()").value(2))  // 返回了两个作业
                .andReturn();

        LinkedHashMap returnJson = JsonPath.parse(mvcResult.getResponse().getContentAsString()).json();
        JSONArray content = (JSONArray) returnJson.get("content");

        logger.info("测试返回的作业");
        for (int i = 0; i < 2; i++) {
            LinkedHashMap workHashMap = (LinkedHashMap) content.get(i); // 获取第一个作业
//            Assertions.assertThat(workHashMap.get("id")).isEqualTo(-i - 1);
//            Assertions.assertThat(workHashMap.get("name").toString().length()).isEqualTo(4);
//            Assertions.assertThat(workHashMap.get("sno").toString().length()).isEqualTo(6);
            logger.info("测试返回作业所在的实验");
            LinkedHashMap itemHashMap = (LinkedHashMap) workHashMap.get("item");
            Assertions.assertEquals(itemHashMap.get("id"), -2);
            Assertions.assertEquals(itemHashMap.get("name"), "test item name");
        }

        return;
    }

}