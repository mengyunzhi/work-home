package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Work;

import java.util.List;

/**
 * 作业
 * @author yz
 */
public interface WorkService {
    /**
     * 获取当前登录学生的作业列表
     * @return 作业
     */
    List<Work> getAllOfCurrentStudent();

    /**
     * 更新
     * @param id
     * @param work
     * @return
     */
    Work update(Long id, Work work);

    void deleteAttachment(Long workId, Long attachmentId);

    Work findById(Long id);
}
