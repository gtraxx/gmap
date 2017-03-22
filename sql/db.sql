CREATE TABLE IF NOT EXISTS `mc_plugins_gmap` (
  `idgmap` SMALLINT(3) NOT NULL AUTO_INCREMENT,
  `idlang` SMALLINT(3) NOT NULL,
  `name_map` VARCHAR(175) NOT NULL,
  `content_map` text,
  PRIMARY KEY (`idgmap`),
  KEY `idlang` (`idlang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_config` (
  `idgmapconfig` SMALLINT(4) unsigned NOT NULL AUTO_INCREMENT,
  `config_id` VARCHAR(100) NOT NULL,
  `config_value` text,
  PRIMARY KEY (`idgmapconfig`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_adress` (
  `id_adress` SMALLINT(4) NOT NULL AUTO_INCREMENT,
  `idgmap` SMALLINT(3) NOT NULL,
  `society_ga` VARCHAR(50) NOT NULL,
  `adress_ga` VARCHAR(175) NOT NULL,
  `postcode_ga` VARCHAR(12) NOT NULL,
  `country_ga` VARCHAR(30) NOT NULL,
  `city_ga` VARCHAR(40) NOT NULL,
  `lat_ga` double NOT NULL,
  `lng_ga` double NOT NULL,
  PRIMARY KEY (`id_adress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `mc_plugins_gmap_config` (`idgmapconfig`, `config_id`, `config_value`) VALUES
(NULL, 'society_map', NULL),
(NULL, 'adress_map', NULL),
(NULL, 'postcode_map', NULL),
(NULL, 'country_map', NULL),
(NULL, 'city_map', NULL),
(NULL, 'marker', 'red-dot.png'),
(NULL, 'route_map', '0'),
(NULL, 'lat_map', NULL),
(NULL, 'lng_map', NULL),
(NULL, 'gmap_version', '2.9'),
(NULL, 'multi_marker', '0'),
(NULL, 'api_key', NULL);