{extends file="layout.tpl"}
{block name="styleSheet" append}
    {include file="css.tpl"}
{/block}
{block name='body:id'}plugins-{$pluginName}{/block}
{block name="article:content"}
    {include file="section/nav.tpl"}
    <!-- Notifications Messages -->
    <div class="mc-message clearfix"></div>
{/block}
{block name='javascript'}
    {include file="js.tpl"}
{/block}