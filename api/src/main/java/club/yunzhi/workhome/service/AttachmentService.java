package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Random;

public interface AttachmentService {
    /**
     * 获取一个附件
     * @return
     */
    static Attachment getOneAttachment() {
        Attachment attachment = new Attachment();
        attachment.setId(new Random().nextLong());
        return attachment;
    }

    /**
     * 获取附件
     * @param id id
     * @return 附件
     */
    Attachment getById(Long id);
    /**
     * 上传附件
     *
     * @param multipartFile 文件
     */
    Attachment upload(MultipartFile multipartFile);

    void downloadFile(String fileName, HttpServletResponse response) throws IOException;

    String getMediaTypeBySaveName(String saveName);
}
