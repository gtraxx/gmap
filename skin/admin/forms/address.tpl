<p>
    <a href="#block-show" class="btn view-block">
        <span class="fa fa-plus"></span> {#add_a_adress#|ucfirst}
    </a>
</p>
<div class="collapse-block" id="block-show">
    <div class="row">
        <div class="col-lg-5 col-sm-5">
        <form id="forms_plugins_gmap_related" method="post" action="">
            <p class="form-group">
                <label for="society_ga">Société :</label>
                <input type="text" class="form-control" id="society_ga" name="society_ga" value="{$related.society_ga}" size="50" />
            </p>
            <p class="form-group">
                <label for="country_ga">Pays :</label>
                <input type="text" class="form-control" id="country_ga" name="country_ga" value="{$related.society_ga}" size="50" />
            </p>
            <p class="form-group">
                <label for="city_ga">Ville :</label>
                <input type="text" class="form-control" id="city_ga" name="city_ga" value="{$related.city_ga}" size="50" />
            </p>
            <p class="form-group">
                <label for="adress_ga">Adresse :</label>
                <input type="text" class="form-control" id="adress_ga" name="adress_ga" value="{$related.adress_ga}" size="50" />
            </p>
            <div class="map-position">
                <input type="hidden" name="lat_ga" id="lat_ga" value="{$related.lat_ga}" />
                <input type="hidden" name="lng_ga" id="lng_ga" value="{$related.lng_ga}" />
            </div>
            <p>
                <input type="submit" class="btn btn-primary" value="{#send#|ucfirst}" />
            </p>
        </form>
        </div>
        <div class="col-lg-6 col-sm-6">
            <div id="contener-map" class="col-lg-11 col-sm-11"></div>
        </div>
    </div>
</div>
<div id="load_rel_gmap"></div>