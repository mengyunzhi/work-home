package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.service.AttachmentService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
}
