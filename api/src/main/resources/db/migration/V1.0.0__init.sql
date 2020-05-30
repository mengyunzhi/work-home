/*
 Navicat Premium Data Transfer

 Source Server         : localhost3306
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : localhost:3306
 Source Schema         : work_home

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 30/05/2020 22:34:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attachment
-- ----------------------------
DROP TABLE IF EXISTS `attachment`;
CREATE TABLE `attachment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `mime` varchar(255) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `md5` varchar(255) DEFAULT NULL,
  `origin_name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `save_name` varchar(255) DEFAULT NULL,
  `save_path` varchar(255) DEFAULT NULL,
  `sha1` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `update_time` bigint(20) DEFAULT NULL,
  `create_user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3bw3o0qnhedub4rh5s0vnu889` (`create_user_id`),
  CONSTRAINT `FK3bw3o0qnhedub4rh5s0vnu889` FOREIGN KEY (`create_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16834 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `begin_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dir` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for item_attachments
-- ----------------------------
DROP TABLE IF EXISTS `item_attachments`;
CREATE TABLE `item_attachments` (
  `item_id` bigint(20) NOT NULL,
  `attachments_id` bigint(20) NOT NULL,
  KEY `FKcbaqqmgmf82wyn654xhrpy6pu` (`attachments_id`),
  KEY `FK6ne7fgmigv15e8w1g3ojvdhrh` (`item_id`),
  CONSTRAINT `FK6ne7fgmigv15e8w1g3ojvdhrh` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FKcbaqqmgmf82wyn654xhrpy6pu` FOREIGN KEY (`attachments_id`) REFERENCES `attachment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `no` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `average_score` int(11) DEFAULT NULL,
  `total_score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk5m148xqefonqw7bgnpm0snwj` (`user_id`),
  CONSTRAINT `FKk5m148xqefonqw7bgnpm0snwj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpb6g6pahj1mr2ijg92r7m1xlh` (`user_id`),
  CONSTRAINT `FKpb6g6pahj1mr2ijg92r7m1xlh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` text,
  `create_time` datetime DEFAULT NULL,
  `reviewed` bit(1) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `item_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3c5vyiblbbyt0dda0yjbs97k7` (`item_id`),
  KEY `FK3x7nfcg2v6itg7juqm487qi55` (`student_id`),
  CONSTRAINT `FK3c5vyiblbbyt0dda0yjbs97k7` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FK3x7nfcg2v6itg7juqm487qi55` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=320 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for work_attachments
-- ----------------------------
DROP TABLE IF EXISTS `work_attachments`;
CREATE TABLE `work_attachments` (
  `work_id` bigint(20) NOT NULL,
  `attachments_id` bigint(20) NOT NULL,
  KEY `FKgsxomix0uyqntrw79xybxdfjg` (`attachments_id`),
  KEY `FKjdxbhknbb5g1tl5hsj9yvgab5` (`work_id`),
  CONSTRAINT `FKgsxomix0uyqntrw79xybxdfjg` FOREIGN KEY (`attachments_id`) REFERENCES `attachment` (`id`),
  CONSTRAINT `FKjdxbhknbb5g1tl5hsj9yvgab5` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
