ALTER TABLE `mc_plugins_gmap` CHANGE `idgmap` `idgmap` SMALLINT( 3 ) NOT NULL AUTO_INCREMENT ,
CHANGE `idlang` `idlang` SMALLINT( 3 ) NOT NULL ,
CHANGE `idadmin` `idadmin` SMALLINT( 5 ) NOT NULL ,
CHANGE `name_map` `name_map` VARCHAR( 125 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

UPDATE `mc_plugins_gmap_config` SET `config_value` = '2.0' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;
