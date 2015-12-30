<p>
    <a href="#block-show" class="btn view-block">
        <span class="fa fa-plus"></span> {#add_a_adress#|ucfirst}
    </a>
</p>
<div class="collapse-block" id="block-show">
    <form id="forms_plugins_gmap_related" method="post" action="" class="form-horizontal">
        <div class="form-group">
            <label for="society_ga" class="col-sm-2 control-label">Société :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="society_ga" name="society_ga" value="{$related.society_ga}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="country_ga" class="col-sm-2 control-label">Pays :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="country_ga" name="country_ga" value="{$related.society_ga}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="city_ga" class="col-sm-2 control-label">Ville :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="city_ga" name="city_ga" value="{$related.city_ga}" size="50" />
            </div>
        </div>
        <div class="form-group">
            <label for="adress_ga" class="col-sm-2 control-label">Adresse :</label>
            <div class="col-sm-7">
                <input type="text" class="form-control" id="adress_ga" name="adress_ga" value="{$related.adress_ga}" size="50" />
            </div>
        </div>
        <div class="form-group map-position">
            <label class="col-sm-2 control-label">Position :</label>
            <div class="col-sm-10">
                <div class="row">
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="lat_ga">Latitude</label>
                        <input type="text" class="form-control" name="lat_ga" id="lat_ga" value="{$related.lat_ga}" />
                    </div>
                    <div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <label for="lng_ga">Longitude</label>
                        <input type="text" class="form-control" name="lng_ga" id="lng_ga" value="{$related.lng_ga}" />
                    </div>
                </div>
            </div>
        </div>
        <p>
            <button type="submit" class="btn btn-primary">{#save#|ucfirst}</button>
            <button type="button" id="btn-map" class="btn btn-success hide-map" data-toggle="modal" data-target="#map-modal">
                Voir la carte
            </button>
        </p>
    </form>
    <div class="modal fade" id="map-modal" tabindex="-1" role="dialog">
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
    </div><!-- /.modal -->
</div>
<div id="load_rel_gmap"></div>