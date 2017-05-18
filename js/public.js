var gmap = (function ($, undefined) {
	/**
	 * Globals
	 */
	this.config = null;
	this.origin = null;
	this.defaults = null;
	this.gMap = null;
	this.map = null;
	this.marker = null;
	this.markers = [];
	this.goTo = null;
	this.bounds = null;

    /**
     * @param config
     * @param options
     * @returns {{OriginContent: *, OriginAddress: *, originPosition: *}}
     */
    function init(config,options) {
    	var self = this;
    	self.config = config;

        if(config.markers[0].link === '' || config.markers[0].link === null) {
            var company = config.markers[0].company;
        } else {
            var company = '<a href="'+config.markers[0].link+'">'+config.markers[0].company+'</a>';
		}

        self.origin = {
            OriginContent : config.markers[0].company,
            OriginAddress : config.markers[0].address,
            OriginCity : config.markers[0].postcode + ' ' + config.markers[0].city,
            OriginCountry : config.markers[0].country,
            OriginPosition : [config.markers[0].lat, config.markers[0].lng],
            OriginRoute: 1,
            OriginMarker: config.marker
        };

        self.defaults = {
			center: self.origin.OriginPosition,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
				position: google.maps.ControlPosition.TOP_RIGHT
			},
			navigationControl: true,
			panControl: true,
			scrollwheel: true,
			streetViewControl: true
		};

        if(config.markers.length > 1) {
			var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var labelIndex = 0;

			$.each(config.markers, function(key, val) {
				var latLng = [val.lat, val.lng];
				if(val.link === '' || val.link === null) {
					var company = val.company;
				} else {
					var company = '<a href="'+val.link+'">'+val.company+'</a>';
				}
				var content = company+'<br />'+val.address+'<br />'+val.postcode+' '+val.city+', '+val.country;
				self.markers.push({
					position: latLng,
					icon: {
						url: "/plugins/gmap/markers/dotless/"+self.origin.OriginMarker+"-dotless.png",
						labelOrigin: {x:11, y:12}
					},
					label: labels[labelIndex++ % labels.length],
					content: content
				});
			});
		}
		else {
        	var val = config.markers[0];
			var latLng = [val.lat, val.lng];
			if(val.link === '' || val.link === null) {
				var company = val.company;
			} else {
				var company = '<a href="'+val.link+'">'+val.company+'</a>';
			}
			var content = company+'<br />'+val.address+'<br />'+val.postcode+' '+val.city+', '+val.country;
			self.markers.push({
				position: latLng,
				icon: "/plugins/gmap/markers/"+self.origin.OriginMarker+".png",
				content: content
			});
		}

		loadMap(options);
    }

	/**
	 * Retrieve address information from marker content
	 * @param content
	 * @returns {{company: string, address: string, city: string, country: string}}
	 */
	function getAddressInfos(content) {
    	var newC = {
    		company: '',
			address: '',
			city: '',
			country: ''
		};

		content = content.split('<br />');
		newC.company = content[0];
		newC.address = content[1];
		content = content[2].split(', ');
		newC.city = content[0];
		newC.country = content[1];

		return newC;
	}

    /**
     * Chargement de la carte par défaut
     * @param options
     */
    function loadMap(options) {
    	var self = this;
    	var item = self.origin;

    	if (typeof options !== 'undefined' && typeof options === 'object') {
			for (var attr in options) { self.defaults[attr] = options[attr]; }
		}

		self.gMap = $('#map_adress').gmap3(self.defaults);
        self.gMap
			.marker(markers)
			.infowindow(markers)
			.then(function (infowindow) {
				self.map = this.get(0);
				self.defaults['center'] = self.map.getCenter();
				self.markers = this.get(1);
				self.goTo = infowindow[0];
				//infowindow[0].open(map, self.markers[0]);
				if(self.markers.length > 1) {
					self.gMap.fit();
				} else {
					centerMap(false);
				}
				self.markers.forEach(function(item,i){
					var content = null;
					var address = null;
					var city = null;
					var country = null;
					infowindow[i].addListener('closeclick', function() {
						self.goTo = infowindow[0];
						content = getAddressInfos(self.goTo.content);
						$('#address .address').text(content.address);
						$('#address .city').text(content.city);
						$('#address .country').text(content.country);
					});
					item.addListener('click', function() {
						infowindow[i].open(map, item);
						self.goTo = infowindow[i];
						content = getAddressInfos(self.goTo.content);
						$('#address .address').text(content.address);
						$('#address .city').text(content.city);
						$('#address .country').text(content.country);
					});
				});
				$('.select-marker').on('click', function(e) {
					e.preventDefault();
					var i = $(this).data('marker');
					infowindow[i].open(map, self.markers[i]);
					self.goTo = infowindow[i];
					var content = getAddressInfos(self.goTo.content);
					$('#address .address').text(content.address);
					$('#address .city').text(content.city);
					$('#address .country').text(content.country);
				})
				if(self.origin.OriginRoute) {
					if(self.goTo != null) { getDirection(); }
				}
				if(self.defaults.streetViewControl) {
					var stv = self.map.getStreetView();
					google.maps.event.addListener(stv, 'visible_changed', function() {
						if (stv.getVisible()) {
							$('#gmap-address').css('opacity',0).css('visibility','hidden');
						} else {
							$('#gmap-address').css('opacity',1).css('visibility','visible');
						}
					});
				}
			});
    }

	/**
	 * Re center map
	 * @param toBounds
	 * @param offsetX
	 * @param offsetY
	 */
	function centerMap(toBounds, offsetX, offsetY) {
		var self = this;
		var center;
		var newCenter;

		if (toBounds) {
			self.bounds = self.map.getBounds();
			self.map.panToBounds(self.bounds);
			center = self.map.getCenter();
		} else {
			center = self.defaults.center;
			self.map.setZoom(self.defaults.zoom);
		}

		var scale = Math.pow(2, self.map.getZoom());

		var worldCoordinateCenter = self.map.getProjection().fromLatLngToPoint(center);
		var pixelOffset = new google.maps.Point( (offsetX/scale) || 0,(offsetY/scale) || 0 );

		var worldCoordinateNewCenter = new google.maps.Point(
			worldCoordinateCenter.x - pixelOffset.x,
			worldCoordinateCenter.y + pixelOffset.y
		);

		newCenter = self.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

		self.map.setCenter(newCenter);
	}

	/**
	 * Empty direction panel then check for new content to apply custom scrollbar
	 */
	function showDirectionPanel() {
		$('#r-directions').addClass('sizedirection');
		var checkRoute = setInterval(function () {
			var fill = $("#r-directions .adp").html();
			if (fill !== undefined) {
				// Custom Scrollbar
				$('#r-directions .adp').perfectScrollbar({suppressScrollX: true});
				clearInterval(checkRoute);
			}
		}, 50);
	}

	/**
	 * Remove direction renderer
	 */
	function delDirections() {
		var self = this;
		var layers = self.gMap.get();

		for (var index in layers) {
			if(layers[index].hasOwnProperty('directions')) {
				$('#r-directions').empty().removeClass('sizedirection');
				layers[index].setMap(null);
			}
		}
	}

    /**
     * Trace la route sur la carte
     */
    function setDirection() {
    	var self = this;
    	var item = self.origin;
    	var dest = $('#getadress').val();

		if (dest.length != 0) {
			delDirections();

			self.gMap
				.route({
					origin: dest,
					//destination: item.OriginAddress,
					destination: self.goTo.position,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				})
				.directionsrenderer(function (results) {
						if (results) {
							showDirectionPanel();
							return {
								panel: "#r-directions",
								directions: results
							}
						}
					}
				)
				.then(function(){
					var x = $('#gmap-address').width()/2;
					centerMap(true,x,0);
				})
				.catch(function (error) {
					console.error('catched: ' + error);
				});
		}
    }

    /**
     * Formulaire de recherche d'itinéraire
     */
    function getDirection() {
        $('.form-search').submit(function(e) {
            e.preventDefault();
            setDirection();
        });

		$('#hidepanel').on('click',function(){
			if($('#hidepanel > span.fa').hasClass('fa-caret-left'))
			{
				$('#gmap-address').css('left', -($('#gmap-address').width()));
				$($('#hidepanel > span.fa')).removeClass('fa-caret-left').addClass('fa-caret-right');
			}
			else {
				$('#gmap-address').css('left', '0');
				$($('#hidepanel > span.fa')).removeClass('fa-caret-right').addClass('fa-caret-left');
			}
		});

		$('#showform').on('click',function(){
			if($('#showform > span.fa').hasClass('fa-arrow-circle-right')) {
				$('#showform > span.fa').removeClass('fa-arrow-circle-right').addClass('fa-times');
			}
			else {
				$('#showform > span.fa').removeClass('fa-times').addClass('fa-arrow-circle-right');
				delDirections();
				if(self.markers.length > 1) {
					self.gMap.fit();
				} else {
					centerMap(false);
				}
				$('#getadress').val('');
			}
		});
    }

    return {
        //Fonction Public
        run:function (config,options) {
            init(config,options); //init.call(this,originData);
        }
    };
})(jQuery);