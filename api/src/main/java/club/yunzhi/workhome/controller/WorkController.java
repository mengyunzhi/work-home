package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Work;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author yz
 * 作业
 */
@RestController
@RequestMapping("work")
public class WorkController {

    @GetMapping("getAllOfCurrentStudent")
    @JsonView(GetAllOfCurrentStudentJsonView.class)
    public List<Work> getAllOfCurrentStudent() {
        return null;
    }

    private interface GetAllOfCurrentStudentJsonView {
    }
}
