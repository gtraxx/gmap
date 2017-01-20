var MC_plugins_gmap = (function ($, undefined) {
    //Fonction Private

    function remove(baseadmin, getlang) {
        $(document).on('click', '.d-plugin-gmap', function (event) {
            event.preventDefault();
            var elem = $(this).data("delete");
            $("#window-dialog:ui-dialog").dialog("destroy");
            $('#window-dialog').dialog({
                bgiframe: true,
                resizable: false,
                height: 140,
                modal: true,
                title: Globalize.localize("delete_item", iso),
                buttons: {
                    'Delete item': function () {
                        $(this).dialog('close');
                        $.nicenotify({
                            ntype: "ajax",
                            uri: "/admin/plugins.php?name=gmap&getlang=" + getlang + '&action=remove',
                            typesend: 'post',
                            noticedata: {deletemap: elem},
                            beforeParams: function () {
                            },
                            successParams: function (e) {
                                $.nicenotify.initbox(e, {
                                    display: false
                                });
                                jsonListIndex(baseadmin, getlang, iso);
                            }
                        });
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });
        });
    }

    function jsonListRel(baseadmin, getlang, iso, edit) {
        $.nicenotify({
            ntype: "ajax",
            uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + edit + '&tab=multimarkers&json_map_relative=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams: function () {
                var loader = $(document.createElement("span")).addClass("loader offset5").append(
                    $(document.createElement("img"))
                        .attr('src', '/' + baseadmin + '/template/img/loader/small_loading.gif')
                        .attr('width', '20px')
                        .attr('height', '20px')
                )
                $('#load_rel_gmap').html(loader);
            },
            successParams: function (j) {
                $('#load_rel_gmap').empty();
                $.nicenotify.initbox(j, {
                    display: false
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
                                                $(document.createElement("span")).addClass("fa fa-trash-o")
                                            )
                                    )
                            ),
                        tbody
                    );
                tbl.appendTo('#load_rel_gmap');
                if (j === undefined) {
                    console.log(j);
                }
                if (j !== null) {
                    $.each(j, function (i, item) {
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
                                            .attr("data-delete", item.id_adress)
                                            .attr("title", "Remove")
                                            .append(
                                                $(document.createElement("span")).addClass("fa fa-trash-o")
                                            )
                                    )
                                )
                        )
                    });
                } else {
                    tbody.append(
                        $(document.createElement("tr"))
                            .append(
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                ),
                                $(document.createElement("td")).append(
                                    $(document.createElement("span")).addClass("fa fa-minus")
                                )
                            )
                    )
                }
            }
        });
    }

    function addAdress(baseadmin, getlang, iso, edit) {
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
            submitHandler: function (form) {
                $.nicenotify({
                    ntype: "submit",
                    uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + edit + '&tab=multimarkers',
                    typesend: 'post',
                    idforms: $(form),
                    resetform: true,
                    beforeParams: function () {
                    },
                    successParams: function (e) {
                        $.nicenotify.initbox(e, {
                            display: true
                        });
                        jsonListRel(baseadmin, getlang, iso, edit);
                    }
                });
                return false;
            }
        });
    }

    function removeAdress(baseadmin, getlang, iso, edit) {
        $(document).on('click', '.d-plugin-gmap-rel', function (event) {
            event.preventDefault();
            var elem = $(this).data("delete");
            $("#window-dialog:ui-dialog").dialog("destroy");
            $('#window-dialog').dialog({
                bgiframe: true,
                resizable: false,
                height: 140,
                modal: true,
                title: Globalize.localize("delete_item", iso),
                buttons: {
                    'Delete item': function () {
                        $(this).dialog('close');
                        $.nicenotify({
                            ntype: "ajax",
                            uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=remove',
                            typesend: 'post',
                            noticedata: {delete_rel_map: elem},
                            beforeParams: function () {
                            },
                            successParams: function (e) {
                                $.nicenotify.initbox(e, {
                                    display: false
                                });
                                jsonListRel(baseadmin, getlang, iso, edit);
                            }
                        });
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });
        });
    }
    // @todo New function
    /**
     * updateTimer
     * @param ts
     * @param func
     */
    function updateTimer(ts, func) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(func, ts ? ts : 1000);
    }
    function loadMapConfig(){
        var infocontent = $('#adress_map').val() + '<br />' + $('#city_map').val() + ' ' + $('#country_map').val();
        var adr = $('#adress_map').val() + ', ' + $('#country_map').val();
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
    function loadMapRelated() {
        var infocontent = $('#adress_ga').val() + '<br />' + $('#city_ga').val() + ' ' + $('#country_ga').val();
        var adr = $('#adress_ga').val() + ', ' + $('#country_ga').val();
        //alert(adr);
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
    /**
     * Save
     * @param id
     * @param collection
     * @param type
     */
    function save(getlang,type,id,modal){
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
        }
    }
    function del(getlang,type,id,modal){
        if(type === 'page'){
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
                            $('#order_'+$('#delete').val()).remove();
                            updateList(type);
                        }
                    });
                    return false;
                }
            });
        }
    }
    function updateList(type) {
        if(type === 'page') {
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
        }else{
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
            } else {
                $('#no-entry').removeClass('hide');
            }
        }
    }
    return {
        //Fonction Public
        runList: function (baseadmin, getlang, iso) {
            updateList('page');
            save(getlang,'add','#forms_plugins_gmap_add','#add-page');
            //jsonListIndex(baseadmin, getlang, iso);
            del(getlang,'page','#del_gmap','#deleteModal');
            remove(baseadmin, getlang, iso);
        },
        mapConfig: function () {
            loadMapConfig();
        },
        runConfig: function (baseadmin, getlang) {
            //updateConfig(baseadmin, getlang);
            save(getlang,'config','#forms_plugins_gmap_config',null);
            if ($("#contener-map").length != 0) {
                $('#adress_map').keypress(function () {
                    updateTimer('', 'MC_plugins_gmap.mapConfig();');
                }).change(function () {
                    updateTimer(100, 'MC_plugins_gmap.mapConfig();');
                });
            }
        },
        mapRelated: function () {
            loadMapRelated();
        },
        runEdit: function (baseadmin, getlang, edit) {
            //updatePage(baseadmin, getlang, edit);
            save(getlang,'edit','#forms_plugins_gmap_edit',null);
        },
        runRelated: function (baseadmin, getlang, iso, edit) {
            jsonListRel(baseadmin, getlang, iso, edit);
            removeAdress(baseadmin, getlang, iso, edit);
            addAdress(baseadmin, getlang, iso, edit);
            if ($("#contener-map").length != 0) {
                $('#adress_ga').keypress(function () {
                    updateTimer('', 'MC_plugins_gmap.mapRelated();');
                }).change(function () {
                    updateTimer(100, 'MC_plugins_gmap.mapRelated();');
                });
            }
        }
    };
})(jQuery);