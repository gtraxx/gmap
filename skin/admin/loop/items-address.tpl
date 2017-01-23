{if is_array($getItemsData) && !empty($getItemsData)}
    {foreach $getItemsData as $key}
        <tr id="item_{$key.id_adress}">
            <td>{$key.id_adress}</td>
            <td>{$key.society_ga}</td>
            <td>{$key.adress_ga}</td>
            <td>{$key.city_ga}</td>
            <td>{$key.country_ga}</td>
            <td><a class="toggleModal" data-toggle="modal" data-target="#deleteModal" href="#{$key.id_adress}"><span class="fa fa-trash-o"></span></a></td>
        </tr>
    {/foreach}
{/if}