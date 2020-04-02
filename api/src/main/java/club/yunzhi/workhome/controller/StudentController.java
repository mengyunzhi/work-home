package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Student;
import club.yunzhi.workhome.service.StudentService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("Student")
public class StudentController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * 保存学生
     * @param student
     * @return
     */
    @PostMapping
    @JsonView(studentJsonView.class)
    public Student save(@RequestBody Student student) {
        return studentService.save(student);
    }

    /**
     * 获取所有学生
     * @return
     */
    /*@GetMapping("getAll")
    @JsonView(studentJsonView.class)
    public List<Student> getAll() {
        return studentService.getAll();
    } */

    /**
     * 获取所有学生
     * @param pageable 分页信息
     * @return 所有学生
     */
    @GetMapping("getAll")
    @JsonView(studentJsonView.class)
    public Page<Student> findAll(
        @RequestParam(required = false) String studentName,
        @RequestParam(required = false) String studentNo,
        Pageable pageable) {
            return this.studentService.getAll(
                studentName,
                studentNo,
                pageable);
    }

    /**
     * 通过id获取学生
     * @param id
     * @return
     */
    @GetMapping("{id}")
    @JsonView(studentJsonView.class)
    public Student getById(@PathVariable Long id) {
        return this.studentService.findById(id);
    }

    /**
     * 更新学生信息
     * @param id
     * @param student
     */
    @PutMapping("{id}")
    @JsonView(studentJsonView.class)
    public void update(@PathVariable Long id, @RequestBody Student student) {
        studentService.update(id, student);
    }

    /**
     * 删除学生
     * @param id
     */
    @DeleteMapping("{id}")
    @JsonView(studentJsonView.class)
    public void delete(@PathVariable Long id) {
        studentService.delete(id);
    }

    public interface studentJsonView extends Student.UserJsonView {
    }

}
