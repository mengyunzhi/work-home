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

    @MockBean
    AttachmentService attachmentService;

}