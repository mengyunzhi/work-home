package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.service.AttachmentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ResourceUtils;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AttachmentControllerTest extends ControllerTest {
    private static final Logger logger = LoggerFactory.getLogger(AttachmentControllerTest.class);

    private String url = "/attachment";

    @Autowired
    private ResourceLoader loader;

    @MockBean
    AttachmentService attachmentService;

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
        this.mockMvc.perform(multipart("/attachment/uploadWork")
                .file(multipartFile)
                .param("option1", "")
        )

                .andExpect(status().isOk());

        logger.debug("断言方法调用成功");
        Mockito.verify(attachmentService).uploadWork(multipartFile, "", null);
    }
}