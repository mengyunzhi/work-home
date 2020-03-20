package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    /**
     * 根据用户名查询用户
     */
    User findByUsername(String username);
}
