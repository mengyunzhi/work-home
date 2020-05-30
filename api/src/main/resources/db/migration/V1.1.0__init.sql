ALTER TABLE `work`
CHANGE COLUMN `reviewed` `status` smallint(10) NULL DEFAULT NULL AFTER `create_time`;
ALTER TABLE `user`
ADD COLUMN `admin` bit(1) NOT NULL DEFAULT 0 AFTER `role`;
ALTER TABLE `work`
ADD COLUMN `last_reviewed_user_id` bigint(20) NOT NULL DEFAULT 0 AFTER `student_id`;
UPDATE `work`
SET STATUS=2
WHERE STATUS=1;