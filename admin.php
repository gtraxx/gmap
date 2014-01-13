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
 * @copyright  MAGIX CMS Copyright (c) 2012 Gerits Aurelien, 
 * http://www.magix-cms.com, http://www.magix-cjquery.com, http://www.magix-dev.be
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    1.6
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
	$getlang,$action,$edit,$tab,
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
        //Global
        if(magixcjquery_filter_request::isGet('action')){
            $this->action = magixcjquery_form_helpersforms::inputClean($_GET['action']);
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
		$config= parent::s_config_data('gmap_version');
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
	 * Retourne les cartes ajoutés sous format JSON
	 */
	private function json_map_record(){
		if(parent::s_map($this->getlang) != null){
			foreach (parent::s_map($this->getlang) as $key){
				if($key['content_map'] != ''){
					$content = 1;
				}else{
					$content = 0;
				}
				$json[]= '{"idgmap":'.json_encode($key['idgmap']).',"lang":'.json_encode($key['iso']).
				',"pseudo":'.json_encode($key['pseudo']).',"name_map":'.json_encode($key['name_map']).
                ',"content_map":'.$content.'}';
			}
			print '['.implode(',',$json).']';
		}else{
            print '{}';
        }
	}
	/**
	 * @access private
	 * Insertion d'une nouvelle carte
	 */
	private function add_map($create){
		if(isset($this->name_map)){
			if(empty($this->name_map)){
                $create->display('request/empty.tpl');
			}elseif(parent::s_verify_lang($this->getlang) != null){
                $create->display('request/element_exist.tpl');
			}else{
				$this->i_new_map(
					backend_model_member::s_idadmin(), 
					$this->getlang,
					$this->name_map,
					$this->content_map
				);
                $create->display('request/success_add.tpl');
			}
		}
	}

    /**
     * @access private
     * Charge les données d'une carte pour l'édition
     * @param $create
     */
	private function load_map($create){
		$data = parent::s_map_data($this->edit);
        $create->assign('map',
            array(
                'name_map'      =>  $data['name_map'],
                'content_map'   =>  $data['content_map']
            )
        );
	}

    /**
     * @access private
     * POST une modification de carte
     * @param $create
     */
	private function update_map($create){
		if(isset($this->name_map)){
			parent::u_map_record(
				backend_model_member::s_idadmin(), 
				$this->name_map, 
				$this->content_map, 
				$this->edit
			);
            $create->display('request/success_update.tpl');
		}
	}
	/**
	 * @access private
	 * Parcour le dossier marker dans le plugin pour retourner les images
	 */
	private function find_marker(){
		$makefile = new magixcjquery_files_makefiles();
		$marker = $makefile->scanDir(magixglobal_model_system::base_path().'/plugins/gmap/markers/');
		$mconfig= parent::s_config_data('marker');
		$icon = '<ul class="list-unstyled list-inline">';
		foreach($marker as $m){
			if($m == $mconfig['config_value']){
				$icon .= '<li>';
				$icon .= '<input type="radio" name="marker" checked="checked" value="'.$m.'" />';
				$icon .= '<img alt="marker" src="/plugins/gmap/markers/'.$m.'" />';
				$icon .= '</li>';
			}else{
				$icon .= '<li>';
				$icon .= '<input type="radio" name="marker" value="'.$m.'" />';
				$icon .= '<img alt="marker" src="/plugins/gmap/markers/'.$m.'" />';
				$icon .= '</li>';
			}
			
		}
		$icon .= '</ul>';
		return $icon;
	}
	/**
	 * @access private
	 * Charge les données de configuration pour l'édition
	 */
	private function load_config($create){
		$config = parent::s_map_config();
        $create->assign('config',array(
            'society_map'   =>  $config[0]['config_value'],
            'adress_map'    =>  $config[1]['config_value'],
            'country_map'   =>  $config[2]['config_value'],
            'city_map'      =>  $config[3]['config_value'],
            'route_map'     =>  $config[5]['config_value'],
            'lat_map'       =>  $config[6]['config_value'],
            'lng_map'       =>  $config[7]['config_value'],
            'gmap_version'  =>  $config[8]['config_value'],
            'multi_marker'  =>  $config[9]['config_value']
        ));
	}
	/**
	 * @access private
	 * Modification des données de configuration du plugin
	 */
	private function update_config($create){
		if(isset($this->lat_map) AND isset($this->lng_map)){
			if(empty($this->lat_map) AND empty($this->lng_map)){
                $create->display('request/empty.tpl');
			}else{
                if(!empty($this->marker)){
                    $marker = $this->marker;
                }else{
                    $marker = null;
                }
				parent::u_config_map(
					$this->society_map, 
					$this->adress_map, 
					$this->city_map, 
					$this->country_map,
                    $marker,
					$this->route_map,
					$this->multi_marker,
					$this->lat_map,
					$this->lng_map
				);
				$create->display('request/success_update.tpl');
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
     * Insertion d'une adresse relative à une carte
     * @param $create
     */
    private function insert_relative_map($create){
		if(isset($this->adress_ga)){
			if(empty($this->lat_ga) AND empty($this->lng_ga)){
                $create->display('request/empty.tpl');
			}else{
				parent::i_relative_map(
                    $this->edit,
					$this->society_ga, 
					$this->adress_ga, 
					$this->city_ga, 
					$this->country_ga, 
					$this->lat_ga, 
					$this->lng_ga
				);
                $create->display('request/success_add.tpl');
			}
		}
	}
	/**
	 * @access private
	 * Retourne les adresses relative ajoutés sous format JSON
	 */
	private function json_map_relative(){
		if(parent::s_relative_map($this->edit) != null){
			foreach (parent::s_relative_map($this->edit) as $key){
				$map[]= '{"id_adress":'.json_encode($key['id_adress']).',"society_ga":'.json_encode($key['society_ga']).
				',"country_ga":'.json_encode($key['country_ga']).',"city_ga":'.json_encode($key['city_ga']).',"adress_ga":'.json_encode($key['adress_ga']).'}';
			}
			print '['.implode(',',$map).']';
		}else{
            print '{}';
        }
	}

    /**
     * Suppression d'une adresse relative
     * @access private
     * @param $delete_rel_map
     * @internal param int $deletemap
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
        $create = new backend_controller_plugins();
		//Installation des tables mysql
        if(self::install_table($create) == true){
            if(magixcjquery_filter_request::isGet('getlang')){
                if(self::upgrade_version() === true){
                    if($this->tab == 'config'){
                        if(isset($this->lat_map)){
                            $this->update_config($create);
                        }else{
                            $this->load_config($create);
                            $create->assign('markers',$this->find_marker());
                            // Retourne la page index.tpl
                            $create->display('list.tpl');
                        }
                    }elseif($this->tab == 'about'){
                        $create->display('about.tpl');
                    }else{
                        if(magixcjquery_filter_request::isGet('json_map_record')){
                            $header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
                            $header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
                            $header->pragma();
                            $header->cache_control("nocache");
                            $header->getStatus('200');
                            $header->json_header("UTF-8");
                            $this->json_map_record();
                        }else{
                            if(isset($this->action)){
                                if($this->action == 'list'){
                                    // Retourne la page index.tpl
                                    $create->display('list.tpl');
                                }elseif($this->action == 'add'){
                                    if(isset($this->name_map)){
                                        $this->add_map($create);
                                    }
                                }elseif($this->action == 'edit'){
                                    if(isset($this->edit)){
                                        if(isset($this->name_map)){
                                            $this->update_map($create);
                                        }elseif($this->tab == 'multimarkers'){
                                            if(magixcjquery_filter_request::isGet('json_map_relative')){
                                                $header->head_expires("Mon, 26 Jul 1997 05:00:00 GMT");
                                                $header->head_last_modified(gmdate( "D, d M Y H:i:s" ) . "GMT");
                                                $header->pragma();
                                                $header->cache_control("nocache");
                                                $header->getStatus('200');
                                                $header->json_header("UTF-8");
                                                $this->json_map_relative();
                                            }elseif(isset($this->adress_ga)){
                                                $this->insert_relative_map($create);
                                            }else{
                                                $this->load_map($create);
                                                $create->display('edit.tpl');
                                            }
                                        }else{
                                            $this->load_map($create);
                                            $create->display('edit.tpl');
                                        }
                                    }
                                }elseif($this->action == 'remove'){
                                    if(isset($this->deletemap)){
                                        $this->delete_map($this->deletemap);
                                    }elseif(isset($this->delete_rel_map)){
                                        $this->delete_relative_adress($this->delete_rel_map);
                                    }
                                }
                            }
                        }
                    }
                }else{
                    // Retourne la page index.tpl
                    $create->display('list.tpl');
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
	 * @access protected
	 * Selectionne les cartes dans la langue
	 */
	protected function s_map($getlang){
		$sql ='SELECT map.*,lang.iso,m.pseudo
        FROM mc_plugins_gmap AS map
		JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
		JOIN mc_admin_member as m ON ( map.idadmin = m.idadmin )
		WHERE map.idlang = :getlang';
        return magixglobal_model_db::layerDB()->select($sql,array(
            ':getlang'=>$getlang
        ));
	}

    /**
     * @access protected
     * Selectionne la carte pour édition
     * @param $edit
     * @return array
     */
	protected function s_map_data($edit){
		$sql = 'SELECT map.* FROM mc_plugins_gmap AS map
		WHERE map.idgmap = :edit';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(
            ':edit'=>$edit
        ));
	}
	/**
	 * @access protected
	 * Vérifie si la carte existe dans la langue
	 * @param integer $idlang
     * @return array
     */
	protected function s_verify_lang($idlang){
		$sql = 'SELECT map.*,lang.iso FROM mc_plugins_gmap AS map
		LEFT JOIN mc_lang AS lang ON ( map.idlang = lang.idlang )
		WHERE map.idlang = :idlang';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(
            ':idlang'=>$idlang
        ));
	}
	/**
	 * @access protected
	 * Retourne la configuration
	 * @param string $config_id
     * @return array
     */
	protected function s_config_data($config_id){
		$sql ='SELECT conf.* FROM mc_plugins_gmap_config AS conf
		WHERE config_id = :config_id';
		return magixglobal_model_db::layerDB()->selectOne($sql,array(
            ':config_id'=>$config_id
        ));
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
		return magixglobal_model_db::layerDB()->select($sql,array(
            ':idgmap'=>$idgmap
        ));
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
     * @param $edit
     * @param string $society_ga
     * @param string $adress_ga
     * @param string $city_ga
     * @param string $country_ga
     * @param string $lat_ga
     * @param string $lng_ga
     */
	protected function i_relative_map($edit,$society_ga,$adress_ga,$city_ga,$country_ga,$lat_ga,$lng_ga){
		$sql = 'INSERT INTO mc_plugins_gmap_adress (society_ga,adress_ga,city_ga,country_ga,lat_ga,lng_ga,idgmap)
		VALUE(:society_ga,:adress_ga,:city_ga,:country_ga,:lat_ga,:lng_ga,:edit)';
		magixglobal_model_db::layerDB()->insert($sql,array(
            ':edit'		    =>	$edit,
			':society_ga'	=>	$society_ga,
			':adress_ga'	=>	$adress_ga,
			':city_ga'		=>	$city_ga,
			':country_ga'	=>	$country_ga,
			':lat_ga'		=>	$lat_ga,
			':lng_ga'		=>	$lng_ga
		));
	}

    /**
     * @access protected
     * Mise à jour de la carte
     * @param integer $idadmin
     * @param string $name_map
     * @param string $content_map
     * @param $edit
     */
	protected function u_map_record($idadmin,$name_map,$content_map,$edit){
		$sql = 'UPDATE mc_plugins_gmap SET idadmin=:idadmin,name_map=:name_map,content_map=:content_map
		WHERE idgmap = :edit';
		magixglobal_model_db::layerDB()->update($sql,array(
			':idadmin'		=>	$idadmin,
			':name_map'		=>	$name_map,
			':content_map'	=>	$content_map,
			':edit'		=>	$edit
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