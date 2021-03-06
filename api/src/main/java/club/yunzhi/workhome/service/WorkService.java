package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Attachment;
import club.yunzhi.workhome.entity.Work;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.IllegalFormatException;
import java.util.List;
import java.util.Optional;

/**
 * 作业
 *
 * @author yz
 */
public interface WorkService {
    /**
     * 获取当前登录学生的作业列表
     *
     * @return 作业
     */
    List<Work> getAllOfCurrentStudent();

    /**
     * 获取当前登录学生某个实验的作业
     *
     * @param itemId 实验
     * @return 作业 | null
     */
    Optional<Work> getByItemIdOfCurrentStudent(Long itemId);

    /**
     * 获取作业
     *
     * @param itemId    实验
     * @param studentId 学生
     * @return 作业 | null
     */
    Optional<Work> getByItemIdAndStudentId(Long itemId, Long studentId);

    /**
     * 获取作业，如果获取不到就待久化一个作业
     *
     * @param itemId 学期
     * @return 作业
     */
    Work getOrElseCreateNewByItemIdOfCurrentStudent(Long itemId);

    /**
     * 更新当前学生
     *
     * @param id   作业ID
     * @param work 作业
     * @return 作业
     */
    Work updateOfCurrentStudent(Long id, Work work);

    /**
     * 新建作业
     *
     * @param itemId 学期
     * @return 作业
     */
    Work saveWorkByItemIdOfCurrentStudent(Long itemId);

    /**
     * 新建作业
     *
     * @param work 作业
     * @return 作业
     */
    Work save(Work work);

    /**
     * 删除某个作业的某个附件
     *
     * @param workId       作业id
     * @param attachmentId 附件id
     */
    void deleteAttachment(Long workId, Long attachmentId);

    /**
     * 通过id获取作业
     *
     * @param id 作业id
     * @return 作业
     */
    Work findById(Long id);

    /**
     * 上传作业并将作业保存在自己的目录下
     *
     * @param multipartFile 文件
     * @return 附件实体
     */
    Attachment uploadWork(MultipartFile multipartFile, String itemId, String uploadDir) throws IllegalFormatException;

    /**
     * 获取所有作业
     *
     * @return 所有作业
     */
    Page<Work> getAll(Pageable pageable);


    /**
     * 更新作业分数
     * @param id
     * @param score
     * @return
     */
    Work updateScore(Long id, int score);

    /**
     * 综合查询
     * @param itemId 实验id
     * @param studentName 学生姓名
     * @param studentSno 学生学号
     * @param pageable
     * @return
     */
    Page<Work> getAll(Long itemId, String studentName, String studentSno, Boolean reviewed, @NotNull Pageable pageable);

    /**
     * 判断是否为老师
     * @return 是返回ture， 不是返回false
     */
    boolean isTeacher();
//
//    Work getNextNotReviewedWork();
}
