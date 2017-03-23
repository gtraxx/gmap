{extends file="layout.tpl"}
{block name="styleSheet" append}
    {include file="css.tpl"}
{/block}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <h1>Carte googlemap</h1>
    <ul class="nav nav-tabs clearfix">
        <li{if !$smarty.get.tab} class="active"{/if}>
            <a href="/admin/plugins.php?name=gmap&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$smarty.get.edit}">{#text#|ucfirst}</a>
        </li>
        <li{if $smarty.get.tab eq "multimarkers"} class="active"{/if}>
            <a href="/admin/plugins.php?name=gmap&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$smarty.get.edit}&amp;tab=multimarkers">Multi markers</a>
        </li>
    </ul>
    <div class="mc-message clearfix"></div>
    {if !$smarty.get.tab}
        {include file="forms/edit.tpl"}
    {elseif $smarty.get.tab eq "multimarkers"}
        {if !$smarty.get.id}
        <p class="btn-row" id="addbtn">
            <a class="toggleModal btn btn-primary" data-toggle="modal" data-target="#add-address" href="#">
                <span class="fa fa-plus"></span>
                {#add_a_adress#|ucfirst}
            </a>
        </p>
        <table class="table table-bordered table-condensed table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Société</th>
                <th>Adresse</th>
                <th>Code postal</th>
                <th>Ville</th>
                <th>Pays</th>
                <th><span class="fa fa-edit"></span></th>
                <th><span class="fa fa-trash-o"></span></th>
            </tr>
            </thead>
            <tbody id="list_page">
            {include file="loop/items-address.tpl"}
            {include file="no-entry.tpl"}
            </tbody>
        </table>
        {include file="modal/address.tpl"}
        {else}
            {include file="forms/address.tpl"}
        {/if}
    {/if}
{/block}
{block name="modal"}
    {include file="modal/delete-address.tpl"}
{/block}
{block name='javascript' prepend}
    <script src="http://maps.google.com/maps/api/js?language=fr{if $config.api_key != '' OR $config.api_key != NULL}&amp;key={$config.api_key}{/if}" type="text/javascript"></script>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}