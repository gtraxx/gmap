<div class="modal fade" id="add-address" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">{#add_a_adress#|ucfirst}</h4>
            </div>
            <form id="forms_plugins_gmap_related" method="post" action="">
                <div class="modal-body row">
                    <div class=" form-group col-xs-12">
                        <label for="society_ga" class="col-sm-3 control-label">Société :</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="society_ga" name="society_ga" value="{$related.society_ga}" size="50" />
                        </div>
                    </div>
                    <div class=" form-group col-xs-12">
                        <label class="col-sm-3 control-label" for="country_map">
                            Pays :
                        </label>
                        <div class="col-sm-9">
                            <select class="form-control" id="country_ga" name="country_ga">
                                <option value="">{#select_country#}</option>
                                {foreach $countryTools as $key => $val}
                                    <option value="{#$val.iso#}"{if $related.country_ga eq #$val.iso#} selected{/if}>{#$val.iso#|ucfirst}</option>
                                {/foreach}
                            </select>
                        </div>
                    </div>
                    <div class=" form-group col-xs-12">
                        <label for="city_ga" class="col-sm-3 control-label">Ville :</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="city_ga" name="city_ga" value="{$related.city_ga}" size="50" />
                        </div>
                    </div>
                    <div class=" form-group col-xs-12">
                        <label for="adress_ga" class="col-sm-3 control-label">Adresse :</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="adress_ga" name="adress_ga" value="{$related.adress_ga}" size="50" />
                        </div>
                    </div>
                    <div class=" form-group col-xs-12 map-position">
                        <div class="col-sm-10">
                            <div class="row">
                                <div class=" form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <label for="lat_ga">Latitude</label>
                                    <input type="text" class="form-control" name="lat_ga" id="lat_ga" value="{$related.lat_ga}" />
                                </div>
                                <div class=" form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                    <label for="lng_ga">Longitude</label>
                                    <input type="text" class="form-control" name="lng_ga" id="lng_ga" value="{$related.lng_ga}" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contener-map" class="map-col"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{#cancel#|ucfirst}</button>
                    <input type="submit" class="btn btn-primary" value="{#save#|ucfirst}" />
                </div>
            </form>
        </div>
    </div>
</div>