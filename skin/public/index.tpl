{extends file="layout.tpl"}
{block name="styleSheet" append}
    <script src="http://maps.google.com/maps/api/js?sensor=false&amp;language={getlang}" type="text/javascript"></script>
    {headlink rel="stylesheet" href="/min/?f=plugins/gmap/css/public.css,plugins/gmap/css/ui-bootstrap/jquery-ui-1.10.3.custom.css" concat=$concat media="screen"}
    <!--[if lt IE 9]>
    {headlink rel="stylesheet" href="/min/?f=plugins/gmap/css/ui-bootstrap/jquery.ui.1.10.3.ie.css" concat=$concat media="screen"}
    <![endif]-->
{/block}
{block name="title"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'1','default'=>{$name_map|ucfirst}]}{/block}
{block name="description"}{seo_rewrite config_param=['level'=>'0','idmetas'=>'2','default'=>{$name_map|ucfirst}]}{/block}
{block name='body:id'}gmap{/block}

{block name="article:content"}
    {$map_data}
{/block}

{block name='aside:content' append}
    {widget_news_display
    conf    =   [
    'level' => 'last-news',
    'limit' => 3
    ]
    pattern = 'sidebar'
    prepend = "<h2 class='lead'>{#last_news#|ucfirst}</h2>"
}
{/block}

{block name="foot" append}
    {script src="/min/?f=plugins/gmap/js/gmap3.min.js,plugins/gmap/js/public.0.3.js" concat=$concat type="javascript"}
    {if $plugin_status != 0}
    <script type="text/javascript">
        $(function(){
            var iso = '{getlang}';
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
{/block}
