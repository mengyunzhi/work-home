package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author yz
 * 作业
 */
@RestController
@RequestMapping("work")
public class WorkController {
    final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @GetMapping("getAllOfCurrentStudent")
    @JsonView(GetAllOfCurrentStudentJsonView.class)
    public List<Work> getAllOfCurrentStudent() {
        return workService.getAllOfCurrentStudent();
    }

    @GetMapping("getByItemIdOfCurrentStudent")
    @JsonView(GetByItemIdJsonView.class)
    public Work getByItemId(@RequestParam Long itemId) {
        return workService.getOrElseCreateNewByItemIdOfCurrentStudent(itemId);
    }

    @DeleteMapping("deleteAttachment/{workId}/{attachmentId}")
    public void deleteAttachment(@PathVariable Long workId, @PathVariable Long attachmentId) {
        this.workService.deleteAttachment(workId, attachmentId);
    }

    @PutMapping("updateOfCurrentStudent/{id}")
    @JsonView(UpdateJsonView.class)
    public Work updateOfCurrentStudent(@PathVariable Long id, @RequestBody Work work) {
        return this.workService.updateOfCurrentStudent(id, work);
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
    @JsonView(UploadWork.class)
    public Attachment uploadWork(@RequestParam("attachment") MultipartFile multipartFile,
                                 @RequestParam(name = "option1", required = false) String itemId,
                                 @RequestParam(required = false) String uploadDir) {
        return workService.uploadWork(multipartFile, itemId, uploadDir);
    }

    private interface GetAllOfCurrentStudentJsonView
            extends Work.ItemJsonView {
    }

    private interface GetByItemIdJsonView
            extends Work.ItemJsonView, Work.AttachmentsJsonView, Item.AttachmentsJsonView {
    }

    private interface UpdateJsonView extends GetByItemIdJsonView {
    }

    public interface UploadWork {}
}
