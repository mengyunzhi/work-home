package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Path;
import java.util.IllegalFormatException;
import java.util.Random;
import java.util.regex.Pattern;

public interface AttachmentService {
    /**
     * 获取一个附件
     *
     * @return
     */
    static Attachment getOneAttachment() {
        Attachment attachment = new Attachment();
        attachment.setId(new Random().nextLong());
        return attachment;
    }

    /**
     * 检查目录是否合法
     *
     * @param dir 目录
     * @return true 合法  false 不合法
     */
    static boolean checkDir(String dir) {
        return Pattern.matches("^\\/(\\w+\\/?)+$", dir);
    }

    /**
     * 获取附件
     *
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

    /**
     * 保存上传的文件
     *
     * @param multipartFile     上传的文件
     * @param saveFilePath      文件保存路径
     * @param useOriginNameSave 是否使用文件原名存储
     * @return 保存的附件实体
     */
    Attachment saveAttachment(MultipartFile multipartFile, Path saveFilePath, Boolean useOriginNameSave);
}
