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
     * 获取当前登录学生某个实验的作业
     * @param itemId 实验
     * @return 作业
     */
    Work getByItemIdOfCurrentStudent(Long itemId);
}
