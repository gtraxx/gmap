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
var adminMap = (function ($, undefined) {
    //Fonction Private
    function jsonListIndex(){
        $.nicenotify({
            ntype: "ajax",
            uri: '/admin/plugins.php?name=gmap&json_map_record=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                $('#load_plugin_gmap').html('<img class="loader-block" src="/framework/img/square-circle.gif" />');
            },
            successParams:function(j){
                $('#load_plugin_gmap').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                var tbl = $(document.createElement('table')),
                    tbody = $(document.createElement('tbody'));
                tbl.attr("id", "table_plugin_gmap")
                    .addClass('table-plugin-author data-table')
                    .append(
                    $(document.createElement("thead"))
                        .append(
                        $(document.createElement("tr")).addClass('ui-widget ui-widget-header')
                            .append(
                            $(document.createElement("th")).append("ID"),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("lfloat magix-icon magix-icon-h1")
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("lfloat magix-icon magix-icon-note")
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("lfloat magix-icon magix-icon-person")
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("lfloat magix-icon magix-icon-flag")
                            ),
                            $(document.createElement("th")).append(
                                $(document.createElement("span"))
                                    .addClass("lfloat ui-icon ui-icon-pencil")
                            ),
                            $(document.createElement("th"))
                                .append(
                                $(document.createElement("span"))
                                    .addClass("lfloat ui-icon ui-icon-close")
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
                            var contentMap = $(document.createElement("td")).append(
                                $(document.createElement("div")).addClass("ui-state-highlight")
                                    .css({'border': 'none'})
                                    .append(
                                    $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-check")
                                )
                            );
                        }else{
                            var contentMap = $(document.createElement("td")).append(
                                $(document.createElement("div")).addClass("ui-state-error")
                                    .css({'border': 'none'})
                                    .append(
                                    $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-cancel")
                                )
                            );
                        }
                        if(item.lang != null){
                            var flaglang = item.lang;
                        }else{
                            var flaglang = $(document.createElement("div")).addClass("ui-state-error")
                                .css({'border': 'none'})
                                .append(
                                $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-cancel")
                            );
                        }
                        tbody.append(
                            $(document.createElement("tr"))
                                .append(
                                $(document.createElement("td")).append(item.idgmap),
                                $(document.createElement("td")).append(item.name_map),
                                contentMap
                                ,
                                $(document.createElement("td")).append(item.pseudo),
                                $(document.createElement("td")).append(flaglang),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                        .attr("href", '/admin/plugins.php?name=gmap&editmap='+item.idgmap)
                                        .attr("title", "Edit")
                                        .append(
                                        $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-pencil")
                                    )
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("a"))
                                        .addClass("d-plugin-gmap")
                                        .attr("href", "#")
                                        .attr("rel", item.idgmap)
                                        .attr("title", "Remove")
                                        .append(
                                        $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-close")
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
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            )
                        )
                    )
                }
            }
        });
    }
    function addPage(){
        var formsAddMap = $("#forms-plugin-addGmap").validate({
            onsubmit: true,
            event: 'submit',
            rules: {
                name_map: {
                    required: true,
                    minlength: 2
                },
                idlang: {
                    required: true
                }
            },
            messages: {
                name_map: {
                    required: 'The map title is requiered'
                },
                idlang: {
                    required: "Choose the language"
                }
            },
            submitHandler: function(form) {
                $.nicenotify({
                    ntype: "submit",
                    uri: '/admin/plugins.php?name=gmap&postassign=1',
                    typesend: 'post',
                    idforms: form,
                    resetform: true,
                    beforeParams:function(){},
                    successParams:function(e){
                        $.nicenotify.initbox(e,{
                            display:true
                        });
                        jsonListIndex();
                    }
                });
                return false;
            }
        });
        $("#forms-plugin-addGmap").formsAddMap;
    }
    function updatePage(edit){
        $("#forms-plugin-updateGmap").on('submit',function(){
            var idgmap = $('#idgmap').val();
            $.nicenotify({
                ntype: "submit",
                uri: '/admin/plugins.php?name=gmap&editmap='+edit,
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
    function updateConfig(){
        $("#forms-plugin-configGmap").on('submit',function(){
            $.nicenotify({
                ntype: "submit",
                uri: '/admin/plugins.php?name=gmap&updateconfig=1',
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
        $('#configmap').addClass("map-col");
        var infocontent = $('#adress_map').val()+'<br />'+$('#city_map').val()+' '+$('#country_map').val();
        var adr = $('#adress_map').val()+','+$('#city_map').val()+' '+$('#country_map').val();
        $('#configmap').gmap3({
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
    function remove(){
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
                            uri: "/admin/plugins.php?name=gmap",
                            typesend: 'post',
                            noticedata : {deletemap:lg},
                            beforeParams:function(){},
                            successParams:function(e){
                                $.nicenotify.initbox(e,{
                                    display:false
                                });
                                jsonListIndex();
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
    function jsonListRel(edit){
        $.nicenotify({
            ntype: "ajax",
            uri: '/admin/plugins.php?name=gmap&editmap='+edit+'&json_rel_map=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                $('#load_rel_gmap').html('<img class="loader-block" src="/framework/img/square-circle.gif" />');
            },
            successParams:function(j){
                $('#load_rel_gmap').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                var tbl = $(document.createElement('table')),
                    tbody = $(document.createElement('tbody'));
                tbl.attr("id", "table-plugin-gmap-rel")
                    .addClass('table-plugin-author data-table')
                    .append(
                    $(document.createElement("thead"))
                        .append(
                        $(document.createElement("tr")).addClass('ui-widget ui-widget-header')
                            .append(
                            $(document.createElement("th")).append("ID"),
                            $(document.createElement("th")).append("Titre"),
                            $(document.createElement("th")).append("Pays"),
                            $(document.createElement("th")).append("Ville"),
                            $(document.createElement("th")).append("Adresse"),
                            $(document.createElement("th"))
                                .append(
                                $(document.createElement("span"))
                                    .addClass("lfloat ui-icon ui-icon-close")
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
                                        $(document.createElement("span")).addClass("lfloat ui-icon ui-icon-close")
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
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            ),
                            $(document.createElement("td")).append(
                                $(document.createElement("span")).addClass("typicn minus")
                            )
                        )
                    )
                }
            }
        });
    }
    function addAdress(idgmap){
        $("#forms-plugin-gmap-add-rel-adress").on('submit',function(){
            $.nicenotify({
                ntype: "submit",
                uri: '/admin/plugins.php?name=gmap&editmap='+idgmap,
                typesend: 'post',
                idforms: $(this),
                resetform: true,
                beforeParams:function(){},
                successParams:function(e){
                    $.nicenotify.initbox(e,{
                        display:true
                    });
                    jsonListRel(idgmap);
                }
            });
            return false;
        });
    }
    function removeAdress(){
        $(document).on('click','.d-plugin-gmap-rel',function (event){
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
                            uri: "/admin/plugins.php?name=gmap",
                            typesend: 'post',
                            noticedata : {delete_rel_map:lg},
                            beforeParams:function(){},
                            successParams:function(e){
                                $.nicenotify.initbox(e,{
                                    display:false
                                });
                                jsonListRel($('#idgmap').val());
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
        $('#related_map').addClass("map-col");
        var infocontent = $('#adress_ga').val()+'<br />'+$('#city_ga').val()+' '+$('#country_ga').val();
        var adr = $('#adress_ga').val()+','+$('#city_ga').val()+' '+$('#country_ga').val();
        $('#related_map').gmap3({
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
        updateTimer:function(ts,func){
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(func, ts ? ts : 1000);
        },
        mapConfig:function(){
            loadConfig();
        },
        runConfig:function () {
            jsonListIndex();
            remove();
            addPage();
            updateConfig()
            if($("#configmap").length !=0){
                $('#adress_map,#city_map').keypress(function(){
                    adminMap.updateTimer('','adminMap.mapConfig();');
                }).change(function(){
                    adminMap.updateTimer(100,'adminMap.mapConfig();');
                });
            }
        },
        maRelated:function(){
            loadRelated();
        },
        runRelated:function(edit){
            updatePage(edit);
            jsonListIndex();
            remove();
            jsonListRel(edit);
            removeAdress();
            addAdress(edit);
            if($("#related_map").length !=0){
                $('#adress_ga,#city_ga').keypress(function(){
                    adminMap.updateTimer('','adminMap.maRelated();');
                }).change(function(){
                    adminMap.updateTimer(100,'adminMap.maRelated();');
                });
            }
        }
    };
})(jQuery);