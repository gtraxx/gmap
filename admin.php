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
 * @copyright  MAGIX CMS Copyright (c) 2010 Gerits Aurelien, 
 * http://www.magix-cms.com, http://www.magix-cjquery.com
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    1.5
 * @id  $Id: admin.php 32 2011-08-10 15:10:00Z aurelien $  
 * @rev $Rev: 32 $ 
 * @author Gérits Aurélien <aurelien@magix-cms.com>|<contact@magix-dev.be> , jean-baptiste demonte (http://gmap3.net/)
 * @name gmap
 * La géolocalisation avec Googlemap (gmap3)
 *
 */
class plugins_gmap_admin extends database_plugins_gmap{
	public 
	/**
	 * Ajouter ou modifier une carte
	 */
	$idlang,
	$name_map,
	$content_map,
	/**
	 * Les données de configuration par défaut ou adresse de base du plugins
	 */
	$society_map,
	$adress_map,
	$city_map,
	$country_map,
	$marker,
	$route_map,$multi_marker,
	$lat_map,
	$lng_map,
	/**
	 * Paramètre pour l'édition d'une carte
	 */
	$editmap,
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
	$city_ga,
	$country_ga,
	$lat_ga,
	$lng_ga,$delete_rel_map;
	/**
	 * Construct class
	 */
	public function __construct(){
		if(magixcjquery_filter_request::isPost('idlang')){
			$this->idlang = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['idlang']);
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
		if(magixcjquery_filter_request::isPost('marker')){
			$this->marker = (string) magixcjquery_form_helpersforms::inputClean($_POST['marker']);
		}
		if(magixcjquery_filter_request::isPost('route_map')){
			$this->route_map = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['route_map']);
		}
		if(magixcjquery_filter_request::isPost('multi_marker')){
			$this->multi_marker = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['multi_marker']);
		}
		if(magixcjquery_filter_request::isGet('editmap')){
			$this->editmap = (integer) magixcjquery_filter_isVar::isPostNumeric($_GET['editmap']);
		}
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
		if(magixcjquery_filter_request::isPost('delete_rel_map')){
			$this->delete_rel_map = (integer) magixcjquery_filter_isVar::isPostNumeric($_POST['delete_rel_map']);
		}
	}
	/**
	 * @access private
	 * Installation des tables mysql du plugin
	 */
	private function install_table(){
		if(parent::c_show_table() == 0){
			backend_controller_plugins::create()->db_install_table('db.sql', 'request/install.phtml');
		}else{
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
		$config = parent::s_uniq_map_config('gmap_version');
		if($config['config_value'] == null){
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.phtml');
		}elseif($config['config_value'] == '1.0'){
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.phtml');
		}elseif($config['config_value'] < $this->read_local_version()){
			backend_controller_plugins::create()->db_install_table('update_'.$this->read_local_version().'.sql', 'request/update.phtml');
		}else{
			//magixcjquery_debug_magixfire::magixFireInfo('Les tables mysql sont installés', 'Statut des tables mysql du plugin');
			return true;
		}
	}
	/**
	 * @access private
	 * Retourne les cartes ajoutés sous format JSON
	 */
	private function json_map_record(){
		if(parent::s_map() != null){
			foreach (parent::s_map() as $s){
				if($s['content_map'] != ''){
					$content = 1;
				}else{
					$content = 0;
				}
				$map[]= '{"idgmap":'.json_encode($s['idgmap']).',"lang":'.json_encode($s['iso']).
				',"pseudo":'.json_encode($s['pseudo']).',"name_map":'.json_encode($s['name_map']).',"content_map":'.$content.'}';
			}
			print '['.implode(',',$map).']';
		}
	}
	/**
	 * @access private
	 * Insertion d'une nouvelle carte
	 */
	private function insert_new_map(){
		if(isset($this->idlang) AND isset($this->name_map)){
			if(empty($this->idlang) AND empty($this->name_map)){
				backend_controller_plugins::create()->append_display('request/empty.phtml');
			}elseif(parent::s_verify_MapLang($this->idlang) != null){
				backend_controller_plugins::create()->append_display('request/record_exist.phtml');
			}else{
				$this->i_new_map(
					backend_model_member::s_idadmin(), 
					$this->idlang,
					$this->name_map,
					$this->content_map
				);
				backend_controller_plugins::create()->append_display('request/success_new_map.phtml');
			}
		}
	}
	/**
	 * @access private
	 * Charge les données d'une carte pour l'édition
	 * @param integer $editmap
	 */
	private function load_updatemap($editmap){
		$mapedit = parent::s_map_edit($editmap);
		backend_controller_plugins::create()->append_assign('name_map',$mapedit['name_map']);
		backend_controller_plugins::create()->append_assign('content_map',$mapedit['content_map']);
	}
	/**
	 * @access private
	 * POST une modification de carte
	 * @param integer $editmap
	 */
	private function post_edit_map($editmap){
		if(isset($editmap)){
			parent::u_map_record(
				backend_model_member::s_idadmin(), 
				$this->name_map, 
				$this->content_map, 
				$editmap
			);
			backend_controller_plugins::create()->append_display('request/success_update_map.phtml');
		}
	}
	/**
	 * @access private
	 * Parcour le dossier marker dans le plugin pour retourner les images
	 */
	private function find_marker(){
		$makefile = new magixcjquery_files_makefiles();
		$marker = $makefile->scanDir(magixglobal_model_system::base_path().'/plugins/gmap/markers/');
		$mconfig= parent::s_uniq_map_config('marker');
		$icon = '<ul>';
		foreach($marker as $m){
			if($m == $mconfig['config_value']){
				$icon .= '<li style="display:inline-block;"><input type="radio" name="marker" checked="checked" value="'.$m.'" /><img alt="marker" src="/plugins/gmap/markers/'.$m.'" /></li>';
			}else{
				$icon .= '<li style="display:inline-block;"><input type="radio" name="marker" value="'.$m.'" /><img alt="marker" src="/plugins/gmap/markers/'.$m.'" /></li>';
			}
			
		}
		$icon .= '</ul>';
		return $icon;
	}
	/**
	 * @access private
	 * Charge les données de configuration pour l'édition
	 */
	private function load_map_config($create){
		$config = parent::s_map_config();
		$create->append_assign('society_map',$config[0]['config_value']);
		$create->append_assign('adress_map',$config[1]['config_value']);
		$create->append_assign('country_map',$config[2]['config_value']);
		$create->append_assign('city_map',$config[3]['config_value']);
		$create->append_assign('route_map',$config[5]['config_value']);
		$create->append_assign('lat_map',$config[6]['config_value']);
		$create->append_assign('lng_map',$config[7]['config_value']);
		$create->append_assign('gmap_version',$config[8]['config_value']);
		$create->append_assign('multi_marker',$config[9]['config_value']);
	}
	/**
	 * @access private
	 * Modification des données de configuration du plugin
	 */
	private function update_gmap_config($create){
		if(isset($this->lat_map) AND isset($this->lng_map)){
			if(empty($this->lat_map) AND empty($this->lng_map)){
				backend_controller_plugins::create()->append_display('request/empty.phtml');
			}else{
				parent::u_config_map(
					$this->society_map, 
					$this->adress_map, 
					$this->city_map, 
					$this->country_map, 
					$this->marker, 
					$this->route_map,
					$this->multi_marker,
					$this->lat_map,
					$this->lng_map
				);
				$create->append_display('request/success_config.phtml');
			}
		}
	}
	/**
	 * Suppression de carte Googlemap
	 * @access private
	 * @param integer $deletemap
	 */
	private function delete_map($deletemap){
		if(isset($deletemap)){
			$this->d_map($deletemap);
		}
	}
	/**
	 * @access private
	 * Insertio d'une adresse relative à une carte
	 * @param integer $editmap
	 */
	private function insert_relative_map($editmap){
		if(isset($editmap)){
			if(empty($this->lat_ga) AND empty($this->lng_ga)){
				backend_controller_plugins::create()->append_display('request/empty.phtml');
			}else{
				parent::i_relative_map(
					$this->society_ga, 
					$this->adress_ga, 
					$this->city_ga, 
					$this->country_ga, 
					$this->lat_ga, 
					$this->lng_ga, 
					$editmap
				);
				backend_controller_plugins::create()->append_display('request/success_new_map.phtml');
			}
		}
	}
	/**
	 * @access private
	 * Retourne les adresses relative ajoutés sous format JSON
	 */
	private function json_map_relative(){
		if(parent::s_relative_map($this->editmap) != null){
			foreach (parent::s_relative_map($this->editmap) as $s){
				$map[]= '{"id_adress":'.json_encode($s['id_adress']).',"society_ga":'.json_encode($s['society_ga']).
				',"country_ga":'.json_encode($s['country_ga']).',"city_ga":'.json_encode($s['city_ga']).',"adress_ga":'.json_encode($s['adress_ga']).'}';
			}
			print '['.implode(',',$map).']';
		}
	}
	/**
	 * Suppression d'une adresse relative
	 * @access private
	 * @param integer $deletemap
	 */
	private function delete_relative_adress($delete_rel_map){
		if(isset($delete_rel_map)){
			$this->d_rel_adress($delete_rel_map);
		}
	}
	/**
	 * Affiche les pages de l'administration du plugin
	 * @access public
	 */
	public function run(){
		$header= new magixglobal_model_header();
		$create = backend_controller_plugins::create();
		//Installation des tables mysql
		if(self::install_table() == true){
			if(magixcjquery_filter_request::isGet('postassign')){
				$this->insert_new_map();
			}elseif(isset($this->editmap)){
				if(isset($this->name_map)){
					$this->post_edit_map($this->editmap);
				}elseif(isset($this->lat_ga) AND isset($this->lng_ga)){
					$this->insert_relative_map($this->editmap);
				}elseif(magixcjquery_filter_request::isGet('json_rel_map')){
					$header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
					$header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
					$header->pragma();
					$header->cache_control("nocache");
					$header->getStatus('200');
					$header->json_header("UTF-8");
					$this->json_map_relative();
				}else{
					$this->load_updatemap($this->editmap);
					$create->append_display('editmap.phtml');
				}
			}elseif(magixcjquery_filter_request::isGet('json_map_record')){
				$header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
				$header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
				$header->pragma();
				$header->cache_control("nocache");
				$header->getStatus('200');
				$header->json_header("UTF-8");
				$this->json_map_record();
			}elseif(magixcjquery_filter_request::isGet('updateconfig')){
				$this->update_gmap_config($create);
			}elseif(isset($this->deletemap)){
				$this->delete_map($this->deletemap);
			}elseif(isset($this->delete_rel_map)){
				$this->delete_relative_adress($this->delete_rel_map);
			}else{
				if(self::upgrade_version() == true){
					$this->load_map_config($create);
					$create->append_assign('markers',$this->find_marker());
					$create->append_assign('selectlang',backend_model_blockDom::select_language());
				}else{
					$this->upgrade_version();
				}
				$create->append_display('index.phtml');
			}
		}else{
			// Retourne la page index.phtml
			$create->append_display('index.phtml');
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
	 * @param string $lang
	 */
	public function sitemap_uri_index(){
		$sitemap = new magixcjquery_xml_sitemap();
       	$db = backend_db_block_lang::s_data_lang(true);
       	if($db != null){
       		foreach($db as $data){
	        	 $sitemap->writeMakeNode(
	        	 	magixcjquery_html_helpersHtml::getUrl().magixglobal_model_rewrite::filter_plugins_root_url($data['iso'], 'gmap',true),
		        	$this->lastmod_dateFormat(),
		        	'always',
		        	0.7
	        	 );
	        }
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
	 * Selectionne les cartes ou record
	 */
	protected function s_map(){
		$sql ='SELECT map.*,lang.iso,m.pseudo FROM mc_plugins_gmap AS map
		LEFT JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
		JOIN mc_admin_member as m ON ( map.idadmin = m.idadmin )';
		return magixglobal_model_db::layerDB()->select($sql);
	}
	/**
	 * @access protected
	 * Selectionne la carte pour édition
	 * @param integer $idgmap
	 */
	protected function s_map_edit($idgmap){
		$sql = 'SELECT map.* FROM mc_plugins_gmap AS map
		WHERE map.idgmap = :idgmap';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(':idgmap'=>$idgmap));
	}
	/**
	 * @access protected
	 * Vérifie si la carte existe dans la langue
	 * @param integer $idlang
	 */
	protected function s_verify_MapLang($idlang){
		$sql = 'SELECT map.*,lang.iso FROM mc_plugins_gmap AS map
		LEFT JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
		WHERE map.idlang = :idlang';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(':idlang'=>$idlang));
	}
	/**
	 * @access protected
	 * Retourne la configuration
	 * @param string $config_id
	 */
	protected function s_uniq_map_config($config_id){
		$sql ='SELECT conf.* FROM mc_plugins_gmap_config AS conf
		WHERE config_id = :config_id';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(':config_id'=>$config_id));
	}
	/**
	 * @access protected
	 * Selectionne la configuration complète
	 */
	protected function s_map_config(){
		$sql ='SELECT conf.* FROM mc_plugins_gmap_config AS conf';
		return magixglobal_model_db::layerDB()->select($sql);
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
	/**
	 * 
	 * @access protected
	 * Insert une nouvelle carte
	 * @param integer $idadmin
	 * @param integer $idlang
	 * @param string $name_map
	 * @param string $content_map
	 */
	protected function i_new_map($idadmin,$idlang,$name_map,$content_map){
		$sql = 'INSERT INTO mc_plugins_gmap (idadmin,idlang,name_map,content_map) 
		VALUE(:idadmin,:idlang,:name_map,:content_map)';
		magixglobal_model_db::layerDB()->insert($sql,array(
			':idadmin'		=>	$idadmin,
			':idlang'		=>	$idlang,
			':name_map'		=>	$name_map,
			':content_map'	=>	$content_map
		));
	}
	/**
	 * @access protected
	 * insertion d'une adresse relative
	 * @param string $society_ga
	 * @param string $adress_ga
	 * @param string $city_ga
	 * @param string $country_ga
	 * @param string $lat_ga
	 * @param string $lng_ga
	 * @param integer $idgmap
	 */
	protected function i_relative_map($society_ga,$adress_ga,$city_ga,$country_ga,$lat_ga,$lng_ga,$idgmap){
		$sql = 'INSERT INTO mc_plugins_gmap_adress (society_ga,adress_ga,city_ga,country_ga,lat_ga,lng_ga,idgmap) 
		VALUE(:society_ga,:adress_ga,:city_ga,:country_ga,:lat_ga,:lng_ga,:idgmap)';
		magixglobal_model_db::layerDB()->insert($sql,array(
			':society_ga'	=>	$society_ga,
			':adress_ga'	=>	$adress_ga,
			':city_ga'		=>	$city_ga,
			':country_ga'	=>	$country_ga,
			':lat_ga'		=>	$lat_ga,
			':lng_ga'		=>	$lng_ga,
			':idgmap'		=>	$idgmap
		));
	}
	/**
	 * @access protected
	 * Mise à jour de la carte
	 * @param integer $idadmin
	 * @param string $name_map
	 * @param string $content_map
	 * @param integer $idgmap
	 */
	protected function u_map_record($idadmin,$name_map,$content_map,$idgmap){
		$sql = 'UPDATE mc_plugins_gmap SET idadmin=:idadmin,name_map=:name_map,content_map=:content_map
		WHERE idgmap = :idgmap';
		magixglobal_model_db::layerDB()->update($sql,array(
			':idadmin'		=>	$idadmin,
			':name_map'		=>	$name_map,
			':content_map'	=>	$content_map,
			':idgmap'		=>	$idgmap
		));
	}
	/**
	 * @access protected
	 * Mise à jour de la configuration
	 * @param string $society_map
	 * @param string $adress_map
	 * @param string $city_map
	 * @param string $country_map
	 * @param string $marker
	 * @param string $route_map
	 * @param string $lat_map
	 * @param string $lng_map
	 */
	protected function u_config_map($society_map,$adress_map,$city_map,$country_map,$marker,$route_map,$multi_marker,$lat_map,$lng_map){
		$sql=array(
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$society_map.'" WHERE config_id = "society_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$adress_map.'" WHERE config_id = "adress_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$city_map.'" WHERE config_id = "city_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$country_map.'" WHERE config_id = "country_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$multi_marker.'" WHERE config_id = "multi_marker"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$marker.'" WHERE config_id = "marker"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$route_map.'" WHERE config_id = "route_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$lat_map.'" WHERE config_id = "lat_map"',
			'UPDATE mc_plugins_gmap_config 
			SET config_value="'.$lng_map.'" WHERE config_id = "lng_map"'
		);
        magixglobal_model_db::layerDB()->transaction($sql);
	}
	/**
	 * @access protected
	 * Suppression d'une carte
	 * @param integer $deletemap
	 */
	protected function d_map($deletemap){
		$sql = 'DELETE FROM mc_plugins_gmap WHERE idgmap = :deletemap';
		magixglobal_model_db::layerDB()->delete($sql,
			array(
			':deletemap'=>$deletemap
			)
		);
	}
	/**
	 * @access protected
	 * Suppression d'une adresse relative à une carte
	 * @param integer $deletemap
	 */
	protected function d_rel_adress($delete_rel_map){
		$sql = 'DELETE FROM mc_plugins_gmap_adress WHERE id_adress = :delete_rel_map';
		magixglobal_model_db::layerDB()->delete($sql,
			array(
			':delete_rel_map'=>$delete_rel_map
			)
		);
	}
}