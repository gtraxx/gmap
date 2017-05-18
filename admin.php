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

class plugins_gmap_admin extends database_plugins_gmap
{
	protected $template, $header, $message, $country, $translation;
	public static $notify = array('plugin'=>'true','template'=>'message-gmap.tpl','method'=>'display','assignFetch'=>'notifier');

	/**
	 * Global
	 * @var bool
	 */
	public $getlang, $action, $edit, $tab;

	/**
	 * Configuration
	 * @var array
	 */
	public $config;

	/**
	 * Page title and content
	 * @var array
	 */
	public $page;

	/**
	 * Address information
	 * @var array
	 */
	public $address, $id;

	/**
	 * plugins_gmap_admin constructor.
	 */
	public function __construct()
	{
		// --- Global
		if (class_exists('magixglobal_model_header')) {
			$this->header = new magixglobal_model_header();
		}
		if (class_exists('backend_model_message')) {
			$this->message = new backend_model_message();
		}
		if (class_exists('backend_controller_plugins')) {
			$this->template = new backend_controller_plugins();
		}
		if (class_exists('backend_controller_country')) {
			$this->country = new backend_controller_country();
		}
		if (class_exists('backend_controller_template')) {
			$this->translation = new backend_controller_template();
		}

		$filterRequest = new magixcjquery_filter_request();
		$helpersforms = new magixcjquery_form_helpersforms();
		$filterIsVar = new magixcjquery_filter_isVar();

		// --- Get
		if ($filterRequest->isGet('getlang')) {
			$this->getlang = $filterIsVar->isPostNumeric($_GET['getlang']);
		}
		if ($filterRequest->isGet('action')) {
			$this->action = $helpersforms->inputClean($_GET['action']);
		}
		if ($filterRequest->isGet('edit')) {
			$this->edit = $filterIsVar->isPostNumeric($_GET['edit']);
		}
		if ($filterRequest->isGet('tab')) {
			$this->tab = $helpersforms->inputClean($_GET['tab']);
		}

		// --- Post
		// - Config
		if ($filterRequest->isPost('config')) {
			$this->config = $helpersforms->arrayClean($_POST['config']);
		}
		// - Content
		if ($filterRequest->isPost('page')) {
			$page = $_POST['page'];
			foreach($page as $k => $v) {
				if ($k === 'content') {
					$this->page[$k] = $helpersforms->inputCleanQuote($v);
				}
				else {
					$this->page[$k] = $helpersforms->inputClean($v);
				}
			}
		}
		// - Addresses
		if ($filterRequest->isPost('address')) {
			$this->address = $helpersforms->arrayClean($_POST['address']);
		}
		if ($filterRequest::isPost('id')) {
			$this->id = $filterIsVar->isPostNumeric($_POST['id']);
		}
	}

	/**
	 * @param array $arr
	 * @return array
	 */
	private function keysToParams($arr)
	{
		foreach ($arr as $k => $v) {
			$arr[':'.$k] = $v;
			unset($arr[$k]);
		}
		return $arr;
	}

	/**
	 * @access private
	 * Installing mysql database plugin
	 */
	private function install_table()
	{
		if (parent::c_show_tables() == 0) {
			$this->template->db_install_table('db.sql', 'request/install.tpl');
		} else {
			return true;
		}
	}

	/**
	 * @access private
	 * Retourne le chemin du fichier XML de gmap
	 */
	private function load_local_file()
	{
		return magixglobal_model_system::base_path() . '/plugins/gmap/version.xml';
	}

	/**
	 * @access private
	 * Lit le numéro de version dans le fichier XML du plugin gmap
	 */
	private function read_local_version()
	{
		try {
			$xml = new SimpleXMLElement(self::load_local_file(), 0, TRUE);
			$v = $xml->number;
		} catch (Exception $e) {
			magixglobal_model_system::magixlog('An error has occured :', $e);
		}
		return $v;
	}

	/**
	 * @access private
	 * Effectue le controle pour la migration vers une version supérieur
	 */
	private function upgrade_version()
	{
		return true;
		$config = parent::fetchData(array(
			'context' => 'one',
			'type' => 'config',
			'id' => 'gmap_version'
		));
		if ($config['config_value'] == null) {
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.tpl');
		} elseif ($config['config_value'] == '1.0') {
			backend_controller_plugins::create()->db_install_table('update_1.1.sql', 'request/update.tpl');
		} elseif ($config['config_value'] < $this->read_local_version()) {
			backend_controller_plugins::create()->db_install_table('update_' . $this->read_local_version() . '.sql', 'request/update.tpl');
		} else {
			//magixcjquery_debug_magixfire::magixFireInfo('Les tables mysql sont installés', 'Statut des tables mysql du plugin');
			return true;
		}
	}

	/**
	 * @access private
	 * Parcour le dossier marker dans le plugin pour retourner un tableau des images
	 */
	private function findMarker()
	{
		$makefile = new magixcjquery_files_makefiles();
		$markerCollection = $makefile->scanDir(magixglobal_model_system::base_path() . '/plugins/gmap/markers/');
		$this->template->assign('markerCollection', $markerCollection);
	}

	/**
	 * @access private
	 * Charge les données de configuration pour l'édition
	 */
	private function setConfigData()
	{
		$config = parent::fetchData(array('context' => 'all','type' => 'config'));
		$configId = '';
		$configValue = '';
		foreach ($config as $key) {
			$configId[] = $key['config_id'];
			$configValue[] = $key['config_value'];
		}
		$setConfig = array_combine($configId, $configValue);
		$this->template->assign('getConfigData', $setConfig);
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
	 * Insert data
	 * @param array $config
	 */
	private function add($config)
	{
		switch ($config['type']) {
			case 'address':
			case 'page':
				parent::insert($config);
				$this->header->set_json_headers();
				$this->message->json_post_response(true,'save',null, self::$notify);
				break;
		}
	}

	/**
	 * Update data
	 * @param array $config
	 */
	private function upd($config)
	{
		switch ($config['type']) {
			case 'address':
			case 'config':
			case 'page':
				parent::update($config);
				$this->header->set_json_headers();
				$this->message->json_post_response(true,'save',null, self::$notify);
				break;
		}
	}

	/**
	 * Delete a record
	 * @param $config
	 */
	private function del($config)
	{
		switch ($config['type']) {
			case 'address':
				parent::delete($config);
				$this->header->set_json_headers();
				$this->message->json_post_response(true,'delete',array('id' => $this->id));
				break;
		}
	}


	/**
	 * Execute Update AJAX FOR order
	 * @access private
	 *
	 */
	private function update_order(){
		if(isset($this->address)){
			$p = $this->address;
			for ($i = 0; $i < count($p); $i++) {
				$config = array(
					'type' => 'order',
					'data' => array(
						':i' => $i,
						':id' => $p[$i]
					)
				);
				parent::update($config);
			}
		}
	}

	/**
	 * Affiche les pages de l'administration du plugin
	 * @access public
	 */
	public function run()
	{
		if (self::install_table() == true) {
			if (self::upgrade_version() === true) {
				if (isset($this->getlang)) {
					$this->translation->addConfigFile(array('country/tools'), array('country_iso_'), false);

					if ($this->tab == 'about') {
						$this->template->display('about.tpl');
					}
					elseif ($this->tab == 'address') {
						if (isset($this->action)) {
							switch ($this->action) {
								case 'add':
								case 'edit':
									if(isset($this->address) && !empty($this->address)) {
										$data = $this->keysToParams($this->address);
										$data[':lang'] = $this->getlang;

										$config = array(
											'type' => 'address',
											'data' => $data
										);

										(isset($this->address['id']) && !empty($this->address['id'])) ? $this->upd($config) : $this->add($config);
									}
									else {
										if($this->action === 'edit' && isset($this->edit)) {
											$this->getItems('address',$this->edit);
										}
										$this->template->assign('countryTools', $this->country->setItemsData());
										$this->template->assign('edit',($this->action === 'edit' ? true : false));
										$this->template->display('address.tpl');
									}
									break;

								case 'delete':
									if(isset($this->id) && !empty($this->id)) {
										$this->del(
											array(
												'type' => 'address',
												'data' => array(
													':id' => $this->id,
													':lang' => $this->getlang
												)
											)
										);
									}
									break;

								case 'order':
									if (isset($this->address)) {
										$this->update_order();
									}
									break;

								case 'list':
									$this->getItems('addresses');
									$this->template->display('list.tpl');
									break;
							}
						}
						else {
							$this->getItems('addresses');
							$this->template->display('list.tpl');
						}
					}
					elseif ($this->tab == 'config') {
						if (isset($this->config) && !empty($this->config)) {
							$this->upd(array(
								'type' => 'config',
								'data' => $this->keysToParams($this->config)
							));
						} else {
							$this->setConfigData();
							$this->findMarker();
							$this->template->display('config.tpl');
						}
					}
					elseif ($this->tab == 'content') {
						if (isset($this->action)) {
							if(isset($this->page) && !empty($this->page)) {
								$config = array(
									'type' => 'page',
									'data' => $this->keysToParams($this->page)
								);

								!empty($this->page['id']) ? $this->upd($config) : $this->add($config);
							}
							else {
								$this->getItems('page',null,'one');
								$this->template->display('content.tpl');
							}
						}
						else {
							$this->template->display('content.tpl');
						}
					}
					else {
                        $this->getItems('addresses');
						$this->template->display('list.tpl');
					}
				}
				else {
					$this->template->display('index.tpl');
				}
			}
		}
	}

	/**
	 * @access public
	 * Options de reecriture des métas
	 */
	public function seo_options()
	{
		return $options_string = array(
			'plugins' => true
		);
	}

	/**
	 * Set icon for the admin sidebar menu
	 * @return array
	 */
	/*public function set_icon(){
		$icon = array(
			'type'=>'image',
			'name'=>'icon.png'
		);
		return $icon;
	}*/

	public function setConfig()
	{
		return array(
			'url' => array(
				'lang' => 'list'
			)
		);
	}

	/**
	 * Sitemap
	 * @return string
	 */
	private function lastmod_dateFormat()
	{
		$dateformat = new magixglobal_model_dateformat();
		return $dateformat->sitemap_lastmod_dateFormat();
	}

	/**
	 * @access public
	 * Options de reecriture des sitemaps NEWS
	 */
	public function sitemap_rewrite_options()
	{
		return $options_string = array(
			'index' => true,
			'level1' => false,
			'level2' => false,
			'records' => false
		);
	}

	/**
	 * URL index du module suivant la langue
	 * @param $idlang
	 */
	public function sitemap_uri_index($idlang)
	{
		$sitemap = new magixcjquery_xml_sitemap();
		// Table des langues
		$lang = new backend_db_block_lang();
		// Retourne le code ISO
		$db = $lang->s_data_iso($idlang);
		if ($db != null) {
			$sitemap->writeMakeNode(
				magixcjquery_html_helpersHtml::getUrl() . magixglobal_model_rewrite::filter_plugins_root_url(
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