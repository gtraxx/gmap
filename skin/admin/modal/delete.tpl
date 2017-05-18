<div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="delete-address" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">{#close#|ucfirst}</span></button>
                <h4 class="modal-title" id="delete-address">{#delete_address#|ucfirst}</h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-warning" role="alert">
                    <p><span class="fa fa-warning"></span> {#delete_address_warning#}</p>
                </div>
            </div>
            <div class="modal-footer">
                <form id="delete_address_form" class="validate_form delete_form" method="post" action="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=delete">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{#cancel#|ucfirst}</button>
                    <input type="submit" class="btn btn-primary" value="{#delete#|ucfirst}" />
                    <input type="hidden" id="id" name="id" value="" />
                </form>
            </div>
        </div>
    </div>
</div>