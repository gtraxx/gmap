<nav class="navbar navbar-default">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="fa fa-bar"></span>
            <span class="fa fa-bar"></span>
            <span class="fa fa-bar"></span>
        </button>
        <a class="navbar-brand" href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=addresses&amp;action=list">Gmap</a>
    </div>
    <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav">
            <li><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=list"><span class="fa fa-map-marker"></span>&nbsp;{#addresses#}</a></li>
            <li><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=content&amp;action=edit"><span class="fa fa-file-text-o"></span>&nbsp;{#content#}</a></li>
            <li><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=config&amp;action=edit"><span class="fa fa-cog"></span>&nbsp;{#config#}</a></li>
            <li class="dropdown">
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">{#languages#|ucfirst} <b class="caret"></b></a>
                <ul class="dropdown-menu">
                    {foreach $array_lang as $key => $value nocache}
                        <li>
                            <a href="{$pluginUrl}&amp;getlang={$key}&amp;tab=addresses&amp;action=list">
                                {$value|upper}
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li class="pull-right">
                <a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=about"><span class="fa fa-info-circle"></span> {#about_plugin#|ucfirst}</a>
            </li>
        </ul>
    </div>
</nav>