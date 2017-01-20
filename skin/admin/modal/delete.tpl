<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">{#delete_gmap#|ucfirst}</h4>
            </div>
            <form id="del_gmap" method="post" action="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;action=delete">
                <div class="modal-body">
                    <span class="fa fa-warning"></span> {#delete_warn#|ucfirst}
                </div>
                <div class="modal-footer">
                    <input type="submit" class="btn btn-primary" value="{#continue#|ucfirst}"/>
                    <input type="hidden" name="delete" id="delete" value=""/>
                </div>
            </form>
        </div>
    </div>
</div>