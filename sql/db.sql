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
  `idgmapconfig` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
  `config_id` varchar(100) NOT NULL,
  `config_value` tinytext,
  PRIMARY KEY (`idgmapconfig`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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

INSERT INTO `mc_plugins_gmap_config` (`idgmapconfig`, `config_id`, `config_value`) VALUES
(NULL, 'society_map', NULL),
(NULL, 'adress_map', NULL),
(NULL, 'country_map', NULL),
(NULL, 'city_map', NULL),
(NULL, 'marker', 'red-dot.png'),
(NULL, 'route_map', '0'),
(NULL, 'lat_map', NULL),
(NULL, 'lng_map', NULL),
(NULL, 'gmap_version', '2.6'),
(NULL, 'multi_marker', '0');