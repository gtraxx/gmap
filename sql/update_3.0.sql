UPDATE `mc_plugins_gmap_config` SET `config_value` = '3.0' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;

ALTER TABLE `mc_plugins_gmap_adress` ADD `link_ga` VARCHAR( 200 ) NULL ;

INSERT INTO `mc_plugins_gmap_config` (`idgmapconfig`, `config_id`, `config_value`) VALUES (NULL, 'link_map', NULL);