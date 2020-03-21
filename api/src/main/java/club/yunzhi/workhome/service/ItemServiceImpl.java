package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findAllActiveItems() {
        Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
        return this.itemRepository.findAllByBeginTimeAfterAndEndTimeBefore(current);
    }
}
