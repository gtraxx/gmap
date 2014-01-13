{if $plugin_status != 0}
{if $config_map.name_map != null}
    <h1>{$config_map.name_map}</h1>
    <div class="col-lg-6 alert alert-info" itemscope itemtype="http://data-vocabulary.org/Organization">
        <span class="icon fa fa-map-marker"></span>
        <span itemprop="name">{$config_map.society_map}</span> :
        <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <span itemprop="streetAddress">{$config_map.adress_map}</span>
            <span itemprop="addressLocality">{$config_map.city_map}, {$config_map.country_map}</span>
        </div>
        <div itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
            <meta itemprop="latitude" content="{$config_map.lat_map}" />
            <meta itemprop="longitude" content="{$config_map.lng_map}" />
        </div>
    </div>

    {if $config_map.multi_marker eq '0'}
        {if $config_map.route_map eq '1'}
        <div class="col-lg-6">
        <form class="form-search">
            <div class="input-group">
                <input type="text" class="form-control" id="getadress" name="getadress" placeholder="{#gmap_adress#}" value="" />
                <div class="input-group-btn">
                <button class="btn btn-default subdirection" type="button">
                    <span class="glyphicon glyphfa fa-search"></span>
                </button>
                </div>
            </div>
        </form>
        </div>
        {/if}
    {/if}
    {if $config_map.content_map != null}
        <div class="gmap-content">{$config_map.content_map}</div>
    {/if}
    <div id="map_adress" class="gmap3 col-lg-12"></div>
    {if $config_map.multi_marker eq '0'}
        {if $config_map.route_map eq '1'}
            <div id="r-directions"></div>
        {/if}
    {/if}
    {else}
    <div class="mc-message clearfix">
        <p class="alert alert-warning fade in">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <span class="fa fa-warning-sign"></span> {#gmap_plugin_error#} : {#gmap_plugin_configured#}
        </p>
    </div>
{/if}
{else}
    <div class="mc-message clearfix">
        <p class="alert alert-warning fade in">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <span class="fa fa-warning-sign"></span> {#gmap_plugin_error#} : {#gmap_plugin_installed#}
        </p>
    </div>
{/if}