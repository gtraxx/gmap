{if is_array($getItemsData) && !empty($getItemsData)}
    {foreach $getItemsData as $key}
        <tr id="item_{$key.id_adress}">
            <td>{$key.id_adress}</td>
            <td>{$key.society_ga}</td>
            <td>{$key.adress_ga}</td>
            <td>{$key.postcode_ga}</td>
            <td>{$key.city_ga}</td>
            <td>{$key.country_ga}</td>
            <td><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;action=edit&amp;edit={$smarty.get.edit}&amp;tab=multimarkers&amp;id={$key.id_adress}"><span class="fa fa-edit"></span></a></td>
            <td><a class="toggleModal" data-toggle="modal" data-target="#deleteModal" href="#{$key.id_adress}"><span class="fa fa-trash-o"></span></a></td>
        </tr>
    {/foreach}
{/if}