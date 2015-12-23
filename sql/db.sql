CREATE TABLE IF NOT EXISTS `mc_plugins_gmap` (
  `idgmap` tinyint(3) NOT NULL AUTO_INCREMENT,
  `idlang` tinyint(3) NOT NULL,
  `idadmin` tinyint(3) NOT NULL,
  `name_map` tinytext NOT NULL,
  `content_map` text,
  PRIMARY KEY (`idgmap`),
  KEY `idlang` (`idlang`,`idadmin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_config` (
  `config_id` varchar(100) NOT NULL,
  `config_value` tinytext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

INSERT INTO `mc_plugins_gmap_config` VALUES('society_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('adress_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('country_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('city_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('marker', 'red-dot.png');
INSERT INTO `mc_plugins_gmap_config` VALUES('route_map', '0');
INSERT INTO `mc_plugins_gmap_config` VALUES('lat_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('lng_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('gmap_version', '2.5');
INSERT INTO `mc_plugins_gmap_config` VALUES('multi_marker', '0');