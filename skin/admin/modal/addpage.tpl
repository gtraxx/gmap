<div class="modal fade" id="add-page" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">{#add_a_page#|ucfirst}</h4>
            </div>
            <form id="forms_plugins_gmap_add" method="post" action="">
                <div class="modal-body row">
                    <div class="form-group col-xs-12">
                        <label for="name_map">{#page_name#|ucfirst}&nbsp;*</label>
                        <input id="name_map" class="form-control" type="text" size="150" value="" name="name_map" placeholder="{#page_name#|ucfirst}" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{#cancel#|ucfirst}</button>
                    <input type="submit" class="btn btn-primary" value="{#save#|ucfirst}" />
                </div>
            </form>
        </div>
    </div>
</div>