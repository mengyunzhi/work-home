package club.yunzhi.workhome.controller;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.service.ItemService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("active")
    @JsonView(FindAllActiveItemsJsonView.class)
    public List<Item> findAllActiveItems() {
        return this.itemService.findAllActiveItems();
    }

    public interface FindAllActiveItemsJsonView extends Item.AttachmentsJsonView {}
}
