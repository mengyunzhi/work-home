package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.exception.ObjectNotFoundException;
import club.yunzhi.workhome.service.WorkService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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


    @GetMapping("getAll")
    @JsonView(getAllJsonView.class)
    public Page<Work> getAll(Pageable pageable) {
        return workService.getAll(pageable);
    }

    /**
     * 查看某一学生某一实验作业
     * @param itemId 实验id
     * @param studentId 学生id
     * @return 作业
     */
    @GetMapping("getByItemIdAndStudentId")
    public Work getByItemIdAndStudentId(@RequestParam Long itemId, @RequestParam Long studentId) {
        Optional<Work> workOptional = workService.getByItemIdAndStudentId(itemId, studentId);
        if (workOptional.isPresent()) {
            throw new ObjectNotFoundException("未找到相关作业");
        }
        return workOptional.get();
    }

    /**
     * 根据id获取作业
     * @param id 作业id
     * @return 作业
     */
    @GetMapping("{id}")
    @JsonView(getByIdJsonView.class)
    public Work getById(@PathVariable Long id) {
        return this.workService.findById(id);
    }

    private interface GetAllOfCurrentStudentJsonView
            extends Work.ItemJsonView {
    }

    private interface GetByItemIdJsonView
            extends Work.ItemJsonView, Work.AttachmentsJsonView, Item.AttachmentsJsonView {
    }

    private interface UpdateJsonView extends GetByItemIdJsonView {
    }

    private interface getAllJsonView extends  {
    }

    private interface getByIdJsonView extends   {

    }
}
