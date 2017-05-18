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
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# -- END LICENSE BLOCK -----------------------------------

require_once('db/gmap.php');

class plugins_gmap_public extends database_plugins_gmap {
    protected $template, $getlang;
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
	function __construct() {
	    $this->template = new frontend_controller_plugins();

		$currentLang = parent::getLangId($this->template->getLanguage());
		$this->getlang = $currentLang['idlang'];

		if($this->getlang == null) {
			$default = parent::getDefaultLang();
			$this->getlang = $default['idlang'];
		}
	}

	/**
	 * Retrieve and return the data
	 * @param string $context
	 * @param string $type
	 * @param string|int|null $id
	 * @return mixed
	 */
	private function getItems($type, $id = null, $context = 'all') {
		$params = array(':lang' => $this->getlang);

		if($id) {
			$params[':id'] = $id;
			$context = 'one';
		}

		$data = parent::fetchData(array('context'=>$context,'type'=>$type),$params);
		$this->template->assign($type,$data);
		return $data;
	}

    /**
	 * Load map data
     * @access private
     */
	private function setMapConfig() {
		$addresses = $this->getItems('addresses');
		$config = parent::fetchData(array('context' => 'all','type' => 'config'));

        $configId = '';
        $configValue = '';
        foreach($config as $key){
            $configId[] = $key['config_id'];
            $configValue[] = $key['config_value'];
        }
        $setConfig = array_combine($configId,$configValue);

		if($addresses != null) {
			$map = [];
			foreach ($addresses as $addr){
				$mark = '{';
				foreach ($addr as $k => $v) {
					$mark .= '"'.$k.'":'.json_encode($v).',';
				}
				$mark = substr($mark, 0, -1).'}';
				$map[] = $mark;
			}
			$setConfig['markers'] = '['.implode(',',$map).']';
		}
		else {
			$setConfig['markers'] = '[]';
		}

		$config = [];
		foreach ($setConfig as $k => $v) {
			if($k != 'markers')
				$v = json_encode($v);
			$config[]= $k.':'.$v;
		}
		$this->template->assign('config_gmap','{'.implode(',',$config).'}');
	}

	/**
	 * @access public
	 * Execute le plugin dans la partie public
	 */
	public function run() {
        $this->template->assign('plugin_status',parent::c_show_tables());
		$this->template->configLoad();

		if(parent::c_show_tables()) {
			$this->getItems('page',null,'one');
			$this->setMapConfig();
			$this->template->display('index.tpl');
		}
		else {
            $this->template->display('index.tpl');
		}
    }
}