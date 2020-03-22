package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Work;
import club.yunzhi.workhome.service.WorkService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
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

    @PutMapping("updateOfCurrentStudent/{id}")
    @JsonView(UpdateJsonView.class)
    public Work updateOfCurrentStudent(@PathVariable Long id, @RequestBody Work work) {
        return this.workService.updateOfCurrentStudent(id, work);
    }

    private interface GetAllOfCurrentStudentJsonView
            extends Work.ItemJsonView {
    }

    private interface GetByItemIdJsonView
            extends Work.ItemJsonView, Work.AttachmentsJsonView {
    }

    private interface UpdateJsonView extends GetByItemIdJsonView {
    }
}
