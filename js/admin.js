var MC_plugins_gmap = (function ($, undefined) {
	/**
	 * @param input
	 */
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#preview').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
			$('#preview').removeClass('no-img').addClass('preview');
		}
	}

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
	 * watch fields
	 * @param field
	 */
	function watch(field) {
		field.keypress(function () {
			updateTimer('', 'MC_plugins_gmap.initMapConfig();');
		}).change(function () {
			updateTimer(100, 'MC_plugins_gmap.initMapConfig();');
		});
	}

    /**
     * Retreive lat and lng of the address
     */
    function loadMapConfig(){
    	var addr = $('#address').val(),
			postc = $('#postcode').val(),
			city = $('#city').val();

    	if( addr !== '' && postc !== '' && city !== '' ) {
			var adr = addr +', '+ postc +' '+ city + ', ' + $('#country').val();

			$('#contener-map')
				.gmap3()
				.latlng({
					address: adr
				}).then(function(latlng){
				$("#lat").val(latlng.lat());
				$("#lng").val(latlng.lng());
			});
		}
    }

	/**
	 * Replace the submit button by a loader icon.
	 * @param {string} f - id of the form.
	 * @param {boolean} [closeForm=true] - hide the form.
	 */
	function displayLoader(f,closeForm) {
		$('input[type="submit"], button[type="submit"]').hide();
		closeForm = typeof closeForm !== 'undefined' ? closeForm : true;
		var loader = $(document.createElement("div")).addClass("loader")
			.append(
				$(document.createElement("i")).addClass("fa fa-spinner fa-pulse fa-2x fa-fw"),
				$(document.createElement("span")).append("Chargement en cours...").addClass("sr-only")
			);
		if(closeForm) $(f).collapse();
		$('.mc-message').before(loader);
	}

	/**
	 * Remove the loader icon.
	 * @param {string} f - id of the form.
	 * @param {boolean} [closeForm=true] - hide the form.
	 */
	function removeLoader(f,closeForm) {
		closeForm = typeof closeForm !== 'undefined' ? closeForm : true;
		if(closeForm) $(f).collapse('hide');
		$('.loader').remove();
		$('input[type="submit"], button[type="submit"]').show();
	}

	/**
	 * Initialise the display of notice message
	 * @param {html} m - message to display.
	 * @param {int|boolean} [timeout=false] - Time before hiding the message.
	 */
	function initAlert(m,timeout) {
		timeout = typeof timeout !== 'undefined' ? timeout : false;
		$.nicenotify.initbox(m,{ display:true });
		if(timeout) window.setTimeout(function () { $('.mc-message .alert').alert('close'); }, timeout);
	}

	/**
	 * Assign the correct success handler depending of the validation class attached to the form
	 * @param {string} f - id of the form.
	 */
	function successHandler(f) {
		// --- Default options of the ajax request
		var options = {
			ntype: "submit",
			uri: $(f).attr('action'),
			typesend: 'post',
			idforms: $(f),
			resetform: false,
			beforeParams: function () {
				displayLoader(f, false);
			},
			successParams: function (d) {
				removeLoader(f, false);
				if(d.debug !== undefined && d.debug !== '') {
					initAlert(d.debug);
				}
				else if(d.notify !== undefined && d.notify !== '') {
					initAlert(d.notify,4000);
				}
			}
		};

		// --- Rules form classic add form
		if($(f).hasClass('add_form')) {
			options.resetform = true;
		}
		else if($(f).hasClass('edit_form')) {
			options.successParams = function (d) {
				removeLoader(f, false);
				if(d.debug !== undefined && d.debug !== '') {
					initAlert(d.debug);
				}
				else if(d.notify !== undefined && d.notify !== '') {
					initAlert(d.notify,4000);
                    if($(f).attr('id') === 'edit_content_form') {
                    	if(d.result !== null) $('#page_id').val(d.result.id);
                    } else {
						if($('#img').val() !== '' && $('#img').val() !== null) {
							$('.toggleModal').removeClass('hide');
							$('.resetImg').addClass('hide');
						}
                    }
				}
			}
		}
		else if($(f).hasClass('delete_form')) {
			options.resetform = true;
			options.beforeParams = function (d) {};
			options.successParams = function (d) {
				$('#delete_modal').modal('hide');
				$('#delete_img_modal').modal('hide');
				if(d.debug !== undefined && d.debug !== '') {
					initAlert(d.debug);
				}
				else if(d.notify !== undefined && d.notify !== '') {
					initAlert(d.notify,4000);
					if($(f).attr('id') === 'delete_img_form') {
						$("#img").val('');
						$('#preview').attr('src', '#').addClass('no-img').removeClass('preview');
						$('.toggleModal').addClass('hide');
					}
					else {
						$('#address_' + d.result.id).remove();
						var nbr = $('#table_adress').find('tr').length;
						if(nbr < 2) {
							$('#no-entry').removeClass('hide');
						}
					}
				}
			}
		}

		// --- Initialise the ajax request
		$.nicenotify(options);
	}

	/**
	 * Initialise the rules of validation for the form(s) matching the selector passed throught the form parameter
	 * @param {string} form - id of the form.
	 */
	function initValidation(form) {
		form = typeof form !== 'undefined' ? form : '.validate_form';
		sub = typeof sub !== 'undefined' ? sub : false;

		// --- Global validation rules
		$(form).each(function(){
			$(this).removeData();
			$(this).off();
			$(this).validate({
				ignore: [],
				onsubmit: true,
				event: 'submit',
				submitHandler: function(f,e) {
					e.preventDefault();
					successHandler(f);
					return false;
				}
			});
		});
	}

    return {
    	run: function () {
			initValidation();

			$(function() {
				$( 'a.toggleModal' ).click(function(){
					if($(this).attr('href') != '#'){
						var id = $(this).attr('href').slice(1);

						$('#id').val(id);
					}
				});

				$(".ui-sortable").sortable({
					items: "> tr",
					placeholder: "ui-state-highlight",
					cursor: "move",
					axis: "y",
					update: function () {
						var serial = $(".ui-sortable").sortable('serialize');
						$.nicenotify({
							ntype: "ajax",
							uri: '/' + baseadmin + '/plugins.php?name=gmap&getlang=' + getlang + '&tab=address&action=order',
							typesend: 'post',
							noticedata: serial,
							successParams: function (e) {
								$.nicenotify.initbox(e, {
									display: false
								});
							}
						});
					}
				});
				$(".ui-sortable").disableSelection();
			});
		},
		addAddress: function () {
			if ($("#contener-map").length != 0) {
				watch($('#adress'));
				watch($('#city'));
				watch($('#postcode'));
			}

			var defaultLabel = $('span#input-label').text();
			$('.inputfile').each(function() {
				var label	 = $('span#input-label'),
					labelVal = label.innerHTML;

				$(this).on( 'change', function( e )
				{
					var fileName = e.target.value;

					if( fileName != '' ) {
						label.text(fileName);
						if($(this).hasClass('inputpdf')) {
							$(this).next('label').addClass('filled').find('.fa-inverse').toggleClass('fa-upload').toggleClass('fa-file-pdf-o');
						}
					}
					else {
						label.text(labelVal);
					}
				});

				// Firefox bug fix
				$(this).on( 'focus', function(){ $(this).addClass( 'has-focus' ); });
				$(this).on( 'blur', function(){ $(this).removeClass( 'has-focus' ); });
			});

			$("#img").change(function(){
				readURL(this);
				if(typeof $('.resetImg') !== 'undefined') {
					$('.resetImg').removeClass('hide');
				}
			});

			$('.resetImg').click(function(e){
				e.preventDefault();
				$(this).addClass('hide');
				$("#img").val('');
				$('#preview').attr('src', '#').addClass('no-img').removeClass('preview');
				$( 'span#input-label' ).text(defaultLabel);
				return false;
			});
		},
		initMapConfig: function () {
			loadMapConfig();
		}
    };
})(jQuery);