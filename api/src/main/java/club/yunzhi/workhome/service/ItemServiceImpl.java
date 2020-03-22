package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.repository.ItemRepository;
import com.mengyunzhi.core.service.CommonService;
import com.mengyunzhi.core.service.YunzhiService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final YunzhiService<Item> yunzhiService;

    public ItemServiceImpl(ItemRepository itemRepository, YunzhiService<Item> yunzhiService) {
        this.itemRepository = itemRepository;
        this.yunzhiService = yunzhiService;
    }

    @Override
    public List<Item> findAllActiveItems() {
        Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
        return this.itemRepository.findAllByBeginTimeAfterAndEndTimeBefore(current);
    }

    @Override
    public Item save(Item item) {
        if (item.getBeginTime().compareTo(item.getEndTime()) < 0) {
            return itemRepository.save(item);
        }
        throw new SecurityException("开始时间比结束时间晚");
    }

    @Override
    public Item findById(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到"));

    }

    @Override
    public void update(Long id, Item item) {

        if (item.getBeginTime().compareTo(item.getEndTime()) < 0) {
            Item oldItem = this.findById(id);
            oldItem.setName(item.getName());
            oldItem.setBeginTime(item.getBeginTime());
            oldItem.setEndTime(item.getEndTime());
            oldItem.setDescription(item.getDescription());
            itemRepository.save(oldItem);
            return;
        }
        throw new SecurityException("开始时间比结束时间晚");
    }

    @Override
    public void delete(Long id) {
        Item item = this.findById(id);
        if (!item.getActive()) {
            itemRepository.deleteById(id);
            return;
        }
        throw new SecurityException("为激活状态不可删除");
    }

    @Override
    public Page<Item> page(String name, Pageable pageable) {
        Item item = new Item();
        CommonService.setAllFieldsToNull(item);

        if (name != null) {
            item.setName(name);
        }

        return yunzhiService.page(itemRepository, item, pageable);
    }
}
