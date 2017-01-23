{include file="section/editor.tpl"}
{script src="/{baseadmin}/min/?g=tinymce" concat={$concat} type="javascript"}
{script src="/{baseadmin}/min/?f={baseadmin}/template/js/tinymce-config.js,plugins/{$pluginName}/js/gmap3-7.2.min.js,plugins/{$pluginName}/js/admin.js" concat={$concat} type="javascript"}
<script type="text/javascript">
    $(function(){
        if (typeof MC_plugins_gmap == "undefined")
        {
            console.log("MC_plugins_gmap is not defined");
        }else{
            {if $smarty.get.getlang}
                {if $smarty.get.tab eq 'config'}
                MC_plugins_gmap.runConfig(baseadmin,getlang);
                {else}
                    {if $smarty.get.edit}
                        {if $smarty.get.tab eq 'multimarkers'}
                        MC_plugins_gmap.runRelated(baseadmin,getlang,edit);
                        {else}
                        MC_plugins_gmap.runEdit(baseadmin,getlang,edit);
                        {/if}
                    {else}
                        MC_plugins_gmap.runList(baseadmin,getlang);
                    {/if}
                {/if}
            {/if}
        }
    });
</script>