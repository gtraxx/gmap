## Gmap pour Magix CMS

###License

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

###version 

[![release](https://img.shields.io/github/release/gtraxx/gmap.svg)](https://github.com/gtraxx/gmap/releases/latest)


#### Créer et distribuer par [Magix CMS](http://www.magix-cms.com)

## Installation
 * Décompresser l'archive dans le dossier "**plugins**" de magix cms
 * Connectez-vous dans l'administration de votre site internet 
 * Cliquer sur l'onglet plugins du menu déroulant pour sélectionner gmap.
 * Une fois dans le plugin, laisser faire l'auto installation
 * Il ne reste que la configuration du plugin pour correspondre avec vos données.

## Upgrade
 * Supprimer l'ancien plugin
 * Envoyer les nouveaux fichiers
 * Connectez-vous dans l'administration de votre site internet 
 * Cliquer sur l'onglet plugins du menu déroulant pour sélectionner gmap.
 * Une fois dans le plugin, laisser faire l'auto update
 
#### Configuration
![magixcms-gmap-3 0-config](https://cloud.githubusercontent.com/assets/356674/24237713/b10ae8ca-0fa7-11e7-92a9-be465a3805e7.png)
#### Gestion de la page
![Page du plugin gmap dans Magix CMS](https://cloud.githubusercontent.com/assets/356674/12264693/c1c4292c-b938-11e5-8cbb-02795b026ff0.png "Page du plugin gmap dans Magix CMS")
#### Plan d'accès
![magixcms-gmap-3 0-plan](https://cloud.githubusercontent.com/assets/356674/24237808/16e0fb80-0fa8-11e7-8257-aa066320e56d.png)

![magixcms-gmap-3 0-plan-route](https://cloud.githubusercontent.com/assets/356674/24237845/558da1d0-0fa8-11e7-921e-58f64cd74a61.png)
## Note
 * Pour avoir une mise en page en rapport avec votre charte graphique, 
vous pouvez éditer le fichier index.tpl dans le dossier /plugin/gmap/skin/public/

Copier le dossier public de gmap à la racine de votre skin.
renommé le dossier public en **gmap**, ensuite vous pouvez éditer les fichiers tpl comme bon vous semble.

### SMARTY/JAVASCRIPT
```javascript
{block name="foot" append}
    {script src="/min/?g=form" concat=$concat type="javascript"}
    {capture name="formjs"}{strip}
        /min/?f=skin/{template}/js/form.min.js
    {/strip}{/capture}
    {script src=$smarty.capture.formjs concat=$concat type="javascript" load='async'}
    {script src="/min/?f=plugins/gmap/js/perfect-scrollbar.min.js,plugins/gmap/js/gmap3-7.2.min.js,plugins/gmap/js/public.js" concat=$concat type="javascript"}
    {if $plugin_status != 0}
        <script type="text/javascript">
			$(function(){
				if (typeof gmap == "undefined"){
					console.log("gmap is not defined");
				}else{
					gmap.run({$config_gmap},{literal}{scrollwheel: false}{/literal});
				}
			});
        </script>
    {/if}
{/block}
````

### MISE A JOUR
La mise à jour du plugin est à effectuer en replaçant le dossier du plugin par la nouvelle version
et de se connecter à l'administration de celui-ci pour faire la mise à jour des tables SQL.

<pre>

This file is a plugin of Magix CMS.
Magix CMS, a CMS optimized for SEO

Copyright (C) 2008 - 2017 magix-cms.com support[at]magix-cms[point]com | contact[at]magix-dev[point]be

AUTHORS :

 * Gerits Aurelien (Author - Developer) aurelien[at]magix-cms[point]com

SPECIAL THANKS
jean-baptiste demonte (http://gmap3.net/)

Redistributions of files must retain the above copyright notice.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see .

####DISCLAIMER

Do not edit or add to this file if you wish to upgrade magixcms to newer
versions in the future. If you wish to customize magixcms for your
needs please refer to magix-cms.com for more information.

</pre>
