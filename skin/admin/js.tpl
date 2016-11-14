{include file="section/editor.tpl"}
{script src="/{baseadmin}/min/?g=tinymce" concat={$concat} type="javascript"}
{script src="/{baseadmin}/min/?f={baseadmin}/template/js/tinymce-config.js,libjs/jimagine/plugins/jquery.jmMap.js,plugins/{$pluginName}/js/gmap3.min.js,plugins/{$pluginName}/js/admin.js" concat={$concat} type="javascript"}
<script type="text/javascript">
    $(function(){
        if (typeof MC_plugins_gmap == "undefined")
        {
            console.log("MC_plugins_gmap is not defined");
        }else{
            {if $smarty.get.getlang}
                {if $smarty.get.tab eq 'config'}
                $('#btn-map').on('click', function () {
                    $('#map-modal').on('shown.bs.modal', function () {
                        google.maps.event.trigger($("#contener-map").gmap3("get"), "resize");
                    });
                });
                MC_plugins_gmap.runConfig(baseadmin,getlang);
                {else}
                    {if $smarty.get.edit}
                        {if $smarty.get.tab eq 'multimarkers'}
                        MC_plugins_gmap.runRelated(baseadmin,getlang,iso,edit);
                        $('#btn-map').on('click', function () {
                            $('#map-modal').on('shown.bs.modal', function () {
                                google.maps.event.trigger($("#contener-map").gmap3("get"), "resize");
                                //map.setCenter(center);
                            });
                        });
                        {else}
                        MC_plugins_gmap.runEdit(baseadmin,getlang,edit);
                        {/if}
                    {else}
                        MC_plugins_gmap.runList(baseadmin,getlang,iso);
                    {/if}
                {/if}
            {/if}
        }
    });
</script>