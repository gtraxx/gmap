var MC_plugins_gmap = (function ($, undefined) {
    //Fonction Private
    /**
     * updateTimer
     * @param ts
     * @param func
     */
    function updateTimer(ts, func) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(func, ts ? ts : 1000);
    }

    /**
     * Chargement des données geographique dans la configuration
     */
    function loadMapConfig(){
        var infocontent = $('#adress_map').val() + '<br />' + $('#city_map').val() + ' ' + $('#country_map').val();
        //var adr = $('#adress_map').val() + ', ' + $('#country_map').val();
        var adr = $('#adress_map').val()+' '+ $('#city_map').val() + ', ' + $('#country_map').val();
        //alert(adr);
        $('#contener-map')
            .gmap3()
            .latlng({
                address: adr
            }).then(function(latlng){
            $("#lat_map").val(latlng.lat());
            $("#lng_map").val(latlng.lng());
        });
    }

    /**
     * Chargement des données geographique des adresses supplémentaires (Multi Marker)
     */
    function loadMapRelated() {
        var infocontent = $('#adress_ga').val() + '<br />' + $('#city_ga').val() + ' ' + $('#country_ga').val();
        var adr = $('#adress_ga').val() +', ' + $('#postcode_ga').val() + ' ' + $('#city_ga').val() + ', ' + $('#country_ga').val();
        console.log(adr);
        //alert(adr);
		if($('#adress_ga').val() !== '' && $('#postcode_ga').val() !== '' && $('#city_ga').val() !== '') {
			$('#contener-map')
				.gmap3() // no options = no start map for now...
				.latlng({
					address: adr
				})
				.then(function (latlng) {
					$("#lat_ga").val(latlng.lat());
					$("#lng_ga").val(latlng.lng());
				});
		}
    }
    /**
     * Save
     * @param getlang
     * @param type
     * @param id
     * @param modal
     */
    function save(getlang,type,id,modal,subaction){
        if(type == 'add'){
            // *** Set required fields for validation
            $(id).validate({
                onsubmit: true,
                event: 'submit',
                rules: {
                    name_map: {
                        required: true,
                        minlength: 2
                    }
                },
                submitHandler: function (form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=add',
                        typesend: 'post',
                        idforms: $(form),
                        resetform: true,
                        datatype: 'json',
                        //noticedata: $(form).serialize(),
                        successParams:function(data){
                            $(modal).modal('hide');
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data.notify,{
                                display:true
                            });
                            if(data.statut && data.result != null) {
                                $('#no-entry').before(data.result);
                                updateList('page');
                            }
                        }
                    });
                    return false;
                }
            });
        }else if(type == 'edit'){
            // *** Set required fields for validation
            $(id).validate({
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
                        uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=edit&edit=' + edit,
                        typesend: 'post',
                        idforms: $(form),
                        resetform: false,
                        successParams:function(data){
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data,{
                                display:true
                            });
                        }
                    });
                    return false;
                }
            });
        } else if(type == 'config'){
            $(id).validate({
                onsubmit: true,
                event: 'submit',
                rules: {
                    society_map: {
                        required: true,
                        minlength: 2
                    },
                    country_map: {
                        required: true
                    },
                    adress_map: {
                        required: true,
                        minlength: 2
                    },
                    lat_map: {
                        required: true
                    },
                    lng_map: {
                        required: true
                    }
                },
                submitHandler: function(form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang=' + getlang + '&tab=config',
                        typesend: 'post',
                        idforms: $(form),
                        resetform: false,
                        successParams:function(data){
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data,{
                                display:true
                            });
                        }
                    });
                    return false;
                }
            });
        }else if(type == 'address'){
            $(id).validate({
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
                submitHandler: function (form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + edit + '&tab=multimarkers',
                        typesend: 'post',
                        idforms: $(form),
                        resetform: true,
                        datatype: 'json',
                        //noticedata: $(form).serialize(),
                        successParams:function(data){
                            $(modal).modal('hide');
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data.notify,{
                                display:true
                            });
                            if(data.statut && data.result != null) {
                                $('#no-entry').before(data.result);
                                updateList('address');
                            }
                        }
                    });
                    return false;
                }
            });
        }else if(type == 'addressedit'){
            $(id).validate({
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
                submitHandler: function (form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + edit + '&tab=multimarkers&id='+subaction,
                        typesend: 'post',
                        idforms: $(form),
                        //noticedata: $(form).serialize(),
                        successParams:function(data){
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data,{
                                display:true
                            });
                        }
                    });
                    return false;
                }
            });
        }
    }
    function del(getlang,type,id,modal){
        if(type == 'page'){
            // *** Set required fields for validation
            $(id).validate({
                onsubmit: true,
                event: 'submit',
                rules: {
                    delete: {
                        required: true,
                        number: true,
                        minlength: 1
                    }
                },
                submitHandler: function(form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=remove',
                        typesend: 'post',
                        idforms: $(form),
                        resetform: true,
                        successParams:function(data){
                            $(modal).modal('hide');
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data,{
                                display:true
                            });
                            $('#item_'+$('#delete').val()).remove();
                            updateList(type);
                        }
                    });
                    return false;
                }
            });
        }else if(type == 'address'){
            // *** Set required fields for validation
            $(id).validate({
                onsubmit: true,
                event: 'submit',
                rules: {
                    delete_rel_map: {
                        required: true,
                        number: true,
                        minlength: 1
                    }
                },
                submitHandler: function(form) {
                    $.nicenotify({
                        ntype: "submit",
                        uri: '/'+baseadmin+'/plugins.php?name=gmap&getlang='+getlang+'&action=remove',
                        typesend: 'post',
                        idforms: $(form),
                        resetform: true,
                        successParams:function(data){
                            $(modal).modal('hide');
                            window.setTimeout(function() { $(".alert-success").alert('close'); }, 4000);
                            $.nicenotify.initbox(data,{
                                display:true
                            });
                            $('#item_'+$('#delete-address').val()).remove();
                            updateList(type);
                        }
                    });
                    return false;
                }
            });
        }
    }

    /**
     * Update List
     * @param type
     */
    function updateList(type) {
        if(type == 'page') {
            var rows = $('#list_page tr');
            if (rows.length > 1) {
                $('#no-entry').addClass('hide');

                $('a.toggleModal').off();
                $('a.toggleModal').click(function () {
                    if ($(this).attr('href') != '#') {
                        var id = $(this).attr('href').slice(1);

                        $('#delete').val(id);
                    }
                });

                if (rows.length >= 1) {
                    $('#addbtn').addClass('hide');
                } else {
                    $('#addbtn').removeClass('hide');
                }
            } else {
                $('#no-entry').removeClass('hide');
                $('#addbtn').removeClass('hide');
            }
        }else if(type == 'address'){
            var rows = $('#list_page tr');
            if (rows.length > 1) {
                $('#no-entry').addClass('hide');

                $('a.toggleModal').off();
                $('a.toggleModal').click(function () {
                    if ($(this).attr('href') != '#') {
                        var id = $(this).attr('href').slice(1);
                        $('#delete-address').val(id);
                    }
                });
            } else {
                $('#no-entry').removeClass('hide');
            }
        }
    }

    function watch(field) {
    	field.keypress(function () {
			updateTimer('', 'MC_plugins_gmap.mapRelated();');
		}).change(function () {
			updateTimer(100, 'MC_plugins_gmap.mapRelated();');
		});
	}

    return {
        //Fonction Public
        runList: function (baseadmin, getlang) {
            updateList('page');
            save(getlang,'add','#forms_plugins_gmap_add','#add-page');
            del(getlang,'page','#del_gmap','#deleteModal');
        },
        mapConfig: function () {
            loadMapConfig();
        },
        runConfig: function (baseadmin, getlang) {
            save(getlang,'config','#forms_plugins_gmap_config',null);
            if ($("#contener-map").length != 0) {
                $('#adress_map').keypress(function () {
                    //console.log("keypress ok");
                    updateTimer('', 'MC_plugins_gmap.mapConfig();');
                }).change(function () {
                    //console.log("keypress change ok");
                    updateTimer(100, 'MC_plugins_gmap.mapConfig();');
                });
            }
        },
        mapRelated: function () {
            loadMapRelated();
        },
        runEdit: function (baseadmin, getlang, edit) {
            save(getlang,'edit','#forms_plugins_gmap_edit',null,null);
        },
        runRelated: function (baseadmin, getlang, edit) {
            updateList('address');
            del(getlang,'address','#del_address','#deleteModal');
            save(getlang,'address','#forms_plugins_gmap_related','#add-address',null);
            if ($("#contener-map").length != 0) {
                watch($('#adress_ga'));
                watch($('#city_ga'));
                watch($('#postcode_ga'));
            }
        },
        runRelatedEdit: function(baseadmin, getlang, edit, subaction) {
            save(getlang,'addressedit','#forms_plugins_gmap_related_edit','#add-address',subaction);
            if ($("#contener-map").length != 0) {
                watch($('#adress_ga'));
                watch($('#city_ga'));
                watch($('#postcode_ga'));
            }
        }
    };
})(jQuery);