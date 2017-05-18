<form method="post" action="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=config&amp;action=edit" class="validate_form">
    <fieldset>
        <legend>Configuration</legend>
        <div class="form-group">
            <label for="api_key">API KEY :</label>
            <input type="text" class="form-control" id="api_key" name="config[api_key]" value="{$getConfigData.api_key}" size="50" />
        </div>
        <div class="form-group">
            <label>Marqueur :</label>
            {if is_array($markerCollection) && !empty($markerCollection)}
            {foreach $markerCollection as $key => $val}
                <label class="radio-inline">
                <input type="radio" name="config[marker]" {if {$val|substr:0:-4} eq $getConfigData.marker}checked="checked"{/if} value="{$val|substr:0:-4}" />
                <img alt="marker {$val}" src="/plugins/gmap/markers/{$val}" />
                </label>
            {/foreach}
            {/if}
        </div>
    </fieldset>
    <fieldset>
        <legend>Enregistrer</legend>
        <button type="submit" class="btn btn-primary">{#save#|ucfirst}</button>
    </fieldset>
</form>