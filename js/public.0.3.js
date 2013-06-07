/*
 # -- BEGIN LICENSE BLOCK ----------------------------------
 #
 # This file is part of Magix CMS.
 # Magix CMS, a CMS optimized for SEO
 # Copyright (C) 2010 - 2011  Gerits Aurelien <aurelien[at]magix-cms[dot]com>
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.

 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #
 # -- END LICENSE BLOCK -----------------------------------
 */
/**
 * MAGIX CMS
 * @category   gmap
 * @package    plugins
 * @copyright  MAGIX CMS Copyright (c) 2012 Gerits Aurelien,
 * http://www.magix-cms.com, http://www.magix-cjquery.com, http://www.magix-dev.be
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    1.8
 * @author Gérits Aurélien <aurelien[at]magix-cms.com>|<contact[at]magix-dev.be> , jean-baptiste demonte (http://gmap3.net/)
 * @name gmap
 * La géolocalisation avec Googlemap (gmap3)
 *
 */
var gmap = (function ($, undefined) {
    //Function private
    /**
     * Stop évènement
     * @param e
     * @private
     */
    function _stopEvent(e){
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            e.cancelBubble = true;
            e.returnValue = false;
        }
    }

    /**
     * Chargement de la carte par défaut
     * @param item
     */
    function loadMap(item){
        if(item.society != null){
            var infocontent = '<strong>'+item.society+'</strong>'+'<br />'+item.adress+'<br />'+item.city+'<br />'+item.country;
        }else{
            var infocontent = item.adress+'<br />'+item.city+'<br />'+item.country;
        }
        var pos = [item.lat,item.lng];
        $('#map_adress').gmap3({
            map:{
                options:{
                    zoom: 15,
                    center: pos,
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
                latLng: pos,
                options:{
                    draggable:false,
                    icon:new google.maps.MarkerImage("/plugins/gmap/markers/"+item.marker)
                }
            },
            infowindow:{
                options:{
                    size: new google.maps.Size(20,20),
                    content: infocontent
                }
            }
        });
        if(item.route == '1'){
            $('#getadress').autocomplete({
                //This bit uses the geocoder to fetch address values
                source: function(request, response) {
                    $("#map_adress").gmap3({
                        getaddress:{
                            address: request.term,
                            callback:function(results){
                                if (!results) return;
                                response($.map(results, function(item) {
                                    return {
                                        label: item.formatted_address,
                                        value: item.formatted_address,
                                        latLng:item.geometry.location
                                    };
                                }));
                            }
                        }
                    });
                }
            });
        }
    }

    /**
     * Trace la route sur la carte
     * @param button
     * @param item
     */
    function getDirection(button,item){
        if(item.route == '1'){
            $(document).on('click',button,function(event){
                $('#r-directions').empty();
                _stopEvent(event);
                if($('#getadress').val().length != 0){
                    $('#r-directions').addClass('sizedirection').show(800);
                    $('#map_adress').gmap3({
                        clear: {name:"getroute"},
                        getroute:{
                            options:{
                                origin: $('#getadress').val(),
                                destination: item.adress+' '+item.city+','+item.country,
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            },
                            callback: function(results){
                                if (!results) return;
                                $(this).gmap3({
                                    directionsrenderer:{
                                        container: $('#r-directions'),
                                        options:{
                                            directions:results
                                        }
                                    }
                                });
                            }
                        }
                    });
                    $('#getadress').val('');
                }
            });
        }
    }

    /**
     * Chargement des données de la carte au formùat JSON
     * @param button
     * @param iso
     */
    function jsonData(button,iso){
        $.nicenotify({
            ntype: "ajax",
            uri: '/plugins.php?strLangue='+iso+'&magixmod=gmap&jsondata=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                var img = $(document.createElement("img"))
                    .addClass("map_loader")
                    .attr("src", "/plugins/gmap/img/ajax-loader.gif");
                $('#map_adress').html(img);
            },
            successParams:function(j){
                $('#map_adress').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                if(j === undefined){
                    console.log(j);
                    $('#map_adress').text("map is undefined");
                }
                if(j !== null){
                    $.each(j, function(i,item) {
                        if(item.lat != null && item.lng != null){
                            loadMap(item);
                            if(item.adress != null && item.city != null){
                                getDirection(button,item);
                            }
                        }
                    });
                }
            }
        });
    }

    /**
     * Création des markers multiples
     * @param multiadress
     */
    function multiMarker(multiadress){
        /**
         * Initialize les données pour le mode multi adresse
         */
        var latitude = $('meta[itemprop="latitude"]').attr("content");
        var longitude = $('meta[itemprop="longitude"]').attr("content");
        var pos = [latitude,longitude];

        $('#map_adress').gmap3({
            map:{
                options:{
                    zoom: 7,
                    center: pos,
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
                latLng: pos,
                options:{
                    draggable:false,
                    icon:new google.maps.MarkerImage("/plugins/gmap/markers/blue-dot.png")
                },
                events: {
                    click:function(marker){
                        $(this).gmap3({
                            getaddress:{
                                latLng:marker.getPosition(),
                                callback:function(results){
                                    var map = $(this).gmap3("get"),
                                        infowindow = $(this).gmap3({
                                            get:{name:"infowindow"}
                                        }),
                                        arrAddress = results[0].address_components;
                                    var content,sublocality,locality,postcode,country;

                                    $.each(arrAddress, function (i, component) {
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
                                        content = $('span[itemprop="name"]').text()+'<br />';
                                        if(typeof sublocality !== "undefined"){
                                            content += sublocality+'&nbsp;'+postcode+'<br />'+country;
                                        }else{
                                            content += locality+'&nbsp;'+postcode+'<br />'+country;
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
                }
            }
        });
        $('#map_adress').gmap3({
            marker:{
                values:multiadress,
                options:{
                    draggable: false
                },
                events:{
                    click: function(marker, event, context){
                        var map = $(this).gmap3("get"),
                            infowindow = $(this).gmap3({get:{name:"infowindow"}}),
                            society = context.data.society ? context.data.society+'<br />' : '',
                            adress = context.data.adress ? context.data.adress+'<br />' : '',
                            city = context.data.city ? context.data.city+'<br />' : '',
                            country = context.data.country ? context.data.country : '',
                            content = society+adress+city+country;
                        if (infowindow){
                            infowindow.open(map, marker);
                            infowindow.setContent(content);
                        } else {
                            $(this).gmap3({
                                infowindow:{
                                    anchor:marker,
                                    options:{content: content}
                                }
                            });
                        }
                    }
                }
            }
        });
    }

    /**
     * Chargement des données multi marker au format JSON
     * @param iso
     */
    function loadDataMultiMarker(iso){
        /**
         * Requête AJAX pour le mode muti adresse
         */
        $.nicenotify({
            ntype: "ajax",
            uri: '/plugins.php?strLangue='+iso+'&magixmod=gmap&json_multi_data=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                var img = $(document.createElement("img"))
                    .addClass("map_loader")
                    .attr("src", "/plugins/gmap/img/ajax-loader.gif");
                $('#map_adress').html(img);
            },
            successParams:function(j){
                $('#map_adress').empty();
                $.nicenotify.initbox(j,{
                    display:false
                });
                if(j === undefined){
                    console.log(j);
                }else{
                    if(j !== null){
                        multiMarker(j.multi_adress);
                    }else{
                        console.error("Multi adress is null");
                    }
                }
            }
        });
    }
    return {
        //Fonction Public
        run:function(iso){
            jsonData('.subdirection:button',iso);
        },
        runMultiMarker:function(iso){
            loadDataMultiMarker(iso);
        }
    };
})(jQuery);