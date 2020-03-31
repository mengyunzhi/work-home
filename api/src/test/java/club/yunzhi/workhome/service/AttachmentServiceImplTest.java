package club.yunzhi.workhome.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static club.yunzhi.workhome.service.AttachmentService.checkDir;

class AttachmentServiceImplTest extends ServiceTest{
    private final static Logger logger = LoggerFactory.getLogger(AttachmentServiceImplTest.class);

    @Mock
    AttachmentService attachmentService;

    @Test
    void checkDirTest() {

        logger.debug("结果为正确");
        String test1 = "";
        String test2 = "/test";
        String test3 = "/test/1231";

        logger.debug("结果为错误");
        String test4 = "/";
        String test5 = "//";
        String test6 = "/1231@2";
        String test7 = "12/123";
        String test8 = "/../";
        String test9 = "/./";

        logger.debug("结果为正确");
        Assertions.assertTrue(checkDir(test1));
        Assertions.assertTrue(checkDir(test2));
        Assertions.assertTrue(checkDir(test3));

        logger.debug("结果为错误");
        Assertions.assertFalse(checkDir(test5));
        Assertions.assertFalse(checkDir(test4));
        Assertions.assertFalse(checkDir(test6));
        Assertions.assertFalse(checkDir(test7));
        Assertions.assertFalse(checkDir(test8));
        Assertions.assertFalse(checkDir(test9));

    }
}