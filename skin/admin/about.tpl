{extends file="layout.tpl"}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <h1>{$pluginName|ucfirst} Plugin <small>- {#about_plugin#|ucfirst}</small></h1>
    <div class="row">
        <div class="col-xs-12 col-sm-6">
            {$pluginInfo}
        </div>
    </div>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}