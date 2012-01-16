/**
 * MAGIX CMS
 * @copyright  MAGIX CMS Copyright (c) 2010 Gerits Aurelien, 
 * http://www.magix-cms.com, magix-cms.com http://www.magix-cjquery.com
 * @license    Dual licensed under the MIT or GPL Version 3 licenses.
 * @version    1.0
 * @author Gérits Aurélien <aurelien@magix-cms.com>
 * @name adminjs
 * @package plugins
 * @addon gmap
 *
 */
var adminMap = {
	_load_plugin_gmap:function(){
		$.ajax({
			url: '/admin/plugins.php?name=gmap&json_map_record=true',
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
				$('#load_plugin_gmap').html('<img class="loader-block" src="/framework/img/square-circle.gif" />');
			},
			success: function(j) {
				$('#load_plugin_gmap').empty();
				var tablecat = '<table id="table_plugin_gmap" class="table-plugin-author">'
					+'<thead><tr style="padding:3px;" class="ui-widget ui-widget-header">'
					+'<th style="width:1%;">ID</th>'
					+'<th><span class="lfloat magix-icon magix-icon-h1"></span></th>'
					+'<th class="small-icon"><span class="lfloat magix-icon magix-icon-note"></span></th>'
					+'<th><span class="lfloat ui-icon ui-icon-person"></span></th>'
					+'<th><span class="lfloat ui-icon ui-icon-flag"></span></th>'
					+'<th style="width:1%;"><span class="lfloat ui-icon ui-icon-pencil"></span></th>'
					+'<th style="width:1%;"><span class="lfloat ui-icon ui-icon-close"></span></th>'
					+'</tr></thead>'
					+'<tbody>';
				tablecat += '</tbody></table>';
				$(tablecat).appendTo('#load_plugin_gmap');
				if(j === undefined){
					console.log(j);
				}
				if(j !== null){
					$.each(j, function(i,item) {
						if(item.content_map != 0){
							var contentMap = '<div class="ui-state-highlight" style="border:none;"><span style="float:left" class="ui-icon ui-icon-check"></span></div>';
						}else{
							var contentMap = '<div class="ui-state-error" style="border:none;"><span style="float:left;" class="ui-icon ui-icon-cancel"></span></div>';
						}
						if(item.lang != null){
							flaglang = item.lang;
						}else{
							flaglang = '<div class="ui-state-error" style="border:none;"><span style="float:left;" class="ui-icon ui-icon-cancel"></span></div>';
						}
						return $('<tr>'
						+'<td>'+item.idgmap+'</td>'
						+'<td>'+item.name_map+'</td>'
						+'<td class="small-icon">'+contentMap+'</td>'
						+'<td>'+item.pseudo+'</td>'
						+'<td>'+flaglang+'</td>'
						+'<td class="small-icon"><a href="/admin/plugins.php?name=gmap&editmap='+item.idgmap+'"><span style="float:left;" class="ui-icon ui-icon-pencil"></span></td>'
						+'<td class="small-icon"><a href="#" class="d-plugin-gmap" title="Supprimé" rel="'+item.idgmap+'"><span style="float:left;" class="ui-icon ui-icon-close"></span></td>'
						+'</tr>').appendTo('#table_plugin_gmap tbody');
					});
				}else{
					return $('<tr>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'</tr>').appendTo('#table_plugin_gmap tbody');
				}
			}
		});
		adminMap._deleteMap();
	},
	_addAssignLang:function(){
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
				$(form).ajaxSubmit({
		    		url:'/admin/plugins.php?name=gmap&postassign=1',
		    		type:"post",
		    		resetForm: true,
		    		success:function(request) {
						$.notice({
							ntype: "simple",
							time:2
						});
		    			$(".mc-head-request").html(request);
		    			adminMap._load_plugin_gmap();
		    		}
		    	});
				return false; 
			}
		});
		$("#forms-plugin-addGmap").formsAddMap;
	},
	_updateMap:function(){
		$("#forms-plugin-updateGmap").submit(function(){
			var idgmap = $('#idgmap').val();
			$.nicenotify({
				ntype: "submit",
				uri: '/admin/plugins.php?name=gmap&editmap='+idgmap,
				typesend: 'post',
				idforms: $(this),
				beforeParams:function(){},
				successParams:function(e){
					$.nicenotify.initbox(e);
				}
			});
			return false; 
		});
	},
	_updateConfig:function(){
		$("#forms-plugin-configGmap").submit(function(){
			$.nicenotify({
				ntype: "submit",
				uri: '/admin/plugins.php?name=gmap&updateconfig=1',
				typesend: 'post',
				idforms: $(this),
				beforeParams:function(){},
				successParams:function(e){
					$.nicenotify.initbox(e);
				}
			});
			return false; 
		});
	},
	updateTimerConfig:function(ts){
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout('adminMap._load_ConfigMap_Forms();', ts ? ts : 1000);
    },
	_load_ConfigMap_Forms:function(){
		$.getScript("/plugins/gmap/js/gmap3.min.js", function() {
			$('#configmap').width(300).height(250);
	        var infocontent = $('#adress_map').val()+'<br />'+$('#city_map').val();
	        
	        $('#configmap').gmap3(
	            {action:'clear'},
	            {action: 'addMarker',
	            address: $('#adress_map').val()+','+$('#city_map').val()+' '+$('#country_map').val(),
	            map:{
	                center: true,
	                zoom: 14,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	            },
	            marker:{
	                options:{
	                    draggable: true
	                },
	                 events: {
	                   dragend:function(marker){
	                        $("#lat_map").val( marker.getPosition().lat() );
	                        $("#lng_map").val( marker.getPosition().lng() );
	                     }
	                },
	                callback:function(marker){
	                  if (marker){
	                    $("#lat_map").val( marker.getPosition().lat() );
	                    $("#lng_map").val( marker.getPosition().lng() );
	                  }
	                }
	            },infowindow:{
	                    options:{
	                      size: new google.maps.Size(20,20),
	                      content: infocontent
	                    }
	            }
	        });
		});
	},
	_configMap:function(){
		$('#adress_map,#city_map').keypress(function(){ 
			adminMap.updateTimerConfig(); 
		}).change(function(){ 
			adminMap.updateTimerConfig(100); 
		});
	},
	
	updateTimerRelated:function(ts){
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout('adminMap._load_Related_Map_Forms();', ts ? ts : 1000);
    },
	_load_Related_Map_Forms:function(){
		$.getScript("/plugins/gmap/js/gmap3.min.js", function() {
			$('#related_map').width(300).height(250);
	        var infocontent = $('#adress_ga').val()+'<br />'+$('#city_ga').val();
	        
	        $('#related_map').gmap3(
	            {action:'clear'},
	            {action: 'addMarker',
	            address: $('#adress_ga').val()+','+$('#city_ga').val()+' '+$('#country_ga').val(),
	            map:{
	                center: true,
	                zoom: 14,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	            },
	            marker:{
	                options:{
	                    draggable: true
	                },
	                 events: {
	                   dragend:function(marker){
	                        $("#lat_ga").val( marker.getPosition().lat() );
	                        $("#lng_ga").val( marker.getPosition().lng() );
	                     }
	                },
	                callback:function(marker){
	                  if (marker){
	                    $("#lat_ga").val( marker.getPosition().lat() );
	                    $("#lng_ga").val( marker.getPosition().lng() );
	                  }
	                }
	            },infowindow:{
	                    options:{
	                      size: new google.maps.Size(20,20),
	                      content: infocontent
	                    }
	            }
	        });
		});
	},
	_relatedMap:function(){
		$('#adress_ga,#city_ga').keypress(function(){ 
			adminMap.updateTimerRelated(); 
		}).change(function(){ 
			adminMap.updateTimerRelated(100); 
		});
	},
	_addNewRelativeMap:function(idgmap){
		$("#forms-plugin-gmap-add-rel-adress").submit(function(){
			$.nicenotify({
				ntype: "submit",
				uri: '/admin/plugins.php?name=gmap&editmap='+idgmap,
				typesend: 'post',
				idforms: $(this),
				resetform: true,
				beforeParams:function(){},
				successParams:function(e){
					$.nicenotify.initbox(e);
					adminMap._load_relative_gmap(idgmap);
				}
			});
			return false;
		});
	},
	_deleteMap:function(){
		$('.d-plugin-gmap').live('click',function (event){
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
						$.ajax({
							url: "/admin/plugins.php?name=gmap",
							type: "post",
							data: {deletemap:lg},
							success:function() {
								adminMap._load_plugin_gmap();
				    		}
						});
					},
					Cancel: function() {
						$(this).dialog('close');
					}
				}
			});
		});
	},
	_load_relative_gmap:function(idgmap){
		$.ajax({
			url: '/admin/plugins.php?name=gmap&editmap='+idgmap+'&json_rel_map=true',
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
				$('#load_rel_gmap').html('<img class="loader-block" src="/framework/img/square-circle.gif" />');
			},
			success: function(j) {
				$('#load_rel_gmap').empty();
				var tablecat = '<table id="table_plugin_gmap_rel" class="table-plugin-author">'
					+'<thead><tr style="padding:3px;" class="ui-widget ui-widget-header">'
					+'<th style="width:1%;">ID</th>'
					+'<th>Titre</th>'
					+'<th>Pays</th>'
					+'<th>Ville</th>'
					+'<th>Adresse</th>'
					+'<th style="width:1%;"><span class="lfloat ui-icon ui-icon-close"></span></th>'
					+'</tr></thead>'
					+'<tbody>';
				tablecat += '</tbody></table>';
				$(tablecat).appendTo('#load_rel_gmap');
				if(j === undefined){
					console.log(j);
				}
				if(j !== null){
					$.each(j, function(i,item) {
						return $('<tr>'
						+'<td>'+item.id_adress+'</td>'
						+'<td>'+item.society_ga+'</td>'
						+'<td>'+item.country_ga+'</td>'
						+'<td>'+item.city_ga+'</td>'
						+'<td>'+item.adress_ga+'</td>'
						+'<td class="small-icon"><a href="#" class="d-plugin-gmap-rel" title="Supprimé" rel="'+item.id_adress+'"><span style="float:left;" class="ui-icon ui-icon-close"></span></td>'
						+'</tr>').appendTo('#table_plugin_gmap_rel tbody');
					});
				}else{
					return $('<tr>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'<td><span class="lfloat ui-icon ui-icon-minus"></span></td>'
					+'</tr>').appendTo('#table_plugin_gmap_rel tbody');
				}
			}
		});
		adminMap._delete_relative_adress();
	},
	_delete_relative_adress:function(){
		$('.d-plugin-gmap-rel').live('click',function (event){
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
						$.ajax({
							url: "/admin/plugins.php?name=gmap",
							type: "post",
							data: {delete_rel_map:lg},
							success:function() {
								adminMap._load_relative_gmap($('#idgmap').val());
				    		}
						});
					},
					Cancel: function() {
						$(this).dialog('close');
					}
				}
			});
		});
	},
	run:function(){
		this._load_plugin_gmap();
		this._addAssignLang();
		this._updateMap();
		this._updateConfig();
		if($('#idgmap').length != 0){
			adminMap._relatedMap();
			adminMap._addNewRelativeMap($('#idgmap').val());
			adminMap._load_relative_gmap($('#idgmap').val());
			adminMap._delete_relative_adress();
		}else{
			adminMap._configMap();
		}
	}
};