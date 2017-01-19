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

    function jsonListIndex(baseadmin, getlang, iso) {
        $.nicenotify({
            ntype: "ajax",
            uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&json_map_record=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams: function () {
                var loader = $(document.createElement("span")).addClass("loader offset5").append(
                    $(document.createElement("img"))
                        .attr('src', '/' + baseadmin + '/template/img/loader/small_loading.gif')
                        .attr('width', '20px')
                        .attr('height', '20px')
                )
                $('#load_plugin_gmap').html(loader);
            },
            successParams: function (j) {
                $('#load_plugin_gmap').empty();
                $.nicenotify.initbox(j, {
                    display: false
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
                                        $(document.createElement("th")).append(Globalize.localize("heading", iso)),
                                        $(document.createElement("th")).append(
                                            Globalize.localize("content", iso)
                                        ),
                                        $(document.createElement("th")).append(
                                            Globalize.localize("nickname", iso)
                                        ),
                                        $(document.createElement("th")).append(
                                            $(document.createElement("span"))
                                                .addClass("fa fa-flag")
                                        ),
                                        $(document.createElement("th")).append(
                                            $(document.createElement("span"))
                                                .addClass("fa fa-edit")
                                        ),
                                        $(document.createElement("th"))
                                            .append(
                                                $(document.createElement("span"))
                                                    .addClass("fa fa-trash-o")
                                            )
                                    )
                            ),
                        tbody
                    );
                tbl.appendTo('#load_plugin_gmap');
                if (j === undefined) {
                    console.log(j);
                }
                if (j !== null) {
                    $.each(j, function (i, item) {
                        if (item.content_map != 0) {
                            var contentMap = $(document.createElement("span")).addClass("fa fa-check");
                        } else {
                            var contentMap = $(document.createElement("span")).addClass("fa fa-warning-sign");
                        }
                        if (item.lang != null) {
                            var flaglang = item.lang;
                        } else {
                            var flaglang = $(document.createElement("span")).addClass("fa fa-warning-sign");
                        }
                        tbody.append(
                            $(document.createElement("tr"))
                                .append(
                                    $(document.createElement("td")).append(item.idgmap),
                                    $(document.createElement("td")).append(
                                        $(document.createElement("a"))
                                            .attr("href", '/admin/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + item.idgmap)
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
                                            .attr("href", '/admin/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + item.idgmap)
                                            .attr("title", "Edit")
                                            .append(
                                                $(document.createElement("span"))
                                                    .addClass("fa fa-edit")
                                            )
                                    ),
                                    $(document.createElement("td")).append(
                                        $(document.createElement("a"))
                                            .addClass("d-plugin-gmap")
                                            .attr("href", "#")
                                            .attr("data-delete", item.idgmap)
                                            .attr("title", Globalize.localize("remove", iso) + ": " + item.name_map)
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

    function addPage(baseadmin, getlang, iso) {
        var formsAddMap = $("#forms_plugins_gmap_add").validate({
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
                    beforeParams: function () {
                    },
                    successParams: function (e) {
                        $.nicenotify.initbox(e, {
                            display: true
                        });
                        jsonListIndex(baseadmin, getlang, iso);
                    }
                });
                return false;
            }
        });
        $('#open-add').on('click', function () {
            $('#forms-add').dialog({
                modal: true,
                resizable: true,
                width: 400,
                height: 'auto',
                minHeight: 210,
                buttons: {
                    'Save': function () {
                        $(this).dialog('close');
                        $("#forms_plugins_gmap_add").submit();
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                        formsAddMap.resetForm();
                    }
                }
            });
            return false;
        });
    }

    /**
     *
     * @param baseadmin
     * @param getlang
     * @param edit
     */
    function updatePage(baseadmin, getlang, edit) {
        $("#forms_plugins_gmap_edit").on('submit', function () {
            var idgmap = $('#idgmap').val();
            $.nicenotify({
                ntype: "submit",
                uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&action=edit&edit=' + edit,
                typesend: 'post',
                idforms: $(this),
                beforeParams: function () {
                },
                successParams: function (e) {
                    $.nicenotify.initbox(e, {
                        display: true
                    });
                }
            });
            return false;
        });
    }

    /**
     *
     * @param baseadmin
     * @param getlang
     */
    function updateConfig(baseadmin, getlang) {
        $("#forms_plugins_gmap_config").on('submit', function () {
            $.nicenotify({
                ntype: "submit",
                uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&tab=config',
                typesend: 'post',
                idforms: $(this),
                beforeParams: function () {
                },
                successParams: function (e) {
                    $.nicenotify.initbox(e, {
                        display: true
                    });
                }
            });
            return false;
        });
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

    return {
        //Fonction Public
        runList: function (baseadmin, getlang, iso) {
            jsonListIndex(baseadmin, getlang, iso);
            remove(baseadmin, getlang, iso);
            addPage(baseadmin, getlang, iso);
        },
        mapConfig: function () {
            loadMapConfig();
        },
        runConfig: function (baseadmin, getlang) {
            updateConfig(baseadmin, getlang);
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
            updatePage(baseadmin, getlang, edit);
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