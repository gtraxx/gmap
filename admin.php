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
class plugins_gmap_admin extends database_plugins_gmap{
    protected $message,$template,$country,$translation;
	public 
	/**
	 * Ajouter ou modifier une carte
	 */
	$getlang,$action,$subaction,$edit,$tab,
        $delete,
    $api_key,
	$name_map,
	$content_map,
	/**
	 * Les données de configuration par défaut ou adresse de base du plugins
	 */
	$society_map,
	$adress_map,
	$postcode_map,
	$city_map,
	$country_map,
	$marker,
	$route_map,$multi_marker,
	$lat_map,
	$lng_map,$link_map,
	/**
	 * Paramètre pour la suppresion d'une carte
	 */
	$deletemap;
	/**
	 * Carte relative
	 * 
	 */
	public
	$society_ga,
	$adress_ga,
	$postcode_ga,
	$city_ga,
	$country_ga,
	$lat_ga,
	$lng_ga,$link_ga,$delete_rel_map,$id;
    public static $notify = array('plugin'=>'true','template'=>'message-gmap.tpl','method'=>'display','assignFetch'=>'notifier');
	/**
	 * Construct class
	 */
	public function __construct(){
        if(class_exists('backend_model_message')){
            $this->message = new backend_model_message();
        }
        $this->template = new backend_controller_plugins();
        $this->country = new backend_controller_country();
        $this->translation = new backend_controller_template();
        //Global
        if(magixcjquery_filter_request::isGet('action')){
            $this->action = magixcjquery_form_helpersforms::inputClean($_GET['action']);
        }
        if(magixcjquery_filter_request::isGet('subaction')){
            $this->subaction = magixcjquery_form_helpersforms::inputClean($_GET['subaction']);
        }
        if(magixcjquery_filter_request::isGet('getlang')){
            $this->getlang = magixcjquery_filter_isVar::isPostNumeric($_GET['getlang']);
        }
        if(magixcjquery_filter_request::isGet('edit')){
            $this->edit = magixcjquery_filter_isVar::isPostNumeric($_GET['edit']);
        }
        if(magixcjquery_filter_request::isGet('tab')){
            $this->tab = magixcjquery_form_helpersforms::inputClean($_GET['tab']);
        }
        //Formulaire
        if(magixcjquery_filter_request::isPost('api_key')){
            $this->api_key = magixcjquery_form_helpersforms::inputClean($_POST['api_key']);
        }
        if(magixcjquery_filter_request::isGet('id')){
            $this->id = magixcjquery_form_helpersforms::inputClean($_GET['id']);
        }
		if(magixcjquery_filter_request::isPost('name_map')){
			$this->name_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['name_map']);
		}
		if(magixcjquery_filter_request::isPost('content_map')){
			$this->content_map = (string) magixcjquery_form_helpersforms::inputCleanQuote($_POST['content_map']);
		}
		if(magixcjquery_filter_request::isPost('society_map')){
			$this->society_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['society_map']);
		}
		if(magixcjquery_filter_request::isPost('adress_map')){
			$this->adress_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['adress_map']);
		}
		if(magixcjquery_filter_request::isPost('postcode_map')){
			$this->postcode_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['postcode_map']);
		}
		if(magixcjquery_filter_request::isPost('city_map')){
			$this->city_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['city_map']);
		}
		if(magixcjquery_filter_request::isPost('country_map')){
			$this->country_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['country_map']);
		}
		if(magixcjquery_filter_request::isPost('lat_map')){
			$this->lat_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['lat_map']);
		}
		if(magixcjquery_filter_request::isPost('lng_map')){
			$this->lng_map = (string) magixcjquery_form_helpersforms::inputClean($_POST['lng_map']);
		}
        if(magixcjquery_filter_request::isPost('link_map')){
            $this->link_map = magixcjquery_form_helpersforms::inputClean($_POST['link_map']);
        }
		if(magixcjquery_filter_request::isPost('marker')){
			$this->marker = (string) magixcjquery_form_helpersforms::inputClean($_POST['marker']);
		}
		if(magixcjquery_filter_request::isPost('route_map')){
			$this->route_map = '1';
		}
		if(magixcjquery_filter_request::isPost('multi_marker')){
			$this->multi_marker = '1';
		}
        # DELETE PAGE
		if(magixcjquery_filter_request::isPost('deletemap')){
			$this->deletemap = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['deletemap']);
		}
		//Carte relative
		if(magixcjquery_filter_request::isPost('society_ga')){
			$this->society_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['society_ga']);
		}
		if(magixcjquery_filter_request::isPost('adress_ga')){
			$this->adress_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['adress_ga']);
		}
		if(magixcjquery_filter_request::isPost('postcode_ga')){
			$this->postcode_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['postcode_ga']);
		}
		if(magixcjquery_filter_request::isPost('city_ga')){
			$this->city_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['city_ga']);
		}
		if(magixcjquery_filter_request::isPost('country_ga')){
			$this->country_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['country_ga']);
		}
		if(magixcjquery_filter_request::isPost('lat_ga')){
			$this->lat_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['lat_ga']);
		}
		if(magixcjquery_filter_request::isPost('lng_ga')){
			$this->lng_ga = (string) magixcjquery_form_helpersforms::inputClean($_POST['lng_ga']);
		}
        if(magixcjquery_filter_request::isPost('link_ga')){
            $this->link_ga = magixcjquery_form_helpersforms::inputClean($_POST['link_ga']);
        }
		if(magixcjquery_filter_request::isPost('delete_rel_map')){
			$this->delete_rel_map = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['delete_rel_map']);
		}
	}

    /**
     * @access private
     * Installation des tables mysql du plugin
     */
    private function install_table($create){
        if(parent::c_show_table() == 0){
            $create->db_install_table('db.sql', 'request/install.tpl');
        }else{
            $magixfire = new magixcjquery_debug_magixfire();
            //$magixfire->magixFireInfo('Les tables mysql sont installés', 'Statut des tables mysql du plugin');
            return true;
        }
    }
	/**
	 * @access private
	 * Retourne le chemin du fichier XML de gmap
	 */
	private function load_local_file(){
		return magixglobal_model_system::base_path().'/plugins/gmap/version.xml';
	}
	/**
	 * @access private
	 * Lit le numéro de version dans le fichier XML du plugin gmap
	 */
	private function read_local_version(){
		try {
			$xml = new SimpleXMLElement(self::load_local_file(),0, TRUE);
			$v = $xml->number;
		} catch (Exception $e){
			magixglobal_model_system::magixlog('An error has occured :',$e);
		}
		return $v;
	}
	/**
	 * @access private
	 * Effectue le controle pour la migration vers une version supérieur
	 */
	private function upgrade_version(){
		$config= parent::fetch(array(
            'context'   =>  'one',
            'type'      =>  'config',
            'id'        =>   'gmap_version'
        ));
		if($config['config_value'] == null){
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.tpl');
		}elseif($config['config_value'] == '1.0'){
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.tpl');
		}elseif($config['config_value'] < $this->read_local_version()){
			backend_controller_plugins::create()->db_install_table('update_'.$this->read_local_version().'.sql', 'request/update.tpl');
		}else{
			//magixcjquery_debug_magixfire::magixFireInfo('Les tables mysql sont installés', 'Statut des tables mysql du plugin');
			return true;
		}
	}

    /**
     * @access private
     * Charge les données d'une carte pour l'édition
     */
	private function getData(){
		$data = parent::fetch(array(
            'context'   =>  'one',
            'type'      =>  'page',
            'edit'      =>  $this->edit
        ));
        $this->template->assign('getData',
            array(
                'name_map'      =>  $data['name_map'],
                'content_map'   =>  $data['content_map']
            )
        );
	}

	/**
	 * @access private
	 * Parcour le dossier marker dans le plugin pour retourner un tableau des images
	 */
	private function findMarker(){
		$makefile = new magixcjquery_files_makefiles();
		$markerCollection = $makefile->scanDir(magixglobal_model_system::base_path().'/plugins/gmap/markers/');
        $this->template->assign('markerCollection',$markerCollection);
	}
	/**
	 * @access private
	 * Charge les données de configuration pour l'édition
	 */
	private function setConfigData(){
		$config = parent::fetch(array(
            'context'   =>  'all',
            'type'      =>  'config'
        ));
        $configId = '';
        $configValue = '';
        foreach($config as $key){
            $configId[] = $key['config_id'];
            $configValue[] = $key['config_value'];
        }
        $setConfig = array_combine($configId,$configValue);
        $this->template->assign('getConfigData',$setConfig);
	}

    /**
     * Retourne la liste des records
     * @param $type
     * @return array
     */
    public function setItemsData($type){
        if($type === 'page'){
            return parent::fetch(array(
                'context'   =>  'all',
                'type'      =>  $type,
                'idlang'    =>  $this->getlang
            ));
        }elseif($type === 'address'){
            return parent::fetch(array(
                'context'   =>  'all',
                'type'      =>  $type,
                'idgmap'    =>  $this->edit
            ));
        }
    }

    /**
     * @param $type
     */
    public function getItemsData($type){
        $data = $this->setItemsData($type);
        $this->template->assign('getItemsData',$data);
    }

    /**
     * Retourne le dernier record
     * @param $type
     * @return array
     */
    private function setLastItemData($type){
        if($type === 'page') {
            return parent::fetch(array(
                'context' => 'all',
                'type' => 'lastPage',
                'idlang' => $this->getlang
            ));
        }elseif($type === 'address'){
            return parent::fetch(array(
                'context'   =>  'all',
                'type'      =>  'lastAddress',
                'idgmap'    =>  $this->edit
            ));
        }
    }

    /**
     * @param $type
     */
    private function getLastItemData($type){
        $data = $this->setLastItemData($type);
        $this->template->assign('getItemsData',$data);
    }

    /**
     * @access private
     * Charge les données d'un marker pour l'édition (Multi marker uniquement)
     */
    private function getAddressData(){
        $data = parent::fetch(array(
            'context'   =>  'one',
            'type'      =>  'address',
            'id'      =>  $this->id
        ));
        $this->template->assign('getAddressData',
            $data
        );
    }
    /**
     * Execute la sauvegarde des données
     * @param $data
     */
    private function save($data){
        switch($data['context']){
            case 'add':
                if($data['type'] === 'page'){
                    if(isset($this->name_map)){
                        if(!empty($this->name_map)){
                            parent::add(array(
                                'type'      =>'page',
                                'idlang'    =>$this->getlang,
                                'name'      =>$this->name_map,
                                'content'   =>$this->content_map
                            ));
                            $this->getLastItemData('page');
                            $this->message->json_post_response(true,'save',$this->template->fetch('loop/items-page.tpl'),self::$notify);
                        }
                    }
                }elseif($data['type'] === 'address'){
                    if(isset($this->adress_ga)){
                        if(!empty($this->adress_ga)){
                            parent::add(array(
                                'type'      =>'address',
                                'edit'		=>	$this->edit,
                                'society'	=>	$this->society_ga,
                                'address'	=>	$this->adress_ga,
                                'postcode'	=>	$this->postcode_ga,
                                'city'		=>	$this->city_ga,
                                'country'	=>	$this->country_ga,
                                'lat'		=>	$this->lat_ga,
                                'lng'		=>	$this->lng_ga,
                                'link'		=>	$this->link_ga
                            ));
                            $this->getLastItemData('address');
                            $this->message->json_post_response(true,'save',$this->template->fetch('loop/items-address.tpl'),self::$notify);
                        }
                    }
                }
                break;
            case 'update':
                if($data['type'] === 'config'){
                    if(isset($this->lat_map) AND isset($this->lng_map)){
                        if(!empty($this->marker)){
                            $marker = $this->marker;
                        }else{
                            $marker = null;
                        }
                        if(!isset($this->route_map)){
                            $route_map = '0';
                        }else{
                            $route_map = $this->route_map;
                        }
                        if(!isset($this->multi_marker)){
                            $multi_marker = '0';
                        }else{
                            $multi_marker = $this->multi_marker;
                        }
                        parent::update(array(
                            'type'      =>  'config',
                            'marker'	=>	$marker,
                            'multi'	    =>	$multi_marker,
                            'route'	    =>	$route_map,
                            'api'	    =>	$this->api_key,
                            'society'	=>	$this->society_map,
                            'address'	=>	$this->adress_map,
                            'postcode'	=>	$this->postcode_map,
                            'city'		=>	$this->city_map,
                            'country'	=>	$this->country_map,
                            'lat'		=>	$this->lat_map,
                            'lng'		=>	$this->lng_map,
                            'link'		=>	$this->link_map
                        ));
                        $this->message->getNotify('update');
                    }
                }elseif($data['type'] === 'page'){
                    if(isset($this->name_map)){
                        parent::update(array(
                            'type'      =>  'page',
                            'edit'      =>  $this->edit,
                            'name'      =>$this->name_map,
                            'content'   =>$this->content_map
                        ));
                        $this->message->getNotify('update');
                    }
                }elseif($data['type'] === 'address'){
                    if(isset($this->adress_ga)) {
                        parent::update(array(
                            'type'     => 'address',
                            'id'       => $this->id,
                            'society'  => $this->society_ga,
                            'address'  => $this->adress_ga,
                            'postcode' => $this->postcode_ga,
                            'city'     => $this->city_ga,
                            'country'  => $this->country_ga,
                            'lat'      => $this->lat_ga,
                            'lng'      => $this->lng_ga,
                            'link'		=>	$this->link_ga
                        ));
                        $this->message->getNotify('update');
                    }
                }
                break;
        }
    }
    /**
     * Suppression de l'enregistrement
     * @access private
     * @param $type
     * @param $id
     */
    private function delete($type,$id){
        if(isset($id)){
            parent::remove(array(
                'type'=>$type,
                'id'=>$id
            ));
        }
    }
	/**
	 * Affiche les pages de l'administration du plugin
	 * @access public
	 */
	public function run(){
        $header= new magixglobal_model_header();
		//Installation des tables mysql
        if(self::install_table($this->template) == true){
            if(magixcjquery_filter_request::isGet('getlang')){
                if(self::upgrade_version() === true){
                    $this->translation->addConfigFile(
                        array(
                            'country/tools'
                        ),array(
                        'country_iso_',
                    ),false
                    );
                    if($this->tab == 'config'){
                        if(isset($this->lat_map)){
                            $this->save(array(
                                'context'   => 'update',
                                'type'      =>'config'
                            ));
                        }else{
                            $this->setConfigData();
                            $this->template->assign('countryTools',$this->country->setItemsData());
                            $this->findMarker();
                            // Retourne la page index.tpl
                            $this->template->display('list.tpl');
                        }
                    }elseif($this->tab == 'about'){
                        $this->template->display('about.tpl');
                    }else{
                        if(isset($this->action)){
                            if($this->action == 'list'){
                                // Retourne la page index.tpl
                                $this->getItemsData('page');
                                $this->template->display('list.tpl');
                            }elseif($this->action == 'add'){
                                if(isset($this->name_map)){
                                    $header->set_json_headers();
                                    $this->save(array(
                                        'context'   => 'add',
                                        'type'      =>'page'
                                    ));
                                }
                            }elseif($this->action == 'edit'){
                                if(isset($this->edit)){
                                    if(isset($this->name_map)){
                                        $this->save(array(
                                            'context'   => 'update',
                                            'type'      =>'page'
                                        ));
                                    }elseif($this->tab == 'multimarkers'){
                                        if(isset($this->id)){
                                            if(isset($this->adress_ga)){
                                                $this->save(array(
                                                    'context'   => 'update',
                                                    'type'      =>'address'
                                                ));
                                            }else{
                                                $this->getAddressData();
                                                $this->template->assign('countryTools',$this->country->setItemsData());
                                                $this->template->display('edit.tpl');
                                            }
                                        }else{
                                            if(isset($this->adress_ga)){
                                                $header->set_json_headers();
                                                $this->save(array(
                                                    'context'   => 'add',
                                                    'type'      =>'address'
                                                ));
                                            }else{
                                                $this->getData();
                                                $this->getItemsData('address');
                                                $this->template->assign('countryTools',$this->country->setItemsData());
                                                $this->template->display('edit.tpl');
                                            }
                                        }
                                    }else{
                                        $this->getData();
                                        $this->template->display('edit.tpl');
                                    }
                                }
                            }elseif($this->action == 'remove'){
                                if(isset($this->deletemap)){
                                    $this->delete('page',$this->deletemap);
                                }elseif(isset($this->delete_rel_map)){
                                    $this->delete('address',$this->delete_rel_map);
                                }
                            }
                        }
                    }
                }else{
                    // Retourne la page index.tpl
                    $this->template->display('list.tpl');
                }
            }
        }
	}
	/**
	 * @access public
	 * Options de reecriture des métas
	 */
	public function seo_options(){
		return $options_string = array(
			'plugins'=>true
		);
	}
    //Set icon pour le menu
    /*public function set_icon(){
        $icon = array(
            'type'=>'image',
            'name'=>'icon.png'
        );
        return $icon;
    }*/
    public function setConfig(){
        return array(
            'url'=> array(
                'lang'=>'list',
                'action'=>'list'
            )
        );
    }
	//SITEMAP
	private function lastmod_dateFormat(){
		$dateformat = new magixglobal_model_dateformat();
		return $dateformat->sitemap_lastmod_dateFormat();
	}
	/**
	 * @access public
	 * Options de reecriture des sitemaps NEWS
	 */
	public function sitemap_rewrite_options(){
		return $options_string = array(
			'index'=>true,
			'level1'=>false,
			'level2'=>false,
			'records'=>false
		);
	}

    /**
     * URL index du module suivant la langue
     * @param $idlang
     */
    public function sitemap_uri_index($idlang){
        $sitemap = new magixcjquery_xml_sitemap();
        // Table des langues
        $lang = new backend_db_block_lang();
        // Retourne le code ISO
        $db = $lang->s_data_iso($idlang);
        if($db != null){
            $sitemap->writeMakeNode(
                magixcjquery_html_helpersHtml::getUrl().magixglobal_model_rewrite::filter_plugins_root_url(
                    $db['iso'],
                    'gmap',
                    true)
                ,
                $this->lastmod_dateFormat(),
                'always',
                0.7
            );
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
     * fetch Data
     * @param $data
     * @return array
     */
    protected function fetch($data){
        if(is_array($data)){
            if($data['context'] === 'all'){
                if(($data['type'] === 'config')){
                    $sql = 'SELECT conf.* FROM mc_plugins_gmap_config AS conf';
                    return magixglobal_model_db::layerDB()->select($sql);
                }
                elseif(($data['type'] === 'page')){
                    //Selectionne les cartes dans la langue
                    $sql = 'SELECT map.*,lang.iso
                FROM mc_plugins_gmap AS map
                JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
                WHERE map.idlang = :idlang';
                    return magixglobal_model_db::layerDB()->select($sql,array(
                        ':idlang'=>$data['idlang']
                    ));
                }
                elseif(($data['type'] === 'address')){
                    $sql = 'SELECT addr.* FROM mc_plugins_gmap_adress AS addr
		            WHERE addr.idgmap = :idgmap';
                    return magixglobal_model_db::layerDB()->select($sql,array(
                        ':idgmap'=>$data['idgmap']
                    ));
                }
                elseif($data['type'] === 'lastPage'){
                    $sql = 'SELECT map.*,lang.iso
                FROM mc_plugins_gmap AS map
                JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
                WHERE map.idlang = :idlang ORDER BY idgmap DESC LIMIT 0,1';
                    return magixglobal_model_db::layerDB()->select($sql,array(
                        ':idlang'=>$data['idlang']
                    ));
                }
                elseif($data['type'] === 'lastAddress'){
                    $sql = 'SELECT addr.* FROM mc_plugins_gmap_adress AS addr
		            WHERE addr.idgmap = :idgmap ORDER BY id_adress DESC LIMIT 0,1';
                    return magixglobal_model_db::layerDB()->select($sql,array(
                        ':idgmap'=>$data['idgmap']
                    ));
                }

            }elseif($data['context'] === 'one'){
                if($data['type'] === 'page'){
                    //Selectionne la carte pour édition
                    $sql = 'SELECT map.* FROM mc_plugins_gmap AS map
		            WHERE map.idgmap = :edit';
                    return magixglobal_model_db::layerDB()->selectOne($sql,array(
                        ':edit'	=>	$data['edit']
                    ));
                }elseif(($data['type'] === 'config')){
                    $sql ='SELECT conf.* FROM mc_plugins_gmap_config AS conf
		            WHERE config_id = :config_id';
                    return magixglobal_model_db::layerDB()->selectOne($sql,array(
                        ':config_id'=>$data['id']
                    ));
                }elseif(($data['type'] === 'address')){
                    $sql ='SELECT addr.* FROM mc_plugins_gmap_adress AS addr
		            WHERE addr.id_adress = :id';
                    return magixglobal_model_db::layerDB()->selectOne($sql,array(
                        ':id'=> $data['id']
                    ));
                }
            }
        }
    }

    /**
     * Ajoute un enregistrement
     * @param $data
     */
    protected function add($data){
        if(is_array($data)) {
            if (($data['type'] === 'page')) {
                $sql = 'INSERT INTO mc_plugins_gmap (idlang,name_map,content_map) 
		        VALUE(:idlang,:name_map,:content_map)';
                magixglobal_model_db::layerDB()->insert($sql,array(
                    ':idlang'		=>	$data['idlang'],
                    ':name_map'		=>	$data['name'],
                    ':content_map'	=>	$data['content']
                ));
            }elseif($data['type'] === 'address'){
                $sql = 'INSERT INTO mc_plugins_gmap_adress (society_ga,adress_ga,postcode_ga,city_ga,country_ga,lat_ga,lng_ga,link_ga,idgmap)
		        VALUE(:society_ga,:adress_ga,:postcode_ga,:city_ga,:country_ga,:lat_ga,:lng_ga,:link_ga,:edit)';
                magixglobal_model_db::layerDB()->insert($sql,array(
                    ':edit'		    =>	$data['edit'],
                    ':society_ga'	=>	$data['society'],
                    ':adress_ga'	=>	$data['address'],
                    ':postcode_ga'	=>	$data['postcode'],
                    ':city_ga'		=>	$data['city'],
                    ':country_ga'	=>	$data['country'],
                    ':lat_ga'		=>	$data['lat'],
                    ':lng_ga'		=>	$data['lng'],
                    ':link_ga'		=>	$data['link']
                ));
            }
        }
    }

    /**
     * Mise a jour des données
     * @param $data
     */
    protected function update($data){
        if(is_array($data)) {
            if (($data['type'] === 'page')) {
                $sql = 'UPDATE mc_plugins_gmap 
                SET name_map=:name_map,content_map=:content_map
		        WHERE idgmap = :edit';
                magixglobal_model_db::layerDB()->update($sql,array(
                    ':edit'		    =>	$data['edit'],
                    ':name_map'		=>	$data['name'],
                    ':content_map'	=>	$data['content']
                ));
            }elseif($data['type'] === 'config'){
                $sql=array(
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['society'].'" WHERE config_id = "society_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['address'].'" WHERE config_id = "adress_map"',
                    'UPDATE mc_plugins_gmap_config  
			SET config_value="'.$data['postcode'].'" WHERE config_id = "postcode_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['city'].'" WHERE config_id = "city_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['country'].'" WHERE config_id = "country_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['multi'].'" WHERE config_id = "multi_marker"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['marker'].'" WHERE config_id = "marker"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['route'].'" WHERE config_id = "route_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['api'].'" WHERE config_id = "api_key"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['lat'].'" WHERE config_id = "lat_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['lng'].'" WHERE config_id = "lng_map"',
                    'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$data['link'].'" WHERE config_id = "link_map"'
                );
                magixglobal_model_db::layerDB()->transaction($sql);
            }elseif($data['type'] === 'address'){
                $sql = 'UPDATE mc_plugins_gmap_adress 
                SET society_ga=:society_ga,adress_ga=:adress_ga,postcode_ga=:postcode_ga,city_ga=:city_ga,country_ga=:country_ga,lat_ga=:lat_ga,lng_ga=:lng_ga,link_ga=:link_ga
		        WHERE id_adress = :id';
                magixglobal_model_db::layerDB()->update($sql,array(
                    ':id'		    =>	$data['id'],
                    ':society_ga'	=>	$data['society'],
                    ':adress_ga'	=>	$data['address'],
                    ':postcode_ga'	=>	$data['postcode'],
                    ':city_ga'		=>	$data['city'],
                    ':country_ga'	=>	$data['country'],
                    ':lat_ga'		=>	$data['lat'],
                    ':lng_ga'		=>	$data['lng'],
                    ':link_ga'		=>	$data['link']
                ));
            }
        }
    }

    /**
     * @param $data
     */
	protected function remove($data){
        if(is_array($data)){
            if(($data['type'] === 'page')){
                $sql = 'DELETE FROM mc_plugins_gmap WHERE idgmap = :id';
                magixglobal_model_db::layerDB()->delete($sql,
                    array(
                        ':id'=>$data['id']
                    )
                );
            }elseif(($data['type'] === 'address')){
                $sql = 'DELETE FROM mc_plugins_gmap_adress WHERE id_adress = :id';
                magixglobal_model_db::layerDB()->delete($sql,
                    array(
                        ':id'=>$data['id']
                    )
                );
            }
        }
    }
}