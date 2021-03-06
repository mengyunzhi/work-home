package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.annotation.Admin;
import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.service.ItemService;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 实验
 * @author  yz
 */
@RestController
@RequestMapping("item")
public class ItemController {

    private final ItemService itemService;
    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("active")
    @JsonView(FindAllActiveItemsJsonView.class)
    public List<Item> findAllActiveItems() {
        return this.itemService.findAllActiveItems();
    }
    @GetMapping("all")
    @JsonView(FindAllActiveItemsJsonView.class)
    public List<Item> getAll() {
        return this.itemService.findAll();
    }
    /**
     * 保存实验项目
     *
     * @param item 实验项目
     */
    @Admin
    @PostMapping
    public Item save(@RequestBody Item item) {
        return itemService.save(item);
    }


    /**
     * 通过id获取实验项目
     *
     * @param id 实验项目Id
     */
    @GetMapping("{id}")
    @JsonView(itemJsonView.class)
    public Item getById(@PathVariable Long id) {
        return itemService.findById(id);
    }

    /**
     * 更新实验项目信息
     *
     * @param id   实验项目Id
     * @param item 实验项目
     */
    @Admin
    @PutMapping("{id}")
    @JsonView(itemJsonView.class)
    public void update(@PathVariable Long id, @RequestBody Item item) {
        itemService.update(id, item);

    }

    /**
     * 删除实验项目
     *
     * @param id 实验项目Id
     *
     */
    @Admin
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        itemService.delete(id);
    }

    /**
     * 分页
     *
     * @param name    实验项目
     * @param pageable 分页信息
     * @return Page<Item>
     */
    @GetMapping("/page")
    @JsonView(itemJsonView.class)
    public Page<Item> page(@RequestParam(required = false, defaultValue = "") String name,
                           @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC)) Pageable pageable) {
        return itemService.page(name, pageable);
    }

    public interface FindAllActiveItemsJsonView extends Item.AttachmentsJsonView {
    }

    public interface itemJsonView extends Item.AttachmentsJsonView {
    }
}
