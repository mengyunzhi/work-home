package club.yunzhi.workhome.service;

import club.yunzhi.workhome.entity.Item;

import java.util.List;

public interface ItemService {

    /**
     * 获取当前所有激活的实验项目
     */
    List<Item> findAllActiveItems();
}
