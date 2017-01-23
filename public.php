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
class plugins_gmap_public extends database_plugins_gmap{
    protected $template;
	/**
	 * 
	 * paramètre pour la requête JSON
	 * @var uniqp
	 */
	public $json_multi_data;
	/**
	 * @access public
	 * Constructor
	 */
	function __construct(){
	    $this->template = new frontend_controller_plugins();
		if(magixcjquery_filter_request::isGet('json_multi_data')){
			$this->json_multi_data = (string) magixcjquery_form_helpersforms::inputClean($_GET['json_multi_data']);
		}
	}

    /**
     * @access private
     * Chargement des données de la carte
     * @param void $setData
     */
	private function setMapConfig($setData){
		$config = parent::fetch(array(
            'type'      =>  'config'
        ));
        $configId = '';
        $configValue = '';
        foreach($config as $key){
            $configId[] = $key['config_id'];
            $configValue[] = $key['config_value'];
        }
        $setConfig = array_combine($configId,$configValue);
        $setData = array(
            'name_map'      =>  $setData['name_map'],
            'content_map'   =>  $setData['content_map']
        );
        $dataMap = array_merge($setConfig, $setData);
        $this->template->assign('config_map',$dataMap);
	}

    /**
     * @param $setData
     * Retourne la configuration de gmap avec une requête JSON
     */
	private function json_related_adress($setData){
        $json = new magixglobal_model_json();
        $setAddress = parent::fetch(array(
            'type'      =>  'address',
            'id'    =>  $setData['idgmap']
        ));
		if($setAddress != null){
			foreach ($setAddress as $s){
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
        $header= new magixglobal_model_header();
        $this->template->assign('plugin_status',parent::c_show_table());
		$this->template->configLoad();
		if(parent::c_show_table() != 0){
			$setData = parent::fetch(array(
                'type'      =>  'page',
                'iso'    =>  $this->template->getLanguage()
            ));
			if($this->json_multi_data){
                $header->set_json_headers();
				$this->json_related_adress($setData);
			}else{
				$this->setMapConfig($setData);
                $getMapConfig = $this->template->fetch('map.tpl');
                $this->template->assign('getMapConfig',$getMapConfig);
                $this->template->display('index.tpl');
			}
		}else{
            $getMapConfig = $this->template->fetch('map.tpl');
            $this->template->assign('getMapConfig',$getMapConfig);
            $this->template->display('index.tpl');
		}
    }
}
class database_plugins_gmap
{
    /**
     * Vérifie si les tables du plugin sont installé
     * @access protected
     * return integer
     */
    protected function c_show_table()
    {
        $table = 'mc_plugins_gmap';
        return magixglobal_model_db::layerDB()->showTable($table);
    }

    /**
     * fetch Data
     * @param $data
     * @return array
     */
    protected function fetch($data)
    {
        if (is_array($data)) {
            if (($data['type'] === 'config')) {

                $sql = 'SELECT conf.* FROM mc_plugins_gmap_config AS conf';
                return magixglobal_model_db::layerDB()->select($sql);

            } elseif ($data['type'] === 'page') {

                $sql = 'SELECT map.* FROM mc_plugins_gmap AS map
                JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
                WHERE lang.iso = :iso';

                return magixglobal_model_db::layerDB()->selectOne($sql, array(':iso' => $data['iso']));
            } elseif ($data['type'] === 'address') {

                $sql = 'SELECT addr.* FROM mc_plugins_gmap_adress AS addr
		        WHERE addr.idgmap = :idgmap';

                return magixglobal_model_db::layerDB()->select($sql, array(':idgmap' => $data['id']));
            }
        }
    }
}