<?php
class database_plugins_gmap{
	/**
	 * Checks if the tables of the plugins are installed
	 * @access protected
	 * return integer
	 */
	protected function c_show_tables() {
		$tables = array(
			'mc_plugins_gmap',
			'mc_plugins_gmap_config',
			'mc_plugins_gmap_address'
		);

		$i = 0;
		do {
			$t = magixglobal_model_db::layerDB()->showTable($tables[$i]);
			$i++;
		} while($t && $i < count($tables));

		return $t;
	}

	/**
	 * Checks if the requested table is installed
	 * @param $t
	 * @return integer
	 */
	protected function c_show_table($t) {
		return magixglobal_model_db::layerDB()->showTable($t);
	}

	/**
	 * Get the default language
	 * @return array
	 */
	protected function getLangId($iso)
	{
		$query = "SELECT idlang FROM mc_lang WHERE iso = :iso ";

		return magixglobal_model_db::layerDB()->selectOne($query,array(':iso' => $iso));
	}

	/**
	 * Get the default language
	 * @return array
	 */
	protected function getDefaultLang()
	{
		$query = "SELECT idlang FROM mc_lang WHERE default_lang = 1 ";

		return magixglobal_model_db::layerDB()->selectOne($query);
	}

	/**
	 * fetch Data
	 * @param array $config
	 * @param array|null $data
	 * @return array
	 */
	protected function fetchData($config, $data = null) {
		if(is_array($config)) {
			$sql = '';
			$params = false;

			if ($config['context'] == 'all') {
				switch ($config['type']) {
					case 'config':
						$sql = "SELECT * FROM mc_plugins_gmap_config";
						break;

					case 'addresses':
						$sql = "SELECT * FROM mc_plugins_gmap_address WHERE idlang = :lang ORDER BY order_addr";
						$params = $data;
						break;
				}

				return magixglobal_model_db::layerDB()->select($sql,$params);
			}
			elseif ($config['context'] == 'one') {
				switch ($config['type']) {
					case 'address':
						$sql = "SELECT * FROM mc_plugins_gmap_address WHERE idlang = :lang AND id_address = :id";
						$params = $data;
						break;

					case 'img':
						$sql = "SELECT img FROM mc_plugins_gmap_address WHERE idlang = :lang AND id_address = :id";
						$params = $data;
						break;

					case 'page':
						$sql = "SELECT * FROM mc_plugins_gmap WHERE idlang = :lang";
						$params = $data;
						break;
				}

				return magixglobal_model_db::layerDB()->selectOne($sql,$params);
			}
		}
	}

	/**
	 * Insert a record
	 * @param array $config
	 */
	protected function insert($config) {
		if(is_array($config)) {
			$sql = '';
			$params = $config['data'];

			switch ($config['type']) {
				case 'address':
					$sql = "INSERT INTO mc_plugins_gmap_address (idlang,company,about,address,postcode,city,country,phone,mobile,fax,email,link,img,lat,lng,order_addr)
							SELECT :lang,:company,:about,:address,:postcode,:city,:country,:phone,:mobile,:fax,:email,:link,:img,:lat,:lng,COUNT(id_address) + 1 FROM mc_plugins_gmap_address";
					break;

				case 'page':
					$sql = "INSERT INTO mc_plugins_gmap (idlang,title,content) VALUES (:lang,:title,:content)";
					break;
			}

			magixglobal_model_db::layerDB()->insert($sql,$params);
		}
	}

	/**
	 * Update one record or more
	 * @param array $config
	 */
	protected function update($config)
	{
		if (is_array($config)) {
			$sql = '';
			$params = $config['data'];

			switch ($config['type']) {
				case 'address':
					$sql = "UPDATE mc_plugins_gmap_address 
							SET 
								company = :company,
								about = :about,
								address = :address,
								postcode = :postcode,
								city = :city,
								country = :country,
								phone = :phone,
								mobile = :mobile,
								fax = :fax,
								email = :email,
								link = :link,
								img = :img,
								lat = :lat,
								lng = :lng
							WHERE id_address = :id
							AND idlang = :lang";
					break;

				case 'img':
					$sql = 'UPDATE mc_plugins_gmap_address SET img = NULL WHERE id_address = :id';
					break;

				case 'order':
					$sql = 'UPDATE mc_plugins_gmap_address SET order_addr = :i WHERE id_address = :id';
					break;

				case 'page':
					$sql = "UPDATE mc_plugins_gmap 
							SET title=:title, content=:content
							WHERE idgmap = :id";
					break;

				case 'config':
					$sql = "UPDATE `mc_plugins_gmap_config`
					SET `config_value` = CASE `config_id`
						WHEN 'api_key' THEN :api_key
						WHEN 'marker' THEN :marker
					END
					WHERE `config_id` IN ('api_key','marker')";
					break;
			}

			magixglobal_model_db::layerDB()->update($sql,$params);
		}
	}

	/**
	 * Delete a record or more
	 * @param array $config
	 */
	protected function delete($config) {
		if(is_array($config)){
			$sql = '';
			$params = $config['data'];

			switch ($config['type']) {
				case 'address':
					$sql = "DELETE FROM mc_plugins_gmap_address
							WHERE id_address = :id
							AND idlang = :lang";
					break;
			}

			magixglobal_model_db::layerDB()->delete($sql,$params);
		}
	}
}