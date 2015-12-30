# -- BEGIN LICENSE BLOCK ----------------------------------
#
# This file is a plugin of Magix CMS.
# Magix CMS, a CMS optimized for SEO
# Copyright (C) 2011 - 2016
# Author and contributor:
# Aurelien Gerits <aurelien[at]magix-cms[point]com>,<contact[at]magix-dev[point]be>
# jean-baptiste demonte (http://gmap3.net/)
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
Installation
- Décompresser l'archive dans le dossier "plugins" de magix cms
- Connectez-vous dans l'administration de votre site internet 
- Cliquer sur l'onglet plugins du menu déroulant pour sélectionner gmap.
- Une fois dans le plugin, laisser faire l'auto installation
- Il ne reste que la configuration du plugin pour correspondre avec vos données.

Upgrade
- Supprimer l'ancien plugin
- Envoyer les nouveaux fichiers
- Connectez-vous dans l'administration de votre site internet 
- Cliquer sur l'onglet plugins du menu déroulant pour sélectionner gmap.
- Une fois dans le plugin, laisser faire l'auto update

Note
- Pour avoir une mise en page en rapport avec votre charte graphique, 
vous pouvez éditer le fichier index.tpl dans le dossier /plugin/gmap/skin/public/
- Le fichier Less est dans le dossier /plugin/gmap/less/gmap.less à copier dans le dossier /skin/default/css/bootstrap/less/custom/theme/

Depuis la version 2.3.5, le dossier public du plugin peut être utilisé directement dans le skin.
Faites comme suit :
Copier le dossier public de gmap à la racine de votre skin.
renommé le dossier public en gmap, ensuite vous pouvez éditer les fichiers tpl comme bon vous semble.

### SMARTY/JAVASCRIPT ###
{script src="/min/?f=plugins/gmap/js/perfect-scrollbar.min.js,plugins/gmap/js/gmap3.min.js,plugins/gmap/js/public.0.3.js" concat=$concat type="javascript"}
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

### MISE A JOUR ###
La mise à jour du plugin est à effectuer en replaçant le dossier du plugin par la nouvelle version
et de se connecter à l'administration de celui-ci pour faire la mise à jour des tables SQL.