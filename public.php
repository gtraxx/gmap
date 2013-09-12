<?php
# -- BEGIN LICENSE BLOCK ----------------------------------
#
# This file is part of Magix CMS.
# Magix CMS, a CMS optimized for SEO
# Copyright (C) 2010 - 2011  Gerits Aurelien <aurelien@magix-cms.com>
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# -- END LICENSE BLOCK -----------------------------------

/**
 * MAGIX CMS
 * @category   gmap 
 * @package    plugins
 * @copyright  MAGIX CMS Copyright (c) 2008 - 2013 Gerits Aurelien,
 * http://www.magix-cms.com,  http://www.magix-cjquery.com
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    2.0
 * @author Gérits Aurélien <aurelien@magix-cms.com> <aurelien@magix-dev.be>, jean-baptiste demonte (http://gmap3.net/)
 * @name gmap
 * La géolocalisation avec Googlemap (gmap3)
 *
 */
class plugins_gmap_public extends database_plugins_gmap{
	/**
	 * 
	 * paramètre pour la requête JSON
	 * @var uniqp
	 */
	public $jsondata,$json_multi_data;
	/**
	 * @access public
	 * Constructor
	 */
	function __construct(){
		if(magixcjquery_filter_request::isGet('jsondata')){
			$this->jsondata = (string) magixcjquery_form_helpersforms::inputClean($_GET['jsondata']);
		}
		if(magixcjquery_filter_request::isGet('json_multi_data')){
			$this->json_multi_data = (string) magixcjquery_form_helpersforms::inputClean($_GET['json_multi_data']);
		}
	}

	/**
	 * @access private
	 * Retourne la configuration de gmap avec une requête JSON
	 */
	private function json_map_record(){
		$config = parent::s_map_config();
        $json = new magixglobal_model_json();
		if($config != null){
			$map[]= '{"society":'.json_encode($config[0]['config_value']).',"adress":'.json_encode($config[1]['config_value']).
			',"country":'.json_encode($config[2]['config_value']).',"city":'.json_encode($config[3]['config_value']).
			',"marker":'.json_encode($config[4]['config_value']).',"route":'.json_encode($config[5]['config_value']).
			',"lat":'.json_encode($config[6]['config_value']).',"lng":'.json_encode($config[7]['config_value']).'}';
            $json->encode($map,array('[',']'));
		}
	}

    /**
     * @access private
     * Chargement des données de la carte
     * @param $create
     * @param void $loaddata
     */
	private function data_map($create,$loaddata){
		$config = parent::s_map_config();
        $create->assign('config_map',array(
            'name_map'      =>  $loaddata['name_map'],
            'content_map'   =>  $loaddata['content_map'],
            'society_map'   =>  $config[0]['config_value'],
            'adress_map'    =>  $config[1]['config_value'],
            'country_map'   =>  $config[2]['config_value'],
            'city_map'      =>  $config[3]['config_value'],
            'route_map'     =>  $config[5]['config_value'],
            'lat_map'       =>  $config[6]['config_value'],
            'lng_map'       =>  $config[7]['config_value'],
            'multi_marker'  =>  $config[9]['config_value']
        ));
	}
	/**
	 * @access private
	 * Retourne la configuration de gmap avec une requête JSON
	 */
	private function json_related_adress($loaddata){
        $json = new magixglobal_model_json();
		if(parent::s_relative_map($loaddata['idgmap']) != null){
			foreach (parent::s_relative_map($loaddata['idgmap']) as $s){
                $map[]= '{"latLng":['.$s['lat_ga'].','.$s['lng_ga'].']'.
                    ',"data":'.'{'.'"society":'.json_encode($s['society_ga']).
                    ',"country":'.json_encode($s['country_ga']).',"city":'.json_encode($s['city_ga']).',"adress":'
                    .json_encode($s['adress_ga']).'}}';
			}
			$json->encode($map,array('{"multi_adress":[',']}'));
		}else{
			print '[{"lat":null,"lng":null,"data":{"society":null,"country":null,"city":null,"adress":null}}]';
		}
	}
	/**
	 * @access public
	 * Execute le plugin dans la partie public
	 */
	public function run(){
		$create = frontend_controller_plugins::create();
        $header= new magixglobal_model_header();
        $create->assign('plugin_status',parent::c_show_table());
		$create->configLoad();
		if(parent::c_show_table() != 0){
			$loaddata = parent::s_map($create->getLanguage());
			if($this->jsondata){
                $header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
                $header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
                $header->pragma();
                $header->cache_control("nocache");
                $header->getStatus('200');
                $header->json_header("UTF-8");
				$this->json_map_record();
			}elseif($this->json_multi_data){
                $header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
                $header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
                $header->pragma();
                $header->cache_control("nocache");
                $header->getStatus('200');
                $header->json_header("UTF-8");
				$this->json_related_adress($loaddata);
			}else{
				$this->data_map($create,$loaddata);
                $map_data = $create->fetch('map.tpl');
                $create->assign('map_data',$map_data);
				$create->display('index.tpl');
			}
		}else{
            $map_data = $create->fetch('map.tpl');
            $create->assign('map_data',$map_data);
			$create->display('index.tpl');
		}
    }
}
class database_plugins_gmap{
	/**
	 * Vérifie si les tables du plugin sont installé
	 * @access protected
	 * return integer
	 */
	protected function c_show_table(){
		$table = 'mc_plugins_gmap';
		return magixglobal_model_db::layerDB()->showTable($table);
	}
	/**
	 * @access protected
	 * Récupère la configuration
	 */
	protected function s_map_config(){
		$sql ='SELECT conf.* FROM mc_plugins_gmap_config AS conf';
		return magixglobal_model_db::layerDB()->select($sql);
	}

    /**
     * @param $iso
     * @return array
     */
	protected function s_map($iso){
		$sql = 'SELECT map.* FROM mc_plugins_gmap AS map
		JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
		WHERE lang.iso = :iso';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(':iso'=>$iso));
	}

	/**
	 * @access protected
	 * Selectionne les cartes ou record
	 */
	protected function s_relative_map($idgmap){
		$sql ='SELECT addr.* FROM mc_plugins_gmap_adress AS addr
		WHERE addr.idgmap = :idgmap';
		return magixglobal_model_db::layerDB()->select($sql,array(':idgmap'=>$idgmap));
	}
}