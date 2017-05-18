{if $edit}
<h1>{#edit_address#}&nbsp;: {$address.company}</h1>
{else}
<h1>{#add_adress#}</h1>
{/if}
<form method="post" action="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=add" class="validate_form{if !$edit} add_form{/if}">
    <p class="help-block">
        Tous les champs marqué d'un * sont obligatoire
    </p>
    <fieldset>
        <legend>Adresse</legend>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <div class="form-group">
                    <label for="company">{#company#}&nbsp;*</label>
                    <input id="company" type="text" class="form-control required" name="address[company]" placeholder="{#ph_company#}" {if isset($address)} value="{$address.company}"{/if} required/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-5">
                <div class="form-group">
                    <label for="address">{#address#}&nbsp;*</label>
                    <input id="address" type="text" class="form-control required" name="address[address]" placeholder="{#ph_address#}" {if isset($address)} value="{$address.address}"{/if} required/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2">
                <div class="form-group">
                    <label for="postcode">{#postcode#}&nbsp;*</label>
                    <input id="postcode" type="text" class="form-control required" name="address[postcode]" placeholder="{#ph_postcode#}" {if isset($address)} value="{$address.postcode}"{/if} required/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-2">
                <div class="form-group">
                    <label for="city">{#city#}&nbsp;*</label>
                    <input id="city" type="text" class="form-control required" name="address[city]" placeholder="{#ph_city#}" {if isset($address)} value="{$address.city}"{/if} required/>
                </div>
            </div>
            <div class="col-xs-12 col-md-3">
                <label for="country">{#country#}&nbsp;*</label>
                <select id="country" class="form-control required" name="address[country]" required>
                    <option value="">{#select_country#}</option>
                    {foreach $countryTools as $key => $val}
                        <option value="{#$val.iso#}"{if isset($address) && $address.country === #$val.iso#} selected{/if}>{#$val.iso#|ucfirst}</option>
                    {/foreach}
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                    <label for="lat">{#lat#}&nbsp;*</label>
                    <input id="lat" type="text" class="form-control required" name="address[lat]" placeholder="{#ph_lat#}" {if isset($address)} value="{$address.lat}"{/if} required/>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                    <label for="lng">{#lng#}&nbsp;*</label>
                    <input id="lng" type="text" class="form-control required" name="address[lng]" placeholder="{#ph_lng#}" {if isset($address)} value="{$address.lng}"{/if} required/>
                </div>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>Informations Complémentaires</legend>
        <div class="row">
            <div class="col-xs-12 col-md-4">
                <div class="form-group">
                    <label for="phone">{#phone#}</label>
                    <input id="phone" type="text" class="form-control" name="address[phone]" placeholder="{#ph_phone#}" {if isset($address)} value="{$address.phone}"{/if} />
                </div>
                <div class="form-group">
                    <label for="mobile">{#mobile#}</label>
                    <input id="mobile" type="text" class="form-control" name="address[mobile]" placeholder="{#ph_mobile#}" {if isset($address)} value="{$address.mobile}"{/if} />
                </div>
                <div class="form-group">
                    <label for="fax">{#fax#}</label>
                    <input id="fax" type="text" class="form-control" name="address[fax]" placeholder="{#ph_fax#}" {if isset($address)} value="{$address.fax}"{/if} />
                </div>
                <div class="form-group">
                    <label for="email">{#email#}</label>
                    <input id="email" type="text" class="form-control" name="address[email]" placeholder="{#ph_email#}" {if isset($address)} value="{$address.email}"{/if} />
                </div>
            </div>
            <div class="col-xs-12 col-md-8">
                <label for="about">{#about#}</label>
                <textarea id="about" class="form-control" name="address[about]" cols="30" rows="11">{if isset($address)}{$address.about}{/if}</textarea>
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>Options</legend>
        <div class="form-group">
            <label for="link">{#link#}</label>
            <input id="link" type="text" class="form-control" name="address[link]" placeholder="{#ph_link#}" {if isset($address)} value="{$address.link}"{/if}/>
        </div>
    </fieldset>
    <fieldset>
        <legend>Enregistrer</legend>
        {if $edit}
        <input type="hidden" name="address[id]" value="{$address.id_address}" />
        {/if}
        <a class="btn btn-default" href="{$pluginUrl}&amp;getlang={$smarty.get.getlang}&amp;tab=address&amp;action=list&amp;">{#cancel#|ucfirst}</a>
        <input type="submit" class="btn btn-primary" value="{#save#|ucfirst}" />
    </fieldset>
</form>
<div id="contener-map" class="map-col"></div>