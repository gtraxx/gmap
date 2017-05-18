{if $plugin_status != 0}
    {if !empty($addresses)}
        {if isset($page) && !empty($page)}
            <h1{if empty($page.content)} class="sr-only"{/if}>
                {if isset($page.title) && !empty($page.title)}
                    {$page.title}
                {else}
                    {#access_plan#}
                {/if}
            </h1>
            {if isset($page.content) && !empty($page.content)}
                <div class="gmap-content container">
                {$page.content}
                </div>
            {/if}
        {/if}
        <div class="map">
            <div>
                <div id="map_adress" class="gmap3"></div>
            </div>
            <div id="gmap-address">
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
                <div class="alert alert-primary" itemscope itemtype="http://data-vocabulary.org/Organization">
                    <a id="showform" class="btn btn-lg pull-right collapsed" type="button" data-toggle="collapse" data-target="#searchdir" aria-expanded="false" aria-controls="searchdir">
                        <span class="fa fa-arrow-circle-right"></span>
                    </a>
                    <button id="hidepanel" class="btn btn-default btn-box">
                        <span class="fa fa-caret-left"></span>
                    </button>
                    <meta itemprop="name" content="{$addresses[0].company}" />
                    <div id="address" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                        <span class="fa fa-map-marker"></span>
                        <span class="address" itemprop="streetAddress">{$addresses[0].address}</span>,
                        <span itemprop="addressLocality">
                            <span class="city">{$addresses[0].postcode} {$addresses[0].city}</span>, <span class="country">{$addresses[0].country}</span>
                        </span>
                        <div itemprop="address" itemscope itemtype="http://schema.org/GeoCoordinates">
                            <meta itemprop="latitude" content="{$addresses[0].lat}" />
                            <meta itemprop="longitude" content="{$addresses[0].lng}" />
                        </div>
                    </div>
                </div>
                <div id="r-directions"></div>
            </div>
        </div>

        <div id="addresses" class="container">
            <div class="row">
                {foreach $addresses as $addr}
                    <div class="col-xs-12 col-sm-6">
                        <ul>
                            <li>{$addr.company}</li>
                            <li>{$addr.address}, {$addr.postcode} {$addr.city}, {$addr.country}</li>
                            <li>{$addr.link}</li>
                        </ul>
                        <p>
                            <a href="#" class="select-marker" data-marker="{$addr@index}">See on map</a>
                        </p>
                    </div>
                {/foreach}
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