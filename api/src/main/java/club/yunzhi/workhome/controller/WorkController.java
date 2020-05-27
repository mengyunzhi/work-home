package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.annotation.Admin;
import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.exception.ObjectNotFoundException;
import club.yunzhi.workhome.service.WorkService;
import club.yunzhi.workhome.service.WorkServiceImpl;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

/**
 * @author yz
 * 作业
 */
@RestController
@RequestMapping("work")
public class WorkController {
    final WorkService workService;
    private static final Logger logger = LoggerFactory.getLogger(WorkServiceImpl.class);
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

    /**
     * 获取所有作业
     * @param pageable 分页信息
     * @return 所有作业
     */
    @GetMapping("getAll")
    @JsonView(GetAllJsonView.class)
    public Page<Work> findAll(
            @RequestParam(required = false) Long itemId,
            @RequestParam(required = false) String studentName,
            @RequestParam(required = false) String studentNo,
            @RequestParam(required = false) String reviewed,
            Pageable pageable) {
        Boolean _reviewed = null;
        if (reviewed != null){
            switch (reviewed) {
                case "1": _reviewed = true;break;
                case "0": _reviewed = false;break;
            }
        }
        return this.workService.getAll(
            itemId,
            studentName,
            studentNo,
            _reviewed,
            pageable);
    }

    /**
     * 查看某一学生某一实验作业
     *
     * @param itemId    实验id
     * @param studentId 学生id
     * @return 作业
     */
    @GetMapping("getByItemIdAndStudentId")
    @JsonView(GetByItemIdAndStudentIdJsonView.class)
    public Work getByItemIdAndStudentId(@RequestParam Long itemId, @RequestParam Long studentId) {
        Optional<Work> workOptional = workService.getByItemIdAndStudentId(itemId, studentId);
        if (workOptional.isPresent()) {
            throw new ObjectNotFoundException("未找到相关作业");
        }
        return workOptional.get();
    }

    /**
     * 根据id获取作业
     *
     * @param id 作业id
     * @return 作业
     */
    @GetMapping("{id}")
    @JsonView(GetByIdJsonView.class)
    public Work getById(@PathVariable Long id) {
        return this.workService.findById(id);
    }

    /**
     * 更新分数
     * @param id 作业id
     * @param work 作业
     * @return
     */
    @Admin
    @PutMapping("updateScore/{id}")
    @JsonView(UpdateScoreJsonView.class)
    public Work updateScore (@PathVariable Long id, @RequestBody Work work) {
        return this.workService.updateScore(id, work.getScore());
    }

    /**
     * 获取下一个未评阅的作业
     * @return 作业
     */
//    @GetMapping("getNextNotReviewedWork")
//    @JsonView(GetNextNotReviewedWorkJsonView.class)
//    public Work getNextNotReviewedWork() {
//        return this.workService.getNextNotReviewedWork();
//    }

    private interface GetAllOfCurrentStudentJsonView
            extends Work.ItemJsonView {
    }

    private interface GetByItemIdJsonView
            extends Work.ItemJsonView, Work.AttachmentsJsonView, Item.AttachmentsJsonView {
    }

    private interface UpdateJsonView extends GetByItemIdJsonView {
    }

    public interface UploadWork {
    }

    private interface GetAllJsonView extends Work.StudentJsonView, Work.ItemJsonView {
    }


    private interface GetByIdJsonView extends Work.AttachmentsJsonView, Work.StudentJsonView, Work.ItemJsonView {
    }

    private interface GetByItemIdAndStudentIdJsonView extends GetByIdJsonView {
    }

    private interface UpdateScoreJsonView extends UpdateJsonView {
    }

    private interface GetNextNotReviewedWorkJsonView extends GetByIdJsonView {
    }
}
