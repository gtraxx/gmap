UPDATE `mc_plugins_gmap_config` SET `config_value` = '2.7' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;

ALTER TABLE `mc_plugins_gmap` CHANGE `idgmap` `idgmap` SMALLINT( 3 ) NOT NULL AUTO_INCREMENT ,
CHANGE `idlang` `idlang` SMALLINT( 3 ) NOT NULL ,
CHANGE `idadmin` `idadmin` SMALLINT( 3 ) NOT NULL ,
CHANGE `name_map` `name_map` VARCHAR( 175 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

ALTER TABLE `mc_plugins_gmap_adress` CHANGE `idgmap` `idgmap` SMALLINT( 3 ) NOT NULL ,
CHANGE `adress_ga` `adress_ga` VARCHAR( 175 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

INSERT INTO `mc_plugins_gmap_config` (`idgmapconfig`, `config_id`, `config_value`) VALUES
(NULL, 'api_key', NULL);