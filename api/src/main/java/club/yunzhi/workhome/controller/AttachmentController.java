package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.service.AttachmentService;
import com.fasterxml.jackson.annotation.JsonView;
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

    @PostMapping("uploadWork")
    @JsonView(upload.class)
    public Attachment uploadWork(@RequestParam("attachment") MultipartFile multipartFile) {
        return attachmentService.uploadWork(multipartFile);
    }
}
