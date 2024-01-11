
	// возвращает cookie с именем name, если есть, если нет, то undefined
	function getCookie(name) {
	  var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	// устанавливает cookie с именем name и значением value
	// options - объект с свойствами cookie (expires, path, domain, secure)
	function setCookie(name, value, options) {
	  options = options || {};

	  var expires = options.expires;

	  if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + "=" + value;

	  for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
		  updatedCookie += "=" + propValue;
		}
	  }

	  document.cookie = updatedCookie;
	}

	// удаляет cookie с именем name
	function deleteCookie(name) {
	  setCookie(name, "", {
		expires: -1
	  })
	}

	var font_sizes = [
	    8, 10, 12, 14, 16, 18, 20, 22, 24, 26
    ];
    var start_font = 3;
    if (getCookie('font_size') > 0) {
        start_font = getCookie('font_size');
        start_font = Number(start_font);
    }

    var content_divs = jQuery('.postdata-content, .catdata-content');
    content_divs.addClass('fontsize' + start_font);
    jQuery('.current_font_size').html(font_sizes[start_font] + 'px');
	function change_font(inc) {
		var sz = start_font;
		sz += inc;
		if ( sz < 0 ) sz = 0;
		if ( sz > 9 ) sz = 9;
		start_font = sz;

		deleteCookie('font_size');
        setCookie('font_size', start_font, {
            expires: 60 * 60 * 24,
            path: '/',
            domain: window.location.hostname
        });

        content_divs.removeClass('fontsize0 fontsize1 fontsize2 fontsize3 fontsize4 fontsize5 fontsize6 fontsize7 fontsize8 fontsize9')
            .addClass('fontsize' + start_font);
        jQuery('.current_font_size').html(font_sizes[start_font] + 'px');
	}

	jQuery(document).ready(function(){

		jQuery('.main-slider').slick(
			{
				autoplay: true,
				arrows: false,
				dots: true,
				fade: true,
				infinite: true,
				pauseOnFocus: false,
				autoplaySpeed: 10000,
				speed: 2000,
				pauseOnHover: false,
			}
		);

		jQuery(document).mouseup(function (e) {
			var container = jQuery("header");
			var sandv_button = jQuery("#menu-btn");
			var length1 = container.has(e.target).length;
			var length2 = sandv_button.has(e.target).length;
			if (!container.is(e.target) && length2 === 0 && length1 === 0){
				sandv_button.parent().removeClass('is-active');
				jQuery('header .menu-area').removeClass('shown_sm');
				jQuery('header').removeClass('active');
			}
		});
		jQuery('#menu-btn').click(function(){
			jQuery('header').toggleClass('active');
			jQuery('header .menu-area').toggleClass('shown_sm');
			jQuery(this).parent().toggleClass('is-active');
		});
		jQuery('header .theme-buttons button').click(function(){
			jQuery('header .theme-buttons button').removeClass('active');
			jQuery(this).addClass('active');
			if (jQuery(this).hasClass('bright-theme')) {
				jQuery('body').removeClass('night');
				setCookie('display_mode', 'day', {expires: 60*60*24, path: '/', domain: window.location.hostname});
			} else {
				jQuery('body').addClass('night');
				setCookie('display_mode', 'night', {expires: 60*60*24, path: '/', domain: window.location.hostname});
			}
		});
        jQuery('header .theme-buttons button').removeClass('active');
        if (getCookie('display_mode') == 'night') {
            jQuery('header .theme-buttons .dark-theme').addClass('active');
            jQuery('body').addClass('night');
            setCookie('display_mode', 'night', {
                expires: 60 * 60 * 24,
                path: '/',
                domain: window.location.hostname
            });
        } else {
            jQuery('header .theme-buttons .bright-theme').addClass('active');
            jQuery('body').removeClass('night');
            setCookie('display_mode', 'day', {
                expires: 60 * 60 * 24,
                path: '/',
                domain: window.location.hostname
            });
        }

		let admin_top = 0;
		function calc_admin_bar() {
			if (jQuery('body.admin-bar').length) {
				if (window.innerWidth > 767) {
					admin_top = 32;
				} else {
					admin_top = 46;
				}
			} else {
				admin_top = 0;
			}
		}
		setTimeout(function() {
			var main_height = jQuery('#main').height();
			var calc_height = 0;
			if (main_height < (window.innerHeight - 420)) {
				calc_height = window.innerHeight - 420;
			} else {
				calc_height = main_height;
			}
			if (window.innerWidth > 767) {
				jQuery('header').css('height', (window.innerHeight) + 'px');
				if (window.innerWidth > 767) {
					jQuery('header .menu-area').css('height', (window.innerHeight - 380) + 'px');
				} else {
					jQuery('header .menu-area').css('height', '100%');
				}
			} else {
				jQuery('header').css('height', '');
			}
			jQuery('#main-column').css('min-height', calc_height + 'px');

		}, 150);

		let container_margin = parseInt(jQuery('.body-content .container').css('margin-right'));
		if (window.innerWidth > 767) {
			jQuery('.main-slider-area .slick-dots').css('right', (container_margin) + 'px');
		} else {
			jQuery('.main-slider-area .slick-dots').css('right', 'unset');
		}
		let main_column_height = jQuery('#main-column').outerHeight();
		let below_posts_height = 0;
		let comments_height = 0;
		if (jQuery('#main-column .other-posts-area').length) {
			below_posts_height = jQuery('#main-column .other-posts-area').outerHeight();
		}
		if (jQuery('#comments').length) {
			comments_height = jQuery('#main-column #comments').outerHeight();
		}
		let float_height = main_column_height - below_posts_height - comments_height;
		let start_height = 0;
		if (window.innerWidth <= 767) {
			start_height = 80;
		}
		let start_height_delta = 0;
		if (jQuery('.catpage-header').length) {
			if (window.innerWidth > 767) {
				start_height += parseInt(jQuery('.catpage-header').height()) + parseInt(jQuery('.catpage-header').offset().top);
			} else {
				start_height += parseInt(jQuery('.catpage-header').height()) + parseInt(jQuery('.catpage-header').offset().top);
				float_height = float_height - 70;
				start_height_delta = start_height - 300;
				start_height = 300;
			}
		}

		function calc_floating_bar() {
			container_margin = parseInt(jQuery('.body-content .container').css('margin-right'));
			if (window.innerWidth > 767) {
				jQuery('.main-slider-area .slick-dots').css('right', (container_margin) + 'px');
			} else {
				jQuery('.main-slider-area .slick-dots').css('right', 'unset');
			}
			main_column_height = jQuery('#main-column').outerHeight();
			below_posts_height = 0;
			comments_height = 0;
			if (jQuery('#main-column .other-posts-area').length) {
				below_posts_height = jQuery('#main-column .other-posts-area').outerHeight();
			}
			if (jQuery('#comments').length) {
				comments_height = jQuery('#main-column #comments').outerHeight();
			}
			float_height = main_column_height - below_posts_height - comments_height;
			if (window.innerWidth > 767) {
				start_height = 0;
			} else {
				start_height = 80;
			}
			start_height_delta = 0;
			if (jQuery('.catpage-header').length) {
				if (window.innerWidth > 767) {
					start_height += parseInt(jQuery('.catpage-header').height()) + parseInt(jQuery('.catpage-header').offset().top);
				} else {
					start_height += parseInt(jQuery('.catpage-header').height()) + parseInt(jQuery('.catpage-header').offset().top);
					float_height = float_height - 70;
					start_height_delta = start_height - 300;
					start_height = 300;
				}
			}
		}

		setTimeout(function() {
			calc_admin_bar();
			if (window.innerWidth > 767) {
				jQuery('header').css('height', (window.innerHeight) + 'px');
			} else {
				jQuery('header').attr('style', '');
				if (window.innerWidth <= 600) {
					if (jQuery(window).scrollTop() > admin_top) {
						jQuery('header').css('top', '0px');
					} else {
						jQuery('header').css('top', admin_top + 'px');
					}
				} else {
					jQuery('header').css('top', admin_top + 'px');
				}
			}
			if (window.innerWidth > 767) {
				jQuery('header .menu-area').css('height', (window.innerHeight - 340 - admin_top) + 'px');
			} else {
				jQuery('header .menu-area').attr('style', '');
			}
			main_height = jQuery('#main').height();
			calc_height = 0;
			if (main_height < (window.innerHeight - 420)) {
				calc_height = window.innerHeight - 420;
			} else {
				calc_height = main_height;
			}
			jQuery('#main-column').css('min-height', calc_height + 'px');

			calc_admin_bar();

			if (window.innerWidth <= 600) {
				if (jQuery(window).scrollTop() > admin_top) {
					jQuery('body.admin-bar header').css('top', '0px');
				} else {
					jQuery('body.admin-bar header').css('top', admin_top + 'px');
				}
			} else {
				jQuery('body.admin-bar header').css('top', admin_top + 'px');
			}

			calc_floating_bar();
			jQuery(window).trigger('scroll');
		}, 450);

		jQuery(window).resize(function() {
			calc_admin_bar();

			if (window.innerWidth > 767) {
				jQuery('header').css('height', (window.innerHeight) + 'px');
			} else {
				jQuery('header').attr('style', '');
				calc_admin_bar();
				if (window.innerWidth <= 600) {
					if (jQuery(window).scrollTop() > admin_top) {
						jQuery('header').css('top', '0px');
					} else {
						jQuery('header').css('top', admin_top + 'px');
					}
				} else {
					jQuery('header').css('top', admin_top + 'px');
				}
			}
			if (window.innerWidth > 767) {
				jQuery('header .menu-area').css('height', (window.innerHeight - 340 - admin_top) + 'px');
			} else {
				jQuery('header .menu-area').css('height', '100%');
			}
			main_height = jQuery('#main').height();
			calc_height = 0;
			if (main_height < (window.innerHeight - 420)) {
				calc_height = window.innerHeight - 420;
			} else {
				calc_height = main_height;
			}
			jQuery('#main-column').css('min-height', calc_height + 'px');

			if (window.innerWidth <= 600) {
				if (jQuery(window).scrollTop() > admin_top) {
					jQuery('body.admin-bar header').css('top', '0px');
				} else {
					jQuery('body.admin-bar header').css('top', admin_top + 'px');
				}
			} else {
				jQuery('body.admin-bar header').css('top', admin_top + 'px');
			}

			calc_floating_bar();

			jQuery(window).trigger('scroll');
		});
		jQuery(window).scroll(function() {
			calc_admin_bar();
			if (window.innerWidth <= 600) {
				if (jQuery(window).scrollTop() > admin_top) {
					jQuery('body.admin-bar header').css('top', '0px');
				} else {
					jQuery('body.admin-bar header').css('top', admin_top + 'px');
				}
			} else {
				jQuery('body.admin-bar header').css('top', admin_top + 'px');
			}
			if (jQuery('.floating-navpanel').length) {
				if (window.innerWidth > 991) {
					if (jQuery(window).scrollTop() < start_height) {
						jQuery('.floating-navpanel').css({'position': 'absolute', 'left': 'unset', 'top': '0px', 'right': '15px'});
					} else if (jQuery(window).scrollTop() > start_height && jQuery(window).scrollTop() < start_height + float_height) {
						jQuery('.floating-navpanel').css({'position': 'fixed', 'top': '80px', 'right': (container_margin + 15) + 'px'});
					} else {
						jQuery('.floating-navpanel').css({'position': 'absolute', 'top': (float_height) + 'px', 'left': 'unset', 'right': '15px'});
					}
				} else if (window.innerWidth > 767) {
					if (jQuery(window).scrollTop() < start_height - admin_top) {
						jQuery('.floating-navpanel').css({'position': 'absolute', 'top': '-80px', 'left': (-container_margin) + 'px', 'right': (-container_margin) + 'px'});
					} else if (jQuery(window).scrollTop() < start_height + float_height + start_height_delta - admin_top) {
						jQuery('.floating-navpanel').css({'position': 'fixed', 'top': admin_top + 'px', 'left': '100px', 'right': '0px'});
					} else {
						jQuery('.floating-navpanel').css({'position': 'absolute', 'left': (-container_margin) + 'px', 'top': (float_height - 76) + 'px', 'right': (-container_margin) + 'px'});
					}
				} else {
					if (jQuery(window).scrollTop() < admin_top) {
						jQuery('.floating-navpanel').css({'position': 'fixed', 'top': (admin_top + 80) + 'px', 'left': 'unset', 'right': '15px'});
					} else if (jQuery(window).scrollTop() < start_height - admin_top) {
						jQuery('.floating-navpanel').css({'position': 'fixed', 'top': (80) + 'px', 'left': 'unset', 'right': '15px'});
					} else if (jQuery(window).scrollTop() < float_height + start_height_delta + 230 - admin_top) {
						jQuery('.floating-navpanel').css({'position': 'fixed', 'top': (80) + 'px', 'left': 'unset', 'right': '15px'});
					} else {
						jQuery('.floating-navpanel').css({'position': 'absolute', 'left': '15px', 'top': (float_height) + 'px', 'left': 'unset', 'right': '15px'});
					}
				}
			}
		});

		jQuery('.main-slider').on('setPosition', function(event, slick, currentSlide, nextSlide){
			container_margin = parseInt(jQuery('.body-content .container').css('margin-right'));
			if (window.innerWidth > 991) {
				jQuery('.main-slider-area .slick-dots').css('right', (container_margin) + 'px');
			} else {
				jQuery('.main-slider-area .slick-dots').css('right', 'unset');
			}
		});

		jQuery('.show-more-link').click(function(){
			let posts = 0;
			jQuery('.other-posts-area .catposts-table tr.more-posts').each(function() {
				if (posts < 10) {
					jQuery(this).removeClass('more-posts');
				}
				if (!jQuery('.other-posts-area .catposts-table tr.more-posts').length) {
					jQuery('.show-more-link').css('display', 'none');
				}
				posts++;
			});
			jQuery('.all-releases .more-posts').each(function() {
				if (posts < 9) {
					jQuery(this).removeClass('more-posts');
				}
				if (!jQuery('.all-releases .more-posts').length) {
					jQuery('.show-more-link').css('display', 'none');
				}
				posts++;
			});
		});
		jQuery('.floating-navpanel .scroll-top').click(function(e){
			jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
			e.preventDefault();
		});
		jQuery("#pagination-go").click(function(e) {
			let pageno = parseInt(jQuery("#pagination-pageno").val());
			jQuery.post(location.pathname, {getpagelink: "1", page_no: pageno}, function(data){
				location.href = data;
			});
		});
		jQuery('#pagination-pageno').on('keydown', function(e) {
			if (e.keyCode == 13) {
				jQuery("#pagination-go").trigger('click');
			}
		});
	});
