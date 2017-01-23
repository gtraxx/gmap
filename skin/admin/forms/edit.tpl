<form id="forms_plugins_gmap_edit" method="post" action="">
    <p class="form-group">
        <label for="name_map">{#page_name#|ucfirst} :</label>
        <input type="text" class="form-control" id="name_map" name="name_map" value="{$getData.name_map}" size="50" />
    </p>
    <p>
        <label for="content_page" class="inlinelabel">{#label_content#|ucfirst} :</label>
        <textarea name="content_map" id="content_map" class="mceEditor form-control">{$getData.content_map}</textarea>
    </p>
    <p>
        <input type="submit" class="btn btn-primary" value="{#send#|ucfirst}" />
    </p>
</form>