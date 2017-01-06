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
    }

})(jQuery);