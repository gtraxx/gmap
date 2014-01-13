## Gmap pour Magix CMS

#### Créer et distribuer par [Magix Dev](http://www.magix-dev.be/)

## Installation
 * Décompresser l'archive dans le dossier "plugins" de magix cms
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

## Note
 * Pour avoir une mise en page en rapport avec votre charte graphique, 
vous pouvez éditer le fichier index.tpl dans le dossier /plugin/gmap/skin/public/
 * Le fichier CSS est dans le dossier /plugin/gmap/css/public.css

Depuis la version 2.3.5, le dossier public du plugin peut être utilisé directement dans le skin.
Faites comme suit :
Copier le dossier public de gmap à la racine de votre skin.
renommé le dossier public en gmap, ensuite vous pouvez éditer les fichiers phtml comme bon vous semble.

### SMARTY/JAVASCRIPT
```javascript
{script src="/min/?f=plugins/gmap/js/gmap3.min.js,plugins/gmap/js/public.0.3.js" type="javascript"}
{if $plugin_status != 0}
<script type="text/javascript">
$(function(){
    if (typeof gmap == "undefined"){
        console.log("gmap is not defined");
    }else{
        {if $multi_marker eq '1'}
            gmap.runMultiMarker(iso);
        {else}
            gmap.run(iso);
        {/if}
    }
});
</script>
{/if}
````

### MISE A JOUR
La mise à jour du plugin est à effectuer en replaçant le dossier du plugin par la nouvelle version
et de se connecter à l'administration de celui-ci pour faire la mise à jour des tables SQL.

<pre>

This file is a plugin of Magix CMS.
Magix CMS, a CMS optimized for SEO

Copyright (C) 2008 - 2013 magix-cms.com support[at]magix-cms[point]com | contact[at]magix-dev[point]be

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
