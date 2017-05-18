<form method="post" action="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=content&amp;action=edit" class="validate_form">
    <fieldset>
        <legend>Contenu de la page</legend>
        <div class="form-group">
            <label for="title">{#page_title#|ucfirst}&nbsp;:</label>
            <input type="text" class="form-control" id="title" name="page[title]" placeholder="{#ph_page_title#}" size="50"{if isset($page)} value="{$page.title}"{/if}/>
        </div>
        <div class="form-group">
            <label for="content">{#page_content#|ucfirst}&nbsp;:</label>
            <textarea id="content" class="mceEditor form-control" name="page[content]">{if isset($page)}{$page.content}{/if}</textarea>
        </div>
    </fieldset>
    <fieldset>
        <legend>Enregistrer</legend>
        <input type="hidden" name="page[id]" value="{$page.idgmap}">
        <input type="submit" class="btn btn-primary" value="{#save#|ucfirst}" />
    </fieldset>
</form>