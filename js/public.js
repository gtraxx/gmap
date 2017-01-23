var gmap = (function ($, undefined) {
    /**
     *
     * @param originData
     * @returns {{OriginContent: *, OriginAddress: *, originPosition: *}}
     */
    function init(originData){
        return {
            OriginContent : originData[0],
            OriginAddress : originData[1],
            OriginCity : originData[2],
            OriginPosition : originData[3],
            OriginRoute:originData[4],
            OriginMarker:originData[5]
        }
    }
    /**
     * Chargement de la carte par défaut
     * @param item
     */
    function loadMap(item) {
        $('#map_adress').gmap3({
            center: item.OriginPosition,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            scrollwheel: true,
            streetViewControl: true
        })
        .marker({
            position: item.OriginPosition,
            icon: "/plugins/gmap/markers/"+item.OriginMarker
            /*,
            icon: new google.maps.MarkerImage("/plugins/gmap/markers/"+item.marker)*/
        })
        .infowindow({
            position: item.OriginPosition,
            content: item.OriginContent+'<br />'+item.OriginAddress
        })
        .then(function (infowindow) {
            var map = this.get(0);
            var marker = this.get(1);
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        });
        /*if(item.route == '1'){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': request.term}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(results);
                }
            });
        }*/
    }

    /**
     *
     * @param item
     */
    function setDirection(item){
        if(item.OriginRoute == '1') {
            $('#r-directions').empty();
            if ($('#getadress').val().length != 0) {
                $('#r-directions').addClass('sizedirection').show(800);
                $('#map_adress')
                    .gmap3({
                        //center: [item.lat, item.lng],
                        address: $('#getadress').val(),
                        zoom: 6,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    })
                    .route({
                        origin: $('#getadress').val(),
                        destination: item.OriginAddress,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    })
                    .directionsrenderer(function (results) {
                            if (results) {
                                return {
                                    panel: "#r-directions",
                                    directions: results
                                }
                            }
                        }
                    ).catch(function (error) {
                        console.error('catched: ' + error);
                    });
                //$('#getadress').val('');
            }
        }
    }
    /**
     * Trace la route sur la carte
     * @param button
     * @param item
     */
    function getDirection(button,item){
        $(document).on('click',button,function(){
            setDirection(item);
        });
        $('.form-search').submit(function(e) {
            e.preventDefault();
            setDirection(item);
        });
    }

    /**
     * Création des markers multiples
     * @param item
     * @param multiadress
     */
    function multiMarker(item,multiadress) {
        var markers = [];
        markers.push({
            position: item.OriginPosition,
            //address: OriginAddress,
            icon: "/plugins/gmap/markers/"+item.OriginMarker,
            content: item.OriginContent+'<br />'+item.OriginAddress+'<br />'+item.OriginCity
        });
        //console.log(originPosition);
        $.each(multiadress, function(key, val){
            var latLng = [val.latLng[0], val.latLng[1]];
            var content = val.data.society+'<br />'+val.data.adress+'<br />'+val.data.city
            markers.push({
                //position: latLng,
                address: val.data.adress+', '+val.data.country,
                icon: "http://maps.google.com/mapfiles/marker_grey.png",
                content: content
            });
        });
        //console.log(markers);
        $('#map_adress').gmap3({
            center: item.originPosition,
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            scrollwheel: true,
            streetViewControl: true
        })
        .marker(markers)
        .infowindow(markers)
        .then(function (infowindow) {
            var map = this.get(0);
            var marker = this.get(1);

            marker.forEach(function(item,i){
                item.addListener('click', function() {
                    infowindow[i].open(map, item);
                });
            })

        }).catch(function (error) {
            console.error('catched: ' + error);
        }).fit();
    }
    /**
     * Chargement des données multi marker au format JSON
     * @param iso
     */
    function loadDataMultiMarker(iso,originData){
        /**
         * Requête AJAX pour le mode muti adresse
         */
        $.nicenotify({
            ntype: "ajax",
            uri: '/plugins.php?strLangue='+iso+'&magixmod=gmap&json_multi_data=true',
            typesend: 'get',
            datatype: 'json',
            beforeParams:function(){
                var loader = $(document.createElement("div")).addClass("map_loader")
                    .append(
                        $(document.createElement("i")).addClass("fa fa-spinner fa-pulse fa-3x fa-fw"),
                        $(document.createElement("span")).append("Loading...").addClass("sr-only")
                    );
                $('#map_adress').before(loader);
            },
            successParams:function(j){
                $('.map_loader').remove();
                $.nicenotify.initbox(j,{
                    display:false
                });
                if(j === undefined){
                    console.log(j);
                }else{
                    if(j !== null){
                        multiMarker(originData,j.multi_adress);
                    }else{
                        console.error("Multi adress is null");
                    }
                }
            }
        });
    }
    return {
        //Fonction Public
        run:function(iso,originData){
            var data = init(originData);//init.call(this,originData);
            loadMap(data);
            if(data.OriginAddress != null){
                getDirection('.subdirection:button',data);
            }
        },
        runMultiMarker:function(iso,originData){
            var data = init(originData);
            loadDataMultiMarker(iso,data);
        }
    };
})(jQuery);