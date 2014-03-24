CREATE TABLE `SITE_DB`.`item_candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,

  `name` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `responsibilities` text NOT NULL,
  `background` text NOT NULL,
  
  `position` int(11) DEFAULT '0',

  `files` text NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `item_candidate_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;