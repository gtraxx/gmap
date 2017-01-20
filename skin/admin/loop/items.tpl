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
    {if is_array($getItemsData) && !empty($getItemsData)}
    {foreach $getItemsData as $key}
    <tr id="item_{$key.idgmap}">
        <td>{$key.idgmap}</td>
        <td><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$key.idgmap}">{$key.name_map}</a></td>
        <td>{$key.content_map|strip_tags|truncate:100:'...'}</td>
        <td>{$key.iso|upper}</td>
        <td><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$key.idgmap}"><span class="fa fa-edit"></span></a></td>
        <td><a class="toggleModal" data-toggle="modal" data-target="#deleteModal" href="#{$key.idgmap}"><span class="fa fa-trash-o"></span></a></td>
    </tr>
    {/foreach}
    {/if}
    {include file="no-entry.tpl"}
    </tbody>
</table>