/**
 * MAGIX CMS
 * @category   gmap
 * @package    plugins
 * @copyright  MAGIX CMS Copyright (c) 2012 Gerits Aurelien,
 * http://www.magix-cms.com, http://www.magix-cjquery.com, http://www.magix-dev.be
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    1.6
 * @author Gérits Aurélien <aurelien[at]magix-cms.com>|<contact[at]magix-dev.be> , jean-baptiste demonte (http://gmap3.net/)
 * @name gmap
 * Date: 15/11/12
 * Time: 00:11
 * La géolocalisation avec Googlemap (gmap3)
 *
 */
var MC_plugins_gmap = (function ($, undefined) {
    //Fonction Private
    function jsonListIndex(baseadmin,getlang,iso){
        $.nicenotify({
            ntype: "ajax",
            uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&json_map_record=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                var loader = $(document.createElement("span")).addClass("loader offset5").append(
                    $(document.createElement("img"))
                        .attr('src','/'+baseadmin+'/template/img/loader/small_loading.gif')
                        .attr('width','20px')
                        .attr('height','20px')
                )
                $('#load_plugin_gmap').html(loader);
            },
            successParams:function(j){
                $('#load_plugin_gmap').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                var tbl = $(document.createElement('table')),
                    tbody = $(document.createElement('tbody'));
                tbl.attr("id", "table_plugin_gmap")
                    .addClass('table table-bordered table-condensed table-hover')
                    .append(
                    $(document.createElement("thead"))
                        .append(
                        $(document.createElement("tr"))
                            .append(
                            $(document.createElement("th")).append("ID"),
                            $(document.createElement("th")).append(Globalize.localize( "heading", iso )),
                            $(document.createElement("th")).append(
                                Globalize.localize( "content", iso )
                            ),
                            $(document.createElement("th")).append(
                                Globalize.localize( "nickname", iso )
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("icon-flag")
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("icon-edit")
                            ),
                            $(document.createElement("th"))
                                .append(
                                $(document.createElement("span"))
                                    .addClass("icon-trash")
                            )
                        )
                    ),
                    tbody
                );
                tbl.appendTo('#load_plugin_gmap');
                if(j === undefined){
                    console.log(j);
                }
                if(j !== null){
                    $.each(j, function(i,item) {
                        if(item.content_map != 0){
                            var contentMap = $(document.createElement("span")).addClass("icon-check");
                        }else{
                            var contentMap = $(document.createElement("span")).addClass("icon-warning-sign");
                        }
                        if(item.lang != null){
                            var flaglang = item.lang;
                        }else{
                            var flaglang = $(document.createElement("span")).addClass("icon-warning-sign");
                        }
                        tbody.append(
                            $(document.createElement("tr"))
                                .append(
                                $(document.createElement("td")).append(item.idgmap),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                    .attr("href", '/admin/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit='+item.idgmap)
                                    .attr("title", "Edit")
                                    .append(
                                        item.name_map
                                    )
                                ),
                                $(document.createElement("td")).append(contentMap),
                                $(document.createElement("td")).append(item.pseudo),
                                $(document.createElement("td")).append(flaglang),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                        .attr("href", '/admin/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit='+item.idgmap)
                                        .attr("title", "Edit")
                                        .append(
                                            $(document.createElement("span"))
                                                .addClass("icon-edit")
                                    )
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                        .addClass("d-plugin-gmap")
                                        .attr("href", "#")
                                        .attr("data-delete", item.idgmap)
                                        .attr("title", Globalize.localize( "remove", iso )+": "+item.name_map)
                                        .append(
                                        $(document.createElement("span")).addClass("icon-trash")
                                    )
                                )
                            )
                        )
                    });
                }else{
                    tbody.append(
                        $(document.createElement("tr"))
                            .append(
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            )
                        )
                    )
                }
            }
        });
    }
    function addPage(baseadmin,getlang,iso){
        var formsAddMap = $("#forms_plugins_gmap_add").validate({
            onsubmit: true,
            event: 'submit',
            rules: {
                name_map: {
                    required: true,
                    minlength: 2
                }
            },
            submitHandler: function(form) {
                $.nicenotify({
                    ntype: "submit",
                    uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang,
                    typesend: 'post',
                    idforms: $(form),
                    resetform: true,
                    beforeParams:function(){},
                    successParams:function(e){
                        $.nicenotify.initbox(e,{
                            display:true
                        });
                        jsonListIndex(baseadmin,getlang,iso);
                    }
                });
                return false;
            }
        });
        $('#open-add').on('click',function(){
            $('#forms-add').dialog({
                modal: true,
                resizable: true,
                width: 400,
                height:'auto',
                minHeight: 210,
                buttons: {
                    'Save': function() {
                        $("#forms_plugins_gmap_add").submit();
                    },
                    Cancel: function() {
                        $(this).dialog('close');
                        formsAddMap.resetForm();
                    }
                }
            });
            return false;
        });
    }
    function updatePage(baseadmin,getlang,edit){
        $("#forms_plugins_gmap_edit").on('submit',function(){
            var idgmap = $('#idgmap').val();
            $.nicenotify({
                ntype: "submit",
                uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit='+edit,
                typesend: 'post',
                idforms: $(this),
                beforeParams:function(){},
                successParams:function(e){
                    $.nicenotify.initbox(e,{
                        display:true
                    });
                }
            });
            return false;
        });
    }
    function updateConfig(baseadmin,getlang){
        $("#forms_plugins_gmap_config").on('submit',function(){
            $.nicenotify({
                ntype: "submit",
                uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&tab=config',
                typesend: 'post',
                idforms: $(this),
                beforeParams:function(){},
                successParams:function(e){
                    $.nicenotify.initbox(e,{
                        display:true
                    });
                }
            });
            return false;
        });
    }
    function loadConfig(){
        $('#contener-map').addClass("map-col");
        var infocontent = $('#adress_map').val()+'<br />'+$('#city_map').val()+' '+$('#country_map').val();
        var adr = $('#adress_map').val()+','+$('#city_map').val()+' '+$('#country_map').val();
        $('#contener-map').gmap3({
            clear:{name:'marker'},
            map:{
                address: adr,
                options:{
                    zoom:14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    navigationControl: true,
                    scrollwheel: true,
                    streetViewControl: true
                }
            },
            marker:{
                address: adr,
                options:{
                    draggable: true
                },
                events: {
                    dragend:function(marker){
                        $("#lat_map").val( marker.getPosition().lat() );
                        $("#lng_map").val( marker.getPosition().lng() );
                        $(this).gmap3({
                            getaddress:{
                                latLng:marker.getPosition(),
                                callback:function(results){
                                    var map = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({get:"infowindow"}),
                                    //content = results && results[1] ? results && results[1].formatted_address : "no address";
                                        arrAddress = results[0].address_components;
                                    var content,sublocality,locality,postcode,country;

                                    $.each(arrAddress, function (i, component) {
                                        //console.log(component.types[0]);
                                        if (component.types[0] == "sublocality"){
                                            sublocality = component.long_name;
                                        }
                                        if (component.types[0] == "locality"){
                                            locality = component.long_name;
                                        }
                                        if (component.types[0] == "postal_code"){
                                            postcode = component.long_name;
                                        }
                                        if (component.types[0] == "country"){
                                            country = component.long_name;
                                        }
                                        //return false; // break the loop*/
                                        if(typeof sublocality !== "undefined"){
                                            content = sublocality+'&nbsp;'+postcode+'<br />'+country;
                                        }else{
                                            content = locality+'&nbsp;'+postcode+'<br />'+country;
                                        }
                                    });
                                    if (infowindow){
                                        infowindow.open(map, marker);
                                        infowindow.setContent(content);
                                    } else {
                                        $(this).gmap3({
                                            infowindow:{
                                                anchor:marker,
                                                options:{
                                                    size: new google.maps.Size(20,20),
                                                    content: content
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                },
                callback:function(marker){
                    if (marker){
                        $("#lat_map").val( marker.getPosition().lat() );
                        $("#lng_map").val( marker.getPosition().lng() );
                    }
                }
            },
            infowindow:{
                options:{
                    size: new google.maps.Size(20,20),
                    content: infocontent
                }
            }
        });

    }
    function remove(baseadmin,getlang){
        $(document).on('click','.d-plugin-gmap',function (event){
            event.preventDefault();
            var lg = $(this).attr("rel");
            $("#dialog").dialog({
                bgiframe: true,
                resizable: false,
                height:140,
                modal: true,
                title: 'Supprimé cet enregistrement',
                buttons: {
                    'Delete item': function() {
                        $(this).dialog('close');
                        $.nicenotify({
                            ntype: "ajax",
                            uri: "/admin/plugins.php?name=gmap&getlang="+getlang,
                            typesend: 'post',
                            noticedata : {deletemap:lg},
                            beforeParams:function(){},
                            successParams:function(e){
                                $.nicenotify.initbox(e,{
                                    display:false
                                });
                                jsonListIndex(baseadmin,getlang,iso);
                            }
                        });
                    },
                    Cancel: function() {
                        $(this).dialog('close');
                    }
                }
            });
        });
    }
    function jsonListRel(baseadmin,getlang,iso,edit){
        $.nicenotify({
            ntype: "ajax",
            uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit='+edit+'&tab=multimarkers&json_map_relative=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                var loader = $(document.createElement("span")).addClass("loader offset5").append(
                    $(document.createElement("img"))
                        .attr('src','/'+baseadmin+'/template/img/loader/small_loading.gif')
                        .attr('width','20px')
                        .attr('height','20px')
                )
                $('#load_rel_gmap').html(loader);
            },
            successParams:function(j){
                $('#load_rel_gmap').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                var tbl = $(document.createElement('table')),
                    tbody = $(document.createElement('tbody'));
                tbl.attr("id", "table-plugin-gmap-rel")
                    .addClass('table table-bordered table-condensed table-hover')
                    .append(
                    $(document.createElement("thead"))
                        .append(
                        $(document.createElement("tr"))
                            .append(
                            $(document.createElement("th")).append("ID"),
                            $(document.createElement("th")).append("Société"),
                            $(document.createElement("th")).append("Pays"),
                            $(document.createElement("th")).append("Ville"),
                            $(document.createElement("th")).append("Adresse"),
                            $(document.createElement("th"))
                                .append(
                                    $(document.createElement("span")).addClass("icon-trash")
                            )
                        )
                    ),
                    tbody
                );
                tbl.appendTo('#load_rel_gmap');
                if(j === undefined){
                    console.log(j);
                }
                if(j !== null){
                    $.each(j, function(i,item) {
                        tbody.append(
                            $(document.createElement("tr"))
                                .append(
                                $(document.createElement("td")).append(item.id_adress),
                                $(document.createElement("td")).append(item.society_ga),
                                $(document.createElement("td")).append(item.country_ga),
                                $(document.createElement("td")).append(item.city_ga),
                                $(document.createElement("td")).append(item.adress_ga),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                        .addClass("d-plugin-gmap-rel")
                                        .attr("href", "#")
                                        .attr("rel", item.id_adress)
                                        .attr("title", "Remove")
                                        .append(
                                            $(document.createElement("span")).addClass("icon-trash")
                                    )
                                )
                            )
                        )
                    });
                }else{
                    tbody.append(
                        $(document.createElement("tr"))
                            .append(
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("icon-minus")
                            )
                        )
                    )
                }
            }
        });
    }
    function addAdress(baseadmin,getlang,iso,edit){
        $('#forms_plugins_gmap_related').validate({
            onsubmit: true,
            event: 'submit',
            rules: {
                society_ga: {
                    required: true
                },
                country_ga: {
                    required: true
                },
                city_ga: {
                    required: true
                },
                adress_ga: {
                    required: true,
                    minlength: 2
                }
            },
            submitHandler: function(form) {
                $.nicenotify({
                    ntype: "submit",
                    uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit='+edit+'&tab=multimarkers',
                    typesend: 'post',
                    idforms: $(form),
                    resetform: true,
                    beforeParams:function(){},
                    successParams:function(e){
                        $.nicenotify.initbox(e,{
                            display:true
                        });
                        jsonListRel(baseadmin,getlang,iso,edit);
                    }
                });
                return false;
            }
        });
    }
    function removeAdress(baseadmin,getlang,iso){
        $(document).on('click','.d-plugin-gmap-rel',function (event){
            event.preventDefault();
            var lg = $(this).attr("rel");
            $("#dialog").dialog({
                bgiframe: true,
                resizable: false,
                height:140,
                modal: true,
                title: Globalize.localize( "delete_item", iso ),
                buttons: {
                    'Delete item': function() {
                        $(this).dialog('close');
                        $.nicenotify({
                            ntype: "ajax",
                            uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang,
                            typesend: 'post',
                            noticedata : {delete_rel_map:lg},
                            beforeParams:function(){},
                            successParams:function(e){
                                $.nicenotify.initbox(e,{
                                    display:false
                                });
                                jsonListRel(baseadmin,getlang,iso,$('#idgmap').val());
                            }
                        });
                    },
                    Cancel: function() {
                        $(this).dialog('close');
                    }
                }
            });
        });
    }
    function loadRelated(){
        $('#contener-map').addClass("map-col");
        var infocontent = $('#adress_ga').val()+'<br />'+$('#city_ga').val()+' '+$('#country_ga').val();
        var adr = $('#adress_ga').val()+','+$('#city_ga').val()+' '+$('#country_ga').val();
        $('#contener-map').gmap3({
            clear:{name:'marker'},
            map:{
                address: adr,
                options:{
                    zoom:14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    navigationControl: true,
                    scrollwheel: true,
                    streetViewControl: true
                }
            },
            marker:{
                address: adr,
                options:{
                    draggable: true
                },
                events: {
                    dragend:function(marker){
                        $("#lat_ga").val( marker.getPosition().lat() );
                        $("#lng_ga").val( marker.getPosition().lng() );
                        $(this).gmap3({
                            getaddress:{
                                latLng:marker.getPosition(),
                                callback:function(results){
                                    var map = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({get:"infowindow"}),
                                    //content = results && results[1] ? results && results[1].formatted_address : "no address";
                                        arrAddress = results[0].address_components;
                                    var content,sublocality,locality,postcode,country;

                                    $.each(arrAddress, function (i, component) {
                                        //console.log(component.types[0]);
                                        if (component.types[0] == "sublocality"){
                                            sublocality = component.long_name;
                                        }
                                        if (component.types[0] == "locality"){
                                            locality = component.long_name;
                                        }
                                        if (component.types[0] == "postal_code"){
                                            postcode = component.long_name;
                                        }
                                        if (component.types[0] == "country"){
                                            country = component.long_name;
                                        }
                                        //return false; // break the loop*/
                                        if(typeof sublocality !== "undefined"){
                                            content = sublocality+'&nbsp;'+postcode+'<br />'+country;
                                        }else{
                                            content = locality+'&nbsp;'+postcode+'<br />'+country;
                                        }
                                    });
                                    if (infowindow){
                                        infowindow.open(map, marker);
                                        infowindow.setContent(content);
                                    } else {
                                        $(this).gmap3({
                                            infowindow:{
                                                anchor:marker,
                                                options:{
                                                    size: new google.maps.Size(20,20),
                                                    content: content
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                },
                callback:function(marker){
                    if (marker){
                        $("#lat_ga").val( marker.getPosition().lat() );
                        $("#lng_ga").val( marker.getPosition().lng() );
                    }
                }
            },
            infowindow:{
                options:{
                    size: new google.maps.Size(20,20),
                    content: infocontent
                }
            }
        });
    }
    return {
        //Fonction Public
        runList:function(baseadmin,getlang,iso){
            jsonListIndex(baseadmin,getlang,iso);
            remove(baseadmin,getlang,iso);
            addPage(baseadmin,getlang,iso);
        },
        mapConfig:function(){
            loadConfig();
        },
        runConfig:function (baseadmin,getlang) {
            updateConfig(baseadmin,getlang);
            if($("#contener-map").length !=0){
                $('#adress_map,#city_map').keypress(function(){
                    $.mapTimer({ts:'',func:'MC_plugins_gmap.mapConfig();'});
                }).change(function(){
                    $.mapTimer({ts:100,func:'MC_plugins_gmap.mapConfig();'});
                });
            }
        },
        mapRelated:function(){
            loadRelated();
        },
        runEdit:function(baseadmin,getlang,edit){
            updatePage(baseadmin,getlang,edit);
        },
        runRelated:function(baseadmin,getlang,iso,edit){
            jsonListRel(baseadmin,getlang,iso,edit);
            removeAdress(baseadmin,getlang,iso);
            addAdress(baseadmin,getlang,iso,edit);
            if($("#contener-map").length !=0){
                $('#adress_ga,#city_ga').keypress(function(){
                    $.mapTimer({ts:'',func:'MC_plugins_gmap.mapRelated();'});
                }).change(function(){
                    $.mapTimer({ts:100,func:'MC_plugins_gmap.mapRelated();'});
                });
            }
        }
    };
})(jQuery);