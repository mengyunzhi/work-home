package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("{id}")
    @JsonView(update.class)
    public Work update(@PathVariable Long id, @RequestBody Work work) {
        return this.workService.update(id, work);
    }
//
//    @DeleteMapping("{workId}/{attachmentId}")
//    public void deleteAttachment(@PathVariable Long workId, @PathVariable Long attachmentId) {
//        this.workService.deleteAttachment(workId, attachmentId);
//    }


    private interface GetAllOfCurrentStudentJsonView
            extends Work.ItemJsonView {
    }

    private interface GetByItemIdJsonView
            extends Work.ItemJsonView, Work.AttachmentsJsonView {
    }

//    private interface update {
//    }
}
