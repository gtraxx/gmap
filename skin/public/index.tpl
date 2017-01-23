{extends file="layout.tpl"}
{block name="styleSheet" append}
    <script src="{if isset($smarty.server.HTTPS) eq 'on'}https{else}http{/if}://maps.google.com/maps/api/js?sensor=false&amp;language={getlang}{if $config_map.api_key != '' OR $config_map.api_key != NULL}&amp;key={$config_map.api_key}{/if}" type="text/javascript"></script>
    {headlink rel="stylesheet" href="/min/?f=plugins/gmap/css/perfect-scrollbar.min.css" concat=$concat media="screen"}
{/block}
{block name="title"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'1','default'=>{$config_map.name_map|ucfirst}]}{/block}
{block name="description"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'2','default'=>{$config_map.name_map|ucfirst}]}{/block}
{block name='body:id'}gmap{/block}
{block name="main"}
    {$getMapConfig}
{/block}
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
                var iso = '{getlang}';
                var latLng = ["{$config_map.lat_map}", "{$config_map.lng_map}"];
                var postalAddress = "{$config_map.adress_map}, {$config_map.country_map}";
                var city = "{$config_map.city_map}";
                var route = "{$config_map.route_map}";
                var marker = "{$config_map.marker}";
                var originData = ["{$config_map.society_map}",postalAddress,city,latLng,route,marker];
                if (typeof gmap == "undefined"){
                    console.log("gmap is not defined");
                }else{
                    {if $config_map.multi_marker eq '1'}
                    gmap.runMultiMarker(iso,originData);
                    {else}
                    gmap.run(iso,originData);
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
