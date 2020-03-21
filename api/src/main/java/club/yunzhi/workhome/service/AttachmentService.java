package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

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
     * 下载附件
     * @param md5 文件 MD5 值
     * @param sha1 文件 SHA-1 值
     * @param id 附件id
     * @param originName 附件原始名称
     */
    void download(String md5, String sha1, Long id, String originName, OutputStream out);

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

}
