<form id="forms_plugins_gmap_config" method="post" action="" class="form-horizontal">
    <fieldset>
        <div class="form-group">
            <label for="api_key" class="col-sm-2 control-label">API KEY :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="society_map" name="api_key" value="{$getConfigData.api_key}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="society_map" class="col-sm-2 control-label">Société :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="society_map" name="society_map" value="{$getConfigData.society_map}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label" for="country_map">
                Pays :
            </label>
            <div class="col-sm-7">
                <select class="form-control" id="country_map" name="country_map">
                    <option value="">{#select_country#}</option>
                    {foreach $countryTools as $key => $val}
                        <option value="{#$val.iso#}"{if $getConfigData.country_map eq #$val.iso#} selected{/if}>{#$val.iso#|ucfirst}</option>
                    {/foreach}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="city_map" class="col-sm-2 control-label">Ville :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="city_map" name="city_map" value="{$getConfigData.city_map}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="postcode_map" class="col-sm-2 control-label">Code postal :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="postcode_map" name="postcode_map" value="{$getConfigData.postcode_map}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="adress_map" class="col-sm-2 control-label">Adresse :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="adress_map" name="adress_map" value="{$getConfigData.adress_map}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="route_map" class="col-sm-2 control-label toggle-label">Itinéraire :</label>
            <div class="col-sm-2">
                <div class="checkbox">
                    <label>
                        <input{if $getConfigData.route_map eq '1'} checked{/if} id="route_map" name="route_map" data-toggle="toggle" type="checkbox" data-on="oui" data-off="non" data-onstyle="primary" data-offstyle="default" >
                    </label>
                </div>
            </div>
            <label for="route_map" class="col-sm-2 control-label toggle-label">Mode multi adresse :</label>
            <div class="col-sm-2">
                <div class="checkbox">
                    <label>
                        <input{if $getConfigData.multi_marker eq '1'} checked{/if} id="multi_marker" name="multi_marker" data-toggle="toggle" type="checkbox" data-on="oui" data-off="non" data-onstyle="primary" data-offstyle="default" >
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">Marqueur :</label>
            <div class="col-sm-9">
            {if is_array($markerCollection) && !empty($markerCollection)}
            {foreach $markerCollection as $key => $val}
                <label class="radio-inline">
                <input type="radio" name="marker" {if $val eq $getConfigData.marker}checked="checked"{/if} value="{$val}" />
                <img alt="marker {$val}" src="/plugins/gmap/markers/{$val}" />
                </label>
            {/foreach}
            {/if}
            </div>
        </div>
        <div class="form-group map-position">
            <label class="col-sm-2 control-label">Position :</label>
            <div class="col-sm-10">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="lat_map">Latitude</label>
                        <input type="text" class="form-control" name="lat_map" id="lat_map" value="{$getConfigData.lat_map}" />
                    </div>
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="lat_map">Longitude</label>
                        <input type="text" class="form-control" name="lng_map" id="lng_map" value="{$getConfigData.lng_map}" />
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-primary">{#save#|ucfirst}</button>
                {*<button type="button" id="btn-map" class="btn btn-success hide-map" data-toggle="modal" data-target="#map-modal">
                    Voir la carte
                </button>*}
            </div>
        </div>
    </fieldset>
</form>
<div id="contener-map" class="map-col"></div>
{*<div class="modal fade" id="map-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Carte</h4>
            </div>
            <div class="modal-body">
                <div id="contener-map" class="map-col"></div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->*}