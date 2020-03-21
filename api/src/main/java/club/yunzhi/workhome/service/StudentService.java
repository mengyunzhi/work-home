package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Student;

/**
 * 学生
 * @author yz
 */
public interface StudentService {
    /**
     * 获取当前登录的学生
     * @return 学生 | null
     */
    Student getCurrentStudent();
}
