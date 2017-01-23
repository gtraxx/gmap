## Gmap pour Magix CMS

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
![Configuration du plugin gmap dans Magix CMS](https://cloud.githubusercontent.com/assets/356674/12264692/c1be8efe-b938-11e5-9b60-30dcb2a17132.png "Configuration du plugin gmap dans Magix CMS")
#### Gestion de la page
![Page du plugin gmap dans Magix CMS](https://cloud.githubusercontent.com/assets/356674/12264693/c1c4292c-b938-11e5-8cbb-02795b026ff0.png "Page du plugin gmap dans Magix CMS")

## Note
 * Pour avoir une mise en page en rapport avec votre charte graphique, 
vous pouvez éditer le fichier index.tpl dans le dossier /plugin/gmap/skin/public/

Copier le dossier public de gmap à la racine de votre skin.
renommé le dossier public en **gmap**, ensuite vous pouvez éditer les fichiers tpl comme bon vous semble.

### SMARTY/JAVASCRIPT
```javascript
{block name="foot" append}
    {script src="/min/?f=plugins/gmap/js/perfect-scrollbar.min.js,plugins/gmap/js/gmap3-7.2.min.js,plugins/gmap/js/public.js" concat=$concat type="javascript"}
    {if $plugin_status != 0}
        <script type="text/javascript">
            $(function(){
                var iso = '{getlang}';
                if (typeof gmap == "undefined"){
                    console.log("gmap is not defined");
                }else{
                    {if $config_map.multi_marker eq '1'}
                    gmap.runMultiMarker(iso);
                    {else}
                    gmap.run(iso);
                    $('.subdirection').on('click',function(){
                        var checkRoute = setInterval(function () {
                            var fill = $("#r-directions .adp").html();
                            if (fill !== undefined) {
                                // Custom Scrollbar
                                $('#r-directions .adp').perfectScrollbar();
                                clearInterval(checkRoute);
                            }
                        }, 50);
                    });
                    {/if}
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

 * Gerits Aurelien (Author - Developer) contact[at]aurelien-gerits[point]be - aurelien[at]magix-cms[point]com

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
