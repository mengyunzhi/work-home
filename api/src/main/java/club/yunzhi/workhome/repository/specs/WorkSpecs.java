package club.yunzhi.workhome.repository.specs;

import club.yunzhi.workhome.entity.Item;
import club.yunzhi.workhome.entity.Work;
import org.springframework.data.jpa.domain.Specification;

public class WorkSpecs {

    public static Specification<Work> belongToItem(Item item) {
        if (null == item || null == item.getId()) {
            return Specification.where(null);
        }
        return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("item").as(Item.class), item);
    }

    public static Specification<Work> containingName(String studentName) {
        if (studentName != null) {
            return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("student").get("name").as(String.class), String.format("%%%s%%", studentName));
        } else {
            return Specification.where(null);
        }
    }

    public static Specification<Work> startWithNo(String studentNo) {
        if (studentNo == null) {
            return Specification.where(null);
        }
        return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get("student").get("no").as(String.class), String.format("%s%%", studentNo));
    }

    public static Specification<Work> isStatus(Short status) {
        if (status == null) {
            return Specification.where(null);
        }
        return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("status").as(Short.class),  status);
    }

    public static Specification<Work> notIsStatus(Short status) {
        if (status == null) {
            return Specification.where(null);
        }
        return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.notEqual(root.get("status").as(Short.class),  status);
    }

    public static Specification<Work> notIsUserId(Long lastReviewedUserId) {
        if (lastReviewedUserId == null) {
            return Specification.where(null);
        }
        return (Specification<Work>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.notEqual(root.get("lastReviewedUserId").as(Long.class),  lastReviewedUserId);
    }
}
