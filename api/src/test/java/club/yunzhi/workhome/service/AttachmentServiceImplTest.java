package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.repository.AttachmentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

class AttachmentServiceImplTest extends ServiceTest{
    private final static Logger logger = LoggerFactory.getLogger(AttachmentServiceImplTest.class);

    @Autowired
    private ResourceLoader loader;

    @Mock
    AttachmentService attachmentService;

    @Test
    void uploadWork() throws IOException {
        logger.debug("定义常量");
        final String NAME = "attachment";
        final String FILE_NAME = "example.jpeg";
        Attachment attachment = AttachmentService.getOneAttachment();

        logger.debug("获取资源");
        Resource resource = loader.getResource(ResourceUtils.CLASSPATH_URL_PREFIX + FILE_NAME);

        logger.debug("创建模拟文件");
        MultipartFile multipartFile = new MockMultipartFile(NAME, FILE_NAME, "image/jpeg", resource.getInputStream());
        Mockito.doReturn(attachment).when(attachmentService).uploadWork(multipartFile, null, null);

        Assertions.assertEquals(attachment, this.attachmentService.uploadWork(multipartFile, null, null));
    }
}