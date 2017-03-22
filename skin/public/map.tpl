{if $plugin_status != 0}
    {if $config_map.name_map != null}
        <h1{if empty($config_map.content_map)} class="sr-only"{/if}>{$config_map.name_map}</h1>
        {if $config_map.content_map != null}
            <div class="gmap-content container">
                {$config_map.content_map}
            </div>
        {/if}
        <div class="map">
            <div>
                <div id="map_adress" class="gmap3"></div>
            </div>
            <div id="gmap-address">
                {if $config_map.route_map eq '1'}
                <div id="searchdir" class="collapse">
                    <form class="form-search">
                        <div class="input-group">
                            <input type="text" class="form-control" id="getadress" name="getadress" placeholder="{#gmap_adress#}" value="" />
                            <div class="input-group-btn">
                                <button class="btn btn-default subdirection" type="submit">
                                    <span class="fa fa-search"></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/if}
                <div class="alert alert-primary" itemscope itemtype="http://data-vocabulary.org/Organization">
                    {if $config_map.route_map eq '1'}
                    <a id="showform" class="btn btn-lg pull-right collapsed" type="button" data-toggle="collapse" data-target="#searchdir" aria-expanded="false" aria-controls="searchdir">
                        <span class="fa fa-arrow-circle-right"></span>
                    </a>
                    <button id="hidepanel" class="btn btn-default btn-box">
                        <span class="fa fa-caret-left"></span>
                    </button>
                    {/if}
                    <meta itemprop="name" content="{$config_map.society_map}" />
                    <div id="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                        <span class="fa fa-map-marker"></span>
                        <span class="address" itemprop="streetAddress">{$config_map.adress_map}</span>,
                        <span itemprop="addressLocality">
                            <span class="city">{$config_map.postcode_map} {$config_map.city_map}</span>, <span class="country">{$config_map.country_map}</span>
                        </span>
                        <div itemprop="address" itemscope itemtype="http://schema.org/GeoCoordinates">
                            <meta itemprop="latitude" content="{$config_map.lat_map}" />
                            <meta itemprop="longitude" content="{$config_map.lng_map}" />
                        </div>
                    </div>
                </div>
                {if $config_map.route_map eq '1'}
                <div id="r-directions"></div>
                {/if}
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