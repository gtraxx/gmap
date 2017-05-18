UPDATE `mc_plugins_gmap_config` SET `config_value` = '4.0' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;

UPDATE `mc_plugins_gmap_config` SET `config_value` = 'red-spot' WHERE `mc_plugins_gmap_config`.`config_id` = 'marker' ;

ALTER TABLE `mc_plugins_gmap` CHANGE COLUMN `name_map` `title` VARCHAR(175) NULL,
CHANGE COLUMN `content_map` `content` TEXT NULL;

RENAME TABLE `mc_plugins_gmap_adress` TO `mc_plugins_gmap_address`;

ALTER TABLE `mc_plugins_gmap_address` CHANGE COLUMN `id_adress` `id_address` SMALLINT(4) UNSIGNED AUTO_INCREMENT NOT NULL,
CHANGE COLUMN `society_ga` `company` VARCHAR(50) NOT NULL,
CHANGE COLUMN `adress_ga` `address` VARCHAR(175) NOT NULL,
CHANGE COLUMN `postcode_ga` `poscode` VARCHAR(12) NOT NULL,
CHANGE COLUMN `country_ga` `country` VARCHAR(30) NOT NULL,
CHANGE COLUMN `city_ga` `city` VARCHAR(40) NOT NULL,
CHANGE COLUMN `lat_ga` `lat` double NOT NULL,
CHANGE COLUMN `lng_ga` `lng` double NOT NULL,
CHANGE COLUMN `link_ga` `link` varchar(200) DEFAULT NULL;

ALTER TABLE `mc_plugins_gmap_address` ADD `img` VARCHAR(125) NULL,
ADD `about` TEXT NULL,
ADD `phone` VARCHAR(45) NULL,
ADD `mobile` VARCHAR(45) NULL,
ADD `fax` VARCHAR(45) NULL,
ADD `email` VARCHAR(150) NULL,
ADD `order_addr` SMALLINT(4) UNSIGNED NULL;

DELETE FROM `mc_plugins_gmap_config` WHERE config_id IN ('society_map','adress_map','postcode_map','country_map','city_map','route_map','lat_map','lng_map','multi_marker','link_map');