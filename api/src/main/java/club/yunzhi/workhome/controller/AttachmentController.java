package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.service.AttachmentService;
import com.fasterxml.jackson.annotation.JsonView;
import com.sun.istack.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("attachment")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @Autowired
    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    interface upload {
    }

    @PostMapping
    @JsonView(upload.class)
    public Attachment upload(@RequestParam("attachment") MultipartFile multipartFile) {
        return attachmentService.upload(multipartFile);
    }

    /**
     * 上传作业
     *
     * @param multipartFile 作业文件
     * @param itemId        实验id
     * @param uploadDir     上传的目录
     * @return 附件实体
     */
    @PostMapping("uploadWork")
    @JsonView(upload.class)
    public Attachment uploadWork(@RequestParam("attachment") MultipartFile multipartFile,
                                 @RequestParam(name = "option1", required = false) String itemId,
                                 @RequestParam(required = false) String uploadDir) {
        return attachmentService.uploadWork(multipartFile, itemId, uploadDir);
    }
}
