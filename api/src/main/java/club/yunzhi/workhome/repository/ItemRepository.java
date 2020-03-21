package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ItemRepository extends CrudRepository<Item, Long> {

    @Query("SELECT item FROM Item item WHERE item.beginTime <= :currentTimestamp AND item.endTime >= :currentTimestamp")
    List<Item> findAllByBeginTimeAfterAndEndTimeBefore(Timestamp currentTimestamp);
}
