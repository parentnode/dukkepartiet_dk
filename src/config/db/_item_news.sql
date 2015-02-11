CREATE TABLE `SITE_DB`.`item_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `article` text NOT NULL,


  `type` varchar(255) NOT NULL,
  `client` varchar(255) NOT NULL,

  `files` varchar(5) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_news_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;