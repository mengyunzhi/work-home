package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Item;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ItemRepositoryTest {

    private static final Logger logger = LoggerFactory.getLogger(ItemRepositoryTest.class);

    @Autowired
    private ItemRepository itemRepository;

    @Test
    void findAllByBeginTimeAfterAndEndTimeBefore() {
        logger.debug("获取测试日期");
        Timestamp time1 = this.getCalendarTimestamp(-2);
        Timestamp time2 = this.getCalendarTimestamp(-1);
        Timestamp time3 = this.getCalendarTimestamp(1);
        Timestamp time4 = this.getCalendarTimestamp(2);

        logger.debug("实验一：过期");
        Item item1 = new Item(time1, time2);

        logger.debug("实验二：进行中");
        Item item2 = new Item(time2, time3);

        logger.debug("实验三：未开始");
        Item item3 = new Item(time3, time4);

        logger.debug("保存");
        itemRepository.saveAll(Arrays.asList(item1, item2, item3));

        logger.debug("断言数量为一");
        List<Item> items = itemRepository.findAllByBeginTimeAfterAndEndTimeBefore(new Timestamp(Calendar.getInstance().getTimeInMillis()));
        Assertions.assertThat(items.size()).isEqualTo(1);
    }

    /**
     * 获取日期时间戳
     */
    private Timestamp getCalendarTimestamp(int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, day);
        return new Timestamp(calendar.getTimeInMillis());
    }
}