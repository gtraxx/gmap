ALTER TABLE `mc_plugins_gmap` CHANGE `name_map` `name_map` TINYTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
INSERT INTO `mc_plugins_gmap_config` VALUES('lat_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('lng_map', NULL);
INSERT INTO `mc_plugins_gmap_config` VALUES('gmap_version', '1.1');