{extends file="layout.tpl"}
{block name="styleSheet" append}
    {include file="css.tpl"}
{/block}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <h1>Carte googlemap</h1>
    {include file="section/tab.tpl"}
    <!-- Notifications Messages -->
    <div class="mc-message clearfix"></div>
    {if !$smarty.get.tab}
        {*<p class="btn-row">
            <a class="btn btn-primary" href="#" id="open-add">
                <span class="fa fa-plus"></span> {#add_a_page#|ucfirst}
            </a>
        </p>*}
        {*<div id="load_plugin_gmap"></div>*}
        <p class="btn-row" id="addbtn">
            <a class="toggleModal btn btn-primary" data-toggle="modal" data-target="#add-page" href="#">
                <span class="fa fa-plus"></span>
                {#add_a_page#|ucfirst}
            </a>
        </p>
        <table class="table table-bordered table-condensed table-hover">
            <thead>
            <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Contenu</th>
                <th><span class="fa fa-flag"></span></th>
                <th><span class="fa fa-edit"></span></th>
                <th><span class="fa fa-trash-o"></span></th>
            </tr>
            </thead>
            <tbody id="list_page">
            {include file="loop/items-page.tpl"}
            {include file="no-entry.tpl"}
            </tbody>
        </table>
        {include file="modal/addpage.tpl"}
    {elseif $smarty.get.tab eq "config"}
        {include file="forms/config.tpl"}
    {/if}
{/block}
{block name="modal"}
    {include file="modal/delete.tpl"}
{/block}
{block name='javascript' prepend}
    <script src="http://maps.google.com/maps/api/js?language=fr{if $config.api_key != '' OR $config.api_key != NULL}&amp;key={$config.api_key}{/if}" type="text/javascript"></script>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}