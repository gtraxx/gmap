{include file="section/editor.tpl"}
{script src="/{baseadmin}/min/?g=tinymce" concat={$concat} type="javascript"}
{script src="/{baseadmin}/min/?f={baseadmin}/template/js/tinymce-config.js,plugins/{$pluginName}/js/gmap3-7.2.min.js,plugins/{$pluginName}/js/admin.js" concat={$concat} type="javascript"}
<script type="text/javascript">
    $(function(){
        if (typeof MC_plugins_gmap === "undefined")
        {
            console.log("MC_plugins_gmap is not defined");
        } else {
            MC_plugins_gmap.run();

            {if $smarty.get.tab == 'address' && ($smarty.get.action == 'add' || $smarty.get.action == 'edit')}
            MC_plugins_gmap.addAddress();
            {/if}
        }
    });
</script>