var gmap = (function ($, undefined) {
    /**
     * Chargement de la carte par défaut
     * @param item
     */
    function loadMap(item) {
        if (item.society != null) {
            var infocontent = '<strong>' + item.society + '</strong>' + '<br />' + item.adress + '<br />' + item.city + '<br />' + item.country;
        } else {
            var infocontent = item.adress + '<br />' + item.city + '<br />' + item.country;
        }
        var center  = [item.lat, item.lng];
        $('#map_adress').gmap3({
            center: center,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            scrollwheel: true,
            streetViewControl: true
        }).marker({
            position: center,
            icon: new google.maps.MarkerImage("/plugins/gmap/markers/"+item.marker)
        }).infowindow({
            position: center,
            content: infocontent
        });
        if(item.route == '1'){
            /*$('#getadress').autocomplete({
                //This bit uses the geocoder to fetch address values
                source: function(request, response) {
                    $("#map_adress").gmap3({
                        address: request.term
                    }).then(function(results){
                        if (!results) return;
                        response($.map(results, function(item) {
                            return {
                                label: item.formatted_address,
                                value: item.formatted_address,
                                latLng: item.geometry.location
                            };
                        }));
                    });
                }
            });*/
            $('#getadress').autocomplete({
                //This bit uses the geocoder to fetch address values
                source: function(request, response) {
                    /*$("#map_adress").gmap3({
                        address: request.term
                    }).then(function(results){
                        if (!results) return;
                        response($.map(results, function(item) {
                            return {
                                label: item.formatted_address,
                                value: item.formatted_address,
                                latLng: item.geometry.location
                            };
                        }));
                    });*/
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address': request.term}, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results);
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
                if($('#getadress').val().length != 0){
                    $('#r-directions').addClass('sizedirection').show(800);
                    /*$('#map_adress').gmap3({
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
                    });*/
                    $('#map_adress')
                        .gmap3({
                            center: [item.lat, item.lng],
                            zoom: 6,
                            mapTypeId : google.maps.MapTypeId.ROADMAP
                        })
                        .route({
                            origin: $('#getadress').val(),
                            destination: item.adress+' '+item.city+','+item.country,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        })
                        .directionsrenderer(function (results) {
                            if (results) {
                                return {
                                    panel: "#r-directions",
                                    directions: results
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
    return {
        //Fonction Public
        run:function(iso){
            jsonData('.subdirection:button',iso);
        }
    };
})(jQuery);