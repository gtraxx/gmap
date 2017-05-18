{if is_array($addresses) && !empty($addresses)}
    {foreach $addresses as $addr}
        <tr id="address_{$addr.id_address}">
            <td>{$addr.company}</td>
            <td>
                {$addr.address},<br/>
                {$addr.postcode} {$addr.city}<br/>
                {$addr.country}
            </td>
            <td>{$addr.about}</td>
            <td>{$addr.phone}</td>
            <td>{$addr.mobile}</td>
            <td>{$addr.fax}</td>
            <td>{$addr.email}</td>
            <td><a href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=edit&amp;edit={$addr.id_address}"><span class="fa fa-edit"></span></a></td>
            <td><a class="toggleModal" data-toggle="modal" data-target="#delete_modal" href="#{$addr.id_address}"><span class="fa fa-trash-o"></span></a></td>
        </tr>
    {/foreach}
{/if}