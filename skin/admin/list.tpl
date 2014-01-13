{extends file="layout.tpl"}
{block name="styleSheet" append}
    {include file="css.tpl"}
{/block}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <h1>Carte googlemap</h1>
    {include file="section/tab.tpl"}
    <div class="mc-message clearfix"></div>
    {if !$smarty.get.tab}
        <p class="btn-row">
            <a class="btn btn-primary" href="#" id="open-add">
                <span class="fa fa-plus"></span> {#add_a_page#|ucfirst}
            </a>
        </p>
        <div id="load_plugin_gmap"></div>
    {elseif $smarty.get.tab eq "config"}
        {include file="forms/config.tpl"}
    {/if}
{/block}
{block name="modal"}
    <div id="window-dialog"></div>
    <div id="forms-add" class="hide-modal" title="{#add_a_new_page#|ucfirst}">
        {include file="forms/add.tpl"}
    </div>
{/block}
{block name='javascript' prepend}
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&language=fr" type="text/javascript"></script>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}