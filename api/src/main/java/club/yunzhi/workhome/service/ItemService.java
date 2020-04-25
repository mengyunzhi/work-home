package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface ItemService {

    /**
     * 获取当前所有激活的实验项目
     */
    List<Item> findAllActiveItems();

    /**
     * 保存实验项目
     *
     * @param item 实验项目
     */
    Item save(Item item);

    /**
     * 通过id获取实验项目
     *
     * @param id 实验项目Id
     */
    Item findById(Long id);

    /**
     * 更新实验项目信息
     *
     * @param id   实验项目Id
     * @param item 实验项目
     */
    void update(Long id, Item item);

    /**
     * 删除实验项目
     *
     * @param id 实验项目Id
     */
    void delete(Long id);

    /**
     * 分页
     *
     * @param name     实验项目
     * @param pageable 分页信息
     * @return Page<Item>
     */
    Page<Item> page(String name, Pageable pageable);

    /**
     * 查看所有项目
     *
     * @return List<Item>
     */
    List<Item> findAll();
}
