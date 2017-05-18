{extends file="layout.tpl"}
{block name="styleSheet" append}
    {include file="css.tpl"}
{/block}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <!-- Notifications Messages -->
    <div class="mc-message clearfix"></div>
    <p>
        <a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=add" class="btn btn-primary">
            <span class="fa fa-plus"></span> {#add_adress#}
        </a>
    </p>
    <table class="table table-bordered">
        <thead>
        <tr>
            <th>{#company_name#}</th>
            <th>{#address_full#}</th>
            <th>{#about#}</th>
            <th><span class="fa fa-phone"></span></th>
            <th><span class="fa fa-mobile"></span></th>
            <th><span class="fa fa-fax"></span></th>
            <th><span class="fa fa-envelope"></span></th>
            <th><span class="fa fa-edit"></span></th>
            <th><span class="fa fa-trash-o"></span></th>
        </tr>
        </thead>
        <tbody id="table_address" class="ui-sortable">
        {if {$addresses|count}}
            {include file="loop/address.tpl"}
        {/if}
        {include file="no-entry.tpl"}
        </tbody>
    </table>
{/block}
{block name="modal"}
    {include file="modal/delete.tpl"}
{/block}
{block name='javascript' prepend}
    <script src="http://maps.google.com/maps/api/js?language=fr{if $getConfigData.api_key != '' OR $getConfigData.api_key != NULL}&amp;key={$getConfigData.api_key}{/if}" type="text/javascript"></script>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}