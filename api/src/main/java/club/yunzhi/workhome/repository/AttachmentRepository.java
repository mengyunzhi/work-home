package club.yunzhi.workhome.repository;

import club.yunzhi.workhome.entity.Attachment;
import org.springframework.data.repository.CrudRepository;

public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
    Attachment findTopOneBySha1AndMd5(String sha1, String md5);
    Attachment findBySaveName(String saveName);

}