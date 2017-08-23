{if $plugin_status != 0}
    {if !empty($addresses)}
        {if isset($page) && !empty($page)}
            <div class="container">
                <h1 class="text-center {if empty($page.content)} sr-only{/if}">
                    {if isset($page.title) && !empty($page.title)}
                        {$page.title}
                    {else}
                        {#access_plan#}
                    {/if}
                </h1>
                {if isset($page.content) && !empty($page.content)}
                    <div class="gmap-content">
                        {$page.content}
                    </div>
                {/if}
            </div>
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
                    {if isset($mobileBrowser) && $mobileBrowser}
                        <button class="btn btn-default btn-box hidepanel ups">
                            <span class="fa fa-caret-up"></span>
                        </button>
                    {else}
                        <button class="btn btn-default btn-box hidepanel left">
                            <span class="fa fa-caret-left"></span>
                        </button>
                    {/if}
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

        {if count($addresses) > 1}
            <div id="addresses" class="container">
                {foreach $addresses as $addr}
                    {if ($addr@index)%2 == 0}
                        <div class="row">
                    {/if}
                    <div class="col-ph-12 col-sm-6 col-md-4 col-lg-6">
                        {capture name="content"}
                            <h3>{$addr.company}</h3>
                            <p>{$addr.address}, {$addr.postcode} {$addr.city}, {$addr.country}</p>
                            {if $addr.about}<p>{$addr.about}</p>{/if}
                            <p>
                                {if $addr.link}<a href="{$addr.link}" class="btn btn-box btn-invert btn-main-theme"">{#more_infos#}</a>{/if}
                                <a href="#" class="btn btn-box btn-invert btn-main-theme select-marker" data-marker="{$addr@index}">{#see_on_map#}</a>
                            </p>
                        {/capture}
                        {if !empty($addr.img)}
                            <div class="row">
                                <div class="col-ph-12 col-xs-6 col-sm-12 col-lg-6">
                                    <img class="img-responsive" src="{geturl}/upload/gmap/address/{$addr.img}" alt="{$addr.company}">
                                </div>
                                <div class="col-ph-12 col-xs-6 col-sm-12 col-lg-6">
                                    {$smarty.capture.content}
                                </div>
                            </div>
                        {else}
                            {$smarty.capture.content}
                        {/if}
                    </div>
                    {if ($addr@index +1)%2 == 0 || {$addr@last}}
                        </div>
                    {/if}
                {/foreach}
            </div>
        {/if}
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