package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.ResourceUtils;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class WorkControllerTest extends ControllerTest {
    private static final Logger logger = LoggerFactory.getLogger(WorkControllerTest.class);

    private String url = "/work";
    @MockBean
    WorkService workService;
    @Autowired
    private ResourceLoader loader;

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
    void uploadWork() throws Exception {
        logger.debug("定义常量");
        final String NAME = "attachment";
        final String FILE_NAME = "example.jpeg";

        logger.debug("获取资源");
        Resource resource = loader.getResource(ResourceUtils.CLASSPATH_URL_PREFIX + FILE_NAME);

        logger.debug("创建模拟文件");
        MockMultipartFile multipartFile = new MockMultipartFile(NAME, FILE_NAME, "image/jpeg", resource.getInputStream());

        logger.debug("断言请求成功");
        this.mockMvc.perform(multipart(this.url + "/uploadWork")
                .file(multipartFile)
                .param("option1", "")
        ).andExpect(status().isOk());

        logger.debug("断言方法调用成功");
        Mockito.verify(workService).uploadWork(multipartFile, "", null);
    }
}