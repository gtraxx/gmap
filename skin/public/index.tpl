{include file="section/head.tpl" section="prepend"}
{headmeta meta="description" content={seo_rewrite config_param=['level'=>'0','idmetas'=>'2','default'=>{$name_map|ucfirst}]}}
<title>{seo_rewrite config_param=['level'=>'0','idmetas'=>'1','default'=>{$name_map|ucfirst}]}</title>
<script src="http://maps.google.com/maps/api/js?sensor=false&amp;language={getlang}" type="text/javascript"></script>
{include file="section/css.tpl"}
{headlink rel="stylesheet" href="/min/?f=plugins/gmap/css/public.css" concat=$concat media="screen"}
<link rel="stylesheet" href="http://addyosmani.github.io/jquery-ui-bootstrap/css/custom-theme/jquery-ui-1.10.3.custom.css">
<!--[if lt IE 9]>
<link rel="stylesheet" href="http://addyosmani.github.io/jquery-ui-bootstrap/css/custom-theme/jquery.ui.1.10.3.ie.css">
<![endif]-->
</head>
<body id="gmap">
<div id="page" class="container">
    {include file="section/header.tpl"}
    <div id="content" class="row">
        <div id="article" class="span12">
            <div id="article-inner" class="span10">
                {$map_data}
            </div>
        </div>
    </div>
    {include file="section/footer.tpl"}
</div>
{include file="section/foot.tpl"}
{script src="/min/?f=plugins/gmap/js/gmap3.min.js,plugins/gmap/js/public.0.3.js" concat=$concat type="javascript"}
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
</body>
</html>