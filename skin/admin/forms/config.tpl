<form id="forms_plugins_gmap_config" method="post" action="">
    <div class="row">
    <div class="col-lg-5 col-sm-5">
        <div class="form-group">
            <label for="society_map">Société :</label>
            <input type="text" class="form-control" id="society_map" name="society_map" value="{$config.society_map}" size="50" />
        </div>
        <div class="form-group">
            <label for="country_map">Pays :</label>
            <input type="text" class="form-control" id="country_map" name="country_map" value="{$config.country_map}" size="50" />
        </div>
        <div class="form-group">
            <label for="city_map">Ville :</label>
            <input type="text" class="form-control" id="city_map" name="city_map" value="{$config.city_map}" size="50" />
        </div>
    </div>
    <div class="col-lg-6 col-sm-6">
        <div class="form-group">
            <label for="adress_map">Adresse :</label>
            <input type="text" class="form-control" id="adress_map" name="adress_map" value="{$config.adress_map}" size="50" />
        </div>
        <div class="form-group">
            <label>Itinéraire :</label>
            {if $config.route_map eq '0'}
                <label class="radio-inline">
                    <input type="radio" name="route_map" checked="checked" value="0" /> OFF
                </label>
                <label class="radio-inline">
                    <input type="radio" name="route_map" value="1" /> ON
                </label>
            {else}
                <label class="radio-inline">
                    <input type="radio" name="route_map" value="0" /> OFF
                </label>
                <label class="radio-inline">
                    <input type="radio" name="route_map" checked="checked" value="1" /> ON
                </label>
            {/if}
        </div>
        <div class="form-group">
            <label>Mode multi adresse :</label>
            {if $config.multi_marker eq '0'}
                <label class="radio-inline">
                    <input type="radio" name="multi_marker" checked="checked" value="0" /> OFF
                </label>
                <label class="radio-inline">
                    <input type="radio" name="multi_marker" value="1" /> ON
                </label>
            {else}
                <label class="radio-inline">
                    <input type="radio" name="multi_marker" value="0" /> OFF
                </label>
                <label class="radio-inline">
                    <input type="radio" name="multi_marker" checked="checked" value="1" /> ON
                </label>
            {/if}
        </div>
        <div class="form-group">
            <label>Marqueur :</label>
            {$markers}
        </div>
    </div>
        <div class="map-position">
            <input type="hidden" name="lat_map" id="lat_map" value="{$config.lat_map}" />
            <input type="hidden" name="lng_map" id="lng_map" value="{$config.lng_map}" />
        </div>
    </div>
    <p>
        <input type="submit" class="btn btn-primary" value="{#send#|ucfirst}" />
    </p>
</form>
<div class="row">
    <div id="contener-map" class="col-lg-5 col-sm-5"></div>
</div>