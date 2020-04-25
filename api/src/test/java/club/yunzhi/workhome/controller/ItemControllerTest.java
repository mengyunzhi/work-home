package club.yunzhi.workhome.controller;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.service.ItemService;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ItemControllerTest extends ControllerTest{
    private static final Logger logger = LoggerFactory.getLogger(ItemControllerTest.class);;
    @MockBean
    ItemService itemService;

    ItemControllerTest() throws Exception {
    }

    @Test
    void getAll() throws Exception {
        logger.info("初始化模拟返回数据");
        List<Item> items = new ArrayList<>();
        Item item = new Item();
        item.setId(-2L);
        item.setName("test item name");
        for (long i = 0; i < 2; i++) {
         items.add(item);
        }
        Mockito.when(this.itemService
                .findAll())
                .thenReturn(items);

        JSONObject itemJsonObject = new JSONObject();
       itemJsonObject.put("items", items);
        MockHttpServletRequestBuilder getRequest = MockMvcRequestBuilders.get( "/item/all")
                .content(itemJsonObject.toString())
                .contentType(MediaType.APPLICATION_JSON);

        this.mockMvc.perform(getRequest)
                .andExpect(status().isOk());
        // 断言C层进行了数据转发（替身接收的参数值符合预期)
        Mockito.verify(this.itemService).findAll();
        Assertions.assertEquals(items,itemJsonObject.get("items"));

    }
}