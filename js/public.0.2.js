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
 * MAGIX DEV
 * @copyright  MAGIX DEV Copyright (c) 2010 - 2011 Gerits Aurelien, 
 * http://www.magix-dev.be, http://www.magix-cjquery.com
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    0.1
 * @author Gérits Aurélien <aurelien[at]magix-cms[dot]com>
 * @name gmapping
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
		                mapTypeId: google.maps.MapTypeId.ROADMAP
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
			$('.subdirection:button').live('click',function(event){
				gmapping._stopEvent(event);
		    	if($('#getadress').val().length != 0){
		    		$('#r-directions').addClass('sizedirection').show(800);
					  $('#map_adress').gmap3(
						{action:'clear'},
						{ 
					    action:'getRoute',
					    options:{
					    	origin:item.adress+' '+item.city+','+item.country,
					        destination:$('#getadress').val(),
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
	_jsondata:function(){
		if($(".subdirection:button").length !=0){
			$(".subdirection:button").button();
		}
		$.ajax({
			url: '/magixmod/gmap/jsondata/',
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
          url: '/'+iso+'/magixmod/gmap/json_multi_data',
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
			    mapTypeId: google.maps.MapTypeId.ROADMAP
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
		    		            	content += results && results[2] ? results && results[2].formatted_address : 'no address';
		    		            if (infowindow){
		    		              infowindow.open(map, marker);
		    		              infowindow.setContent(content);
		    		            } else {
		    		              $(this).gmap3({action:'addinfowindow', anchor:marker, options:{content: content}});
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
                mouseover: function(marker, event, data){
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
                  }
              }
            }
          }
		);
	},
	run:function(){
		this._jsondata();
	},
	runMultiMarker:function(iso){
		this._loadDataMultiMarker(iso);
	}
};