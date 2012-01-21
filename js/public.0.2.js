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
 * @version    1.6
 * @author Gérits Aurélien <aurelien[at]magix-cms.com>|<contact[at]magix-dev.be> , jean-baptiste demonte (http://gmap3.net/)
 * @name gmap
 * La géolocalisation avec Googlemap (gmap3)
 *
 */
var gmapping = {
	_stopEvent:function(e){
		if (e.stopPropagation) {
		      e.stopPropagation();
		      e.preventDefault();
		    } else {
		      e.cancelBubble = true;
		      e.returnValue = false;
		    }
	},
	_loadMap:function(item){
			if(item.society != null){
				var infocontent = '<strong>'+item.society+'</strong>'+'<br />'+item.adress+'<br />'+item.city+'<br />'+item.country;
			}else{
				var infocontent = item.adress+'<br />'+item.city+'<br />'+item.country;
			}
			var pos = [item.lat,item.lng];
		    $('#map_adress').gmap3(
		    	{
		            action: 'addMarker',
		            latLng: pos,
		            map:{
		                center: true,
		                zoom: 15,
		                mapTypeId: google.maps.MapTypeId.ROADMAP,
					    mapTypeControl: true,
					    mapTypeControlOptions: {
					      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
					    },
					    navigationControl: true,
					    scrollwheel: true,
					    streetViewControl: true
		            },marker:{
		            	options:{
		            		draggable: false,
		            		icon:new google.maps.MarkerImage("/plugins/gmap/markers/"+item.marker)
		            	}
		            },infowindow:{
		                options:{
		                  size: new google.maps.Size(20,20),
		                  content: infocontent
		                }
		            }
		        },
			  { action:'addDirectionsRenderer',
			    options:{
			        preserveViewport: true,
			        draggable: true
			    }
			  }
			);
		    if(item.route == '1'){
	    	$('#getadress').autocomplete({
    		  //This bit uses the geocoder to fetch address values
    		  source: function(request, response) {
    		    $("#map_adress").gmap3({
    		      action:'getAddress',
    		      address: request.term,
    		      callback:function(results){
    		        if (!results) return;
    		        response($.map(results, function(item) {
				      return {
				         label:  item.formatted_address,
				         value: item.formatted_address,
				         latLng: item.geometry.location
			          };
    		        }));
    		      }
    		    });
    		  }
    		  //This bit is executed upon selection of an address
    		  /*select: function(event, ui) {
    		    $("#map_adress").gmap3(
    		      {action:'clear', name:'marker'},
    		      {action:'addMarker',
    		        latLng:ui.item.latLng,
    		        map:{center:true}
    		      }
    		    );
    		  }*/
    		});
	    }
	},
	_getDirection:function(item){
		if(item.route == '1'){
			$('.subdirection:button').on('click',function(event){
				gmapping._stopEvent(event);
		    	if($('#getadress').val().length != 0){
		    		$('#r-directions').addClass('sizedirection').show(800);
					  $('#map_adress').gmap3(
						{action:'clear'},
						{ 
					    action:'getRoute',
					    options:{
					    	origin:$('#getadress').val(),
					        destination:item.adress+' '+item.city+','+item.country,
					        travelMode: google.maps.DirectionsTravelMode.DRIVING
					    },
					    callback: function(results){
					      $(this).gmap3(
					    	//{action:'clear'},
					    	{
					        action:'setDirections', 
					        directions: results
					    	},{
				    	      action:'setDirectionsPanel', 
				    	      id: 'r-directions'
				    	    });
					    }
					  });
		    	}
			});
		}
	},
	_jsondata:function(iso){
		if($(".subdirection:button").length !=0){
			$(".subdirection:button").button();
			/*$('.subdirection:button').on('click',function (event){
				$("#r-directions").dialog({
					bgiframe: false,
					resizable: false,
					position: 'center',
					height:450,
					width:600,
					modal: false
				});
			});*/
		}
		$.ajax({
			url: '/plugins.php?strLangue='+iso+'&magixmod=gmap&jsondata=true',
			dataType: 'json',
			type: "get",
			statusCode: {
				0: function() {
					console.error("jQuery Error");
				},
				401: function() {
					console.warn("access denied");
				},
				404: function() {
					console.warn("object not found");
				},
				403: function() {
					console.warn("request forbidden");
				},
				408: function() {
					console.warn("server timed out waiting for request");
				},
				500: function() {
					console.error("Internal Server Error");
				}
			},
			async: true,
			cache:false,
			beforeSend: function(){
				$('#map_adress').html('<img class="map_loader" src="/plugins/gmap/img/ajax-loader.gif" />');
			},
			success: function(j) {
				$('#map_adress').empty();
				if(j === undefined){
					console.log(j);
					$('#map_adress').text("map is undefined");
				}
				if(j !== null){
					$.each(j, function(i,item) {
						if(item.lat != null && item.lng != null){
							gmapping._loadMap(item);
							if(item.adress != null && item.city != null){
								gmapping._getDirection(item);
							}
						}
					});
				}
			}
		});
	},
	_loadDataMultiMarker:function(iso){
		/**
		 * Requête AJAX pour le mode muti adresse
		 */
        $.ajax({
          url: '/plugins.php?strLangue='+iso+'&magixmod=gmap&json_multi_data=true',
          dataType: 'json',
		  type: "get",
		  statusCode: {
				0: function() {
					console.error("jQuery Error");
				},
				401: function() {
					console.warn("access denied");
				},
				404: function() {
					console.warn("object not found");
				},
				403: function() {
					console.warn("request forbidden");
				},
				408: function() {
					console.warn("server timed out waiting for request");
				},
				500: function() {
					console.error("Internal Server Error");
				}
			},
		  async: true,
		  cache:false,
		  beforeSend: function(){
			  $('#map_adress').html('<img class="map_loader" src="/plugins/gmap/img/ajax-loader.gif" />');
		  },
          success:function(j){
			if(j === undefined){
				console.log(j);
			}else{
				if(j !== null){
					gmapping._multiMarker_Init(j.multi_adress);
				}else{
					console.error("Multi adress is null");
				}
			}
          }
        });
     },
     _multiMarker_Init:function(multiadress){
         /**
          * Initialize les données pour le mode multi adresse
          */
         var pos = [$('.vcard .latitude .value-title').attr('title'),$('.vcard .longitude .value-title').attr('title')];
         $('#map_adress').gmap3(
             /*{action: 'init',
                   options:{
                     center:pos,
                     zoom: 7,
                     mapTypeId: google.maps.MapTypeId.ROADMAP
                 }
             },*/
             {action: 'addMarker',
               latLng: pos,
               map:{
                 center: true,
                 zoom: 7,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
				    mapTypeControl: true,
				    mapTypeControlOptions: {
				      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
				    },
				    navigationControl: true,
				    scrollwheel: true,
				    streetViewControl: true
                 },
                 marker:{
                     options:{
                       icon: new google.maps.MarkerImage("/plugins/gmap/markers/blue-dot.png"),
                       draggable:false
                     },
                     events:{ 
                         click:function(marker){
                             $(this).gmap3({
                               action:'getAddress',
                               latLng:marker.getPosition(),
                               callback:function(results){
                                 var map = $(this).gmap3('get'),
                                     infowindow = $(this).gmap3({action:'get', name:'infowindow'}),
                                     //content = results && results[2] ? results && results[2].formatted_address : 'no address';
                                     content = $('.vcard .fn').text()+'<br />';
                                     //content += results && results[2] ? results && results[2].formatted_address : 'no address';
                                     content += $('.vcard .adr .street-address').text()+'<br />';
                                     content += $('.vcard .adr .locality').text()+'<br />';
                                     var elt= results[0].address_components;
                                     for(i in elt){
                                         if(elt[i].types[0] == 'postal_code')
                                             var postcode =(elt[i].long_name)+'&nbsp;';
                                         if(elt[i].types[0] == 'country')
                                             var country =(elt[i].long_name);
                                         /*if(elt[i].types[0] == 'locality')
                                             content +=(elt[i].long_name);
                                         if(elt[i].types[0] == 'adress')
                                             content +=(elt[i].long_name);*/
                                     }
                                     content += postcode+country;
                                     //console.log(results);
                                 if (infowindow){
                                   infowindow.open(map, marker);
                                   infowindow.setContent('<div id="content-map" class="block w3-16" style="overflow:hidden;min-height:50px;">'+content+'</div>');
                                 } else {
                                   $(this).gmap3({action:'addinfowindow', anchor:marker, options:{
                                       content: '<div id="content-map" class="block w3-16" style="overflow:hidden;min-height:50px;">'+content+'</div>'}});
                                 }
                               }
                             });
                         }
                     }
                 }
             },
             {action: 'addMarkers',
             markers: multiadress,
             marker: {
                 options: {
                     draggable: false
                   },
               events:{  
                 /*mouseover: function(marker, event, data){
                     var map = $(this).gmap3('get'),
                     infowindow = $(this).gmap3({action:'get', name:'infowindow'});
                     var society = data.society ? data.society+'<br />' : '',
                     adress = data.adress ? data.adress+'<br />' : '',
                     city = data.city ? data.city+'<br />' : '',
                     country = data.country ? data.country : '';
                     if (infowindow){
                       infowindow.open(map, marker);
                       infowindow.setContent(society+adress+city+country);
                     } else {
                       $(this).gmap3({action:'addinfowindow', anchor:marker, options:{content: society+adress+city+country}});
                     }
                 },
                 mouseout: function(){
                     var infowindow = $(this).gmap3({action:'get', name:'infowindow'});
                     if (infowindow){
                       infowindow.close();
                     }
                   }*/
	        	   click: function(marker, event, data){
	                   var map = $(this).gmap3('get'),
	                   infowindow = $(this).gmap3({action:'get', name:'infowindow'});
	                   var society = data.society ? data.society+'<br />' : '',
	                   adress = data.adress ? data.adress+'<br />' : '',
	                   city = data.city ? data.city+'<br />' : '',
	                   country = data.country ? data.country : '';
	                   if (infowindow){
	                     infowindow.open(map, marker);
	                     infowindow.setContent(society+adress+city+country);
	                   } else {
	                     $(this).gmap3({action:'addinfowindow', anchor:marker, options:{content: society+adress+city+country}});
	                   }
	               } 
               }
             }
           }
         );
     },
	run:function(iso){
		this._jsondata(iso);
	},
	runMultiMarker:function(iso){
		this._loadDataMultiMarker(iso);
	}
};