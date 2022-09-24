/*
SQLyog Ultimate v8.32 
MySQL - 5.5.5-10.4.24-MariaDB : Database - api_server
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`api_server` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `api_server`;

/*Table structure for table `ev_article_cate` */

DROP TABLE IF EXISTS `ev_article_cate`;

CREATE TABLE `ev_article_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `ev_article_cate` */

insert  into `ev_article_cate`(`id`,`name`,`alias`,`is_delete`) values (1,'编程','code',0);

/*Table structure for table `ev_articles` */

DROP TABLE IF EXISTS `ev_articles`;

CREATE TABLE `ev_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` varchar(255) NOT NULL,
  `pub_date` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL COMMENT '默认为0表示未被删除',
  `cate_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `ev_articles` */

insert  into `ev_articles`(`id`,`title`,`content`,`cover_img`,`pub_date`,`state`,`is_delete`,`cate_id`,`author_id`) values (1,'发布新文章','实现步骤\n1. 初始化路由模块\n2. 初始化路由处理函数模块\n3. 使用 multer 解析表单数据\n4. 验证表单数据\n5. 实现发布文章的功能','\\uploads\\51ba594e5d0f6dbae2d2c38f22832203','2022-04-22 20:58:41.639','草稿',0,1,1);

/*Table structure for table `ev_users` */

DROP TABLE IF EXISTS `ev_users`;

CREATE TABLE `ev_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `ev_users` */

insert  into `ev_users`(`id`,`username`,`password`,`nickname`,`email`,`user_pic`) values (1,'admin','$2a$10$AXJ/g1YUqivfCcYNDkufp.dFtnebxQMtJ4TtqF7Rsb46v67YtJo6i','纯子酱','cunzijiang@163.com','data:image/png;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
