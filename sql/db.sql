CREATE TABLE IF NOT EXISTS `mc_plugins_gmap` (
  `idgmap` SMALLINT(3) NOT NULL AUTO_INCREMENT,
  `idlang` SMALLINT(3) NOT NULL,
  `title` VARCHAR(175) NULL,
  `content` text NULL,
  PRIMARY KEY (`idgmap`),
  KEY `idlang` (`idlang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_config` (
  `idgmapconfig` SMALLINT(4) unsigned NOT NULL AUTO_INCREMENT,
  `config_id` VARCHAR(100) NOT NULL,
  `config_value` text,
  PRIMARY KEY (`idgmapconfig`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `mc_plugins_gmap_address` (
  `id_address` SMALLINT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idlang` SMALLINT(3) NOT NULL,
  `company` VARCHAR(50) NOT NULL,
  `about` TEXT NULL,
  `address` VARCHAR(175) NOT NULL,
  `poscode` VARCHAR(12) NOT NULL,
  `country` VARCHAR(30) NOT NULL,
  `city` VARCHAR(40) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `mobile` VARCHAR(45) NULL,
  `fax` VARCHAR(45) NULL,
  `email` VARCHAR(150) NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `link` VARCHAR(200) DEFAULT NULL,
  `img` VARCHAR(125) NULL,
  `order_addr` SMALLINT(4) UNSIGNED NULL,
  PRIMARY KEY (`id_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT INTO `mc_plugins_gmap_config` (`idgmapconfig`, `config_id`, `config_value`) VALUES
(NULL, 'marker', 'red-spot'),
(NULL, 'gmap_version', '4.1'),
(NULL, 'api_key', NULL);

INSERT INTO `mc_config_size_img` VALUES (null, 6, 'gmap', 480, 360, 'medium', 'adaptive');