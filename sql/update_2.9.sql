UPDATE `mc_plugins_gmap_config` SET `config_value` = '2.9' WHERE `mc_plugins_gmap_config`.`config_id` = 'gmap_version' ;

ALTER TABLE `mc_plugins_gmap` DROP `idadmin` ;