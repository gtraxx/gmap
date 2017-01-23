{if $plugin_status != 0}
    {if $config_map.name_map != null}
        <div class="container">
            <h1>{$config_map.name_map}</h1>
            {if $config_map.content_map != null}
                <div class="gmap-content col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    {$config_map.content_map}
                </div>
            {/if}
            <div class="col-xs-12 {if $config_map.multi_marker eq '0' AND $config_map.route_map eq '1'}col-sm-6 col-md-6 col-lg-6{else}col-sm-12 col-md-12 col-lg-12{/if} alert alert-info" itemscope itemtype="http://data-vocabulary.org/Organization">
                <span class="glyphicon glyphicon-map-marker"></span>
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
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <form class="form-search">
                            <div class="input-group">
                                <input type="text" class="form-control" id="getadress" name="getadress" placeholder="{#gmap_adress#}" value="" />
                                <div class="input-group-btn">
                                    <button class="btn btn-default subdirection" type="button">
                                        <span class="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                {/if}
            {/if}
            <div class="map">
                <div>
                    <div id="map_adress" class="gmap3"></div>
                    {if $config_map.multi_marker eq '0'}
                        {if $config_map.route_map eq '1'}
                            <div id="r-directions"></div>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>

    {else}
        <div class="container">
            <div class="mc-message clearfix">
                <p class="alert alert-warning fade in">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <span class="fa fa-warning-sign"></span> {#gmap_plugin_error#} : {#gmap_plugin_configured#}
                </p>
            </div>
        </div>
    {/if}
{else}
    <div class="container">
        <div class="mc-message clearfix">
            <p class="alert alert-warning fade in">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <span class="fa fa-warning-sign"></span> {#gmap_plugin_error#} : {#gmap_plugin_installed#}
            </p>
        </div>
    </div>
{/if}