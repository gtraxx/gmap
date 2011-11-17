UPDATE `mc_plugins_gmap_config` SET `config_value` = '1.5' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;

INSERT INTO `mc_plugins_gmap_config` VALUES('multi_marker', '0');

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_adress` (
  `id_adress` smallint(4) NOT NULL AUTO_INCREMENT,
  `idgmap` tinyint(3) NOT NULL,
  `society_ga` varchar(50) NOT NULL,
  `adress_ga` tinytext NOT NULL,
  `country_ga` varchar(30) NOT NULL,
  `city_ga` varchar(40) NOT NULL,
  `lat_ga` double NOT NULL,
  `lng_ga` double NOT NULL,
  PRIMARY KEY (`id_adress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;