<h2>{#edit_address#}</h2>
<form id="forms_plugins_gmap_related_edit" method="post" action="">
    <div class="form-group col-xs-12">
        <label for="society_ga" class="col-sm-3 control-label">Société :</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="society_ga" name="society_ga" value="{$getAddressData.society_ga}" size="50" />
        </div>
    </div>
    <div class="form-group col-xs-12">
        <label class="col-sm-3 control-label" for="country_map">
            Pays :
        </label>
        <div class="col-sm-9">
            <select class="form-control" id="country_ga" name="country_ga">
                <option value="">{#select_country#}</option>
                {foreach $countryTools as $key => $val}
                    <option value="{#$val.iso#}"{if $getAddressData.country_ga eq #$val.iso#} selected{/if}>{#$val.iso#|ucfirst}</option>
                {/foreach}
            </select>
        </div>
    </div>
    <div class="form-group col-xs-12">
        <label for="city_ga" class="col-sm-3 control-label">Ville :</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="city_ga" name="city_ga" value="{$getAddressData.city_ga}" size="50" />
        </div>
    </div>
    <div class="form-group col-xs-12">
        <label for="postcode_ga" class="col-sm-3 control-label">Code postal :</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="postcode_ga" name="postcode_ga" value="{$getAddressData.postcode_ga}" size="50" />
        </div>
    </div>
    <div class="form-group col-xs-12">
        <label for="adress_ga" class="col-sm-3 control-label">Adresse :</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="adress_ga" name="adress_ga" value="{$getAddressData.adress_ga}" size="50" />
        </div>
    </div>
    <div class="form-group col-xs-12">
        <label for="link_ga" class="col-sm-3 control-label">Liens :</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="link_ga" name="link_ga" value="{$getAddressData.link_ga}" size="50" />
        </div>
    </div>
    <div class="form-group col-xs-12 map-position">
        <div class="col-sm-10">
            <div class="row">
                <div class=" form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <label for="lat_ga">Latitude</label>
                    <input type="text" class="form-control" name="lat_ga" id="lat_ga" value="{$getAddressData.lat_ga}" />
                </div>
                <div class=" form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <label for="lng_ga">Longitude</label>
                    <input type="text" class="form-control" name="lng_ga" id="lng_ga" value="{$getAddressData.lng_ga}" />
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <a class="btn btn-default" href="/admin/plugins.php?name=gmap&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$smarty.get.edit}&amp;tab=multimarkers">{#cancel#|ucfirst}</a>
            <input type="submit" class="btn btn-primary" value="{#save#|ucfirst}" />
        </div>
    </div>
</form>
<div id="contener-map" class="map-col"></div>