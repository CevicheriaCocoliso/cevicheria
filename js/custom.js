(function ($) {

	"use strict";

	var $document = $(document),
		$window = $(window),
		plugins = {
			mainSlider: $('#mainSlider'),
			slideNav: $('#slide-nav'),
			categoryCarousel: $('.category-carousel'),
			servicesCarousel: $('.services-carousel'),
			servicesAltCarousel: $('.services-alt'),
			testimonialsCarousel: $('.testimonials-carousel'),
			servicesBlockAlt: $('.services-block-alt'),
			textIconCarousel: $('.text-icon-carousel'),
			personCarousel: $('.person-carousel'),
			submenu: $('[data-submenu]'),
			googleMapFooter: $('#footer-map'),
			counterBlock: $('#counterBlock'),
			isotopeGallery: $('.gallery-isotope'),
			postGallery: $('.blog-isotope'),
			postCarousel: $('.post-carousel'),
			prdCarousel: $('.prd-carousel'),
			postMoreLink: $('.view-more-post'),
			testimonialMoreLink: $('.view-more-testimonial'),
			getQuoteLink: $('.form-popup-link'),
			animation: $('.animation'),
			rangeSlider: $('#rangeSlider1'),
			stickyHeader: $(".header-sticky"),
			productImage: $("#mainImage"),
			dropMenu: $('.dropdown-menu')
		},
		$shiftMenu = $('#slidemenu, #pageContent, #mainSliderWrapper, .page-footer, .page-header .header-row, body, .darkout-menu'),
		$navbarToggle = $('.navbar-toggle'),
		$dropdown = $('.dropdown-submenu, .dropdown'),
		$fullHeight = $('#mainSlider, #mainSlider .img--holder'),
		$marginTop = $('body.fixedSlider #pageContent'),
		$marginBottom = $('body.fixedFooter #pageContent');

	/* ---------------------------------------------
				Scripts initialization
	--------------------------------------------- */
	$document.ready(function () {

		var windowWidth = window.innerWidth || $window.width();
		var windowH = $window.height();

		// print coupons
		printThis('.print-link', '.coupon-print');
		
		// set fullheigth
		if (windowWidth < 992) {
			$fullHeight.height('');
		} else {
			var windowHeight = $window.height();
			var footerHeight = $('.page-footer').height();
			$fullHeight.height(windowHeight);
			$marginTop.css({
				'margin-top': windowHeight + 'px'
			});
			$marginBottom.css({
				'margin-bottom': footerHeight + 'px'
			})
		}

		// vertical tabs
		$("div.vertical-tab-menu>div.list-group>a").on('click', function (e) {
			e.preventDefault();
			$(this).siblings('a.active').removeClass("active");
			$(this).addClass("active");
			var index = $(this).index();
			$("div.vertical-tab>div.vertical-tab-content").removeClass("active");
			$("div.vertical-tab>div.vertical-tab-content").eq(index).addClass("active");
		});

		// collapsed text
		$(".view-more-link").on('click', function (e) {
			var $this = $(this);
			var $target = $($this.attr('href'));
			if ($this.hasClass('opened')) {
				$this.removeClass('opened');
				$('.view-more-mobile', $target).stop(true, true).fadeOut();
			} else {
				$this.addClass('opened');
				$('.view-more-mobile', $target).stop(true, true).fadeIn();
			}
			e.preventDefault();
		})

		if (plugins.getQuoteLink.length) {
			plugins.getQuoteLink.on('click', function (e) {
				$(this).next().toggleClass('opened');
				e.preventDefault();
			})
			$(document).on('click', function (event) {
				if (!$(event.target).closest('.form-popup-wrap').length) {
					if ($('.form-popup').hasClass("opened")) {
						$('.form-popup').removeClass('opened');
					}
				}
			})
		}

		// image animation in modal (appointment form)
		$('header .appointment').on('click', function () {
			$('html').css({
				'overflow-y': 'hidden'
			});
			$('.page-header, #mainSliderWrapper').css({
				'padding-right': getScrollbarWidth() + 'px'
			});
		})
		$('.modal').on('shown.bs.modal', function () {
			var $el = $('.animate', $(this));
			doAnimations($el);
		}).on('hidden.bs.modal', function () {
			var $el = $('.animate', $(this));
			$el.addClass('animation');
			$('html').css({
				'overflow-y': ''
			})
			$('.page-header, #mainSliderWrapper').css({
				'padding-right': ''
			});
		})

		// set background image inline
		if ($('[data-bg]').length) {
			$('[data-bg]').each(function () {
				var $this = $(this),
					bg = $this.attr('data-bg');
				$this.css({
					'background-image': 'url(' + bg + ')'
				});
			})
		}

		// main slider
		if (plugins.mainSlider.length) {
			var $el = plugins.mainSlider;
			$el.on('init', function (e, slick) {
				var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
				doAnimations($firstAnimatingElements);
			});
			$el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
				var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
				var $animatingElements = $currentSlide.find('[data-animation]');
				setTimeout(function () {
					$('div.slide').removeClass('slidein');
				}, 500);
				setTimeout(function () {
					$currentSlide.addClass('slidein');
				}, 1000);
				doAnimations($animatingElements);
			});
			$el.slick({
				arrows: true,
				dots: false,
				autoplay: true,
				autoplaySpeed: 7000,
				fade: true,
				speed: 500,
				pauseOnHover: false,
				pauseOnDotsHover: true
			});
		}

		// number counter
		if (plugins.counterBlock.length) {
			plugins.counterBlock.waypoint(function () {
				$('.number > span.count', plugins.counterBlock).each(count);
				this.destroy();
			}, {
				triggerOnce: true,
				offset: '80%'
			});
		}

		// slide menu
		if (plugins.slideNav.length) {
			var $slideNav = plugins.slideNav,
				toggler = '.navbar-toggle',
				$closeNav = $('.darkout-menu, .close-menu');

			$slideNav.after($('<div id="navbar-height-col"></div>'));
			var $heightCol = $('#navbar-height-col')
			$slideNav.on("click", toggler, function (e) {
				var $this = $(this);
				$heightCol.toggleClass('slide-active');
				$this.toggleClass('slide-active');
				$shiftMenu.toggleClass('slide-active');
			});
			$closeNav.on("click", function (e) {
				$heightCol.toggleClass('slide-active');
				$shiftMenu.toggleClass('slide-active');
			});
		}

		// image popup
		if (plugins.isotopeGallery.length) {
			plugins.isotopeGallery.find('a.hover').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		}

		// gallery isotope
		if (plugins.isotopeGallery.length) {
			var $gallery = plugins.isotopeGallery;
			$gallery.imagesLoaded(function () {
				$gallery.isotope({
					itemSelector: '.gallery-item',
					masonry: {
						columnWidth: '.gallery-item',
						gutter: 30
					}
				});
			});
			isotopeFilters($gallery);
		}

		// post isotope
		if (plugins.postGallery.length) {
			var $postgallery = $('.blog-isotope');
			$postgallery.imagesLoaded(function () {
				$postgallery.isotope({
					itemSelector: '.blog-post, .testimonial-card',
					masonry: {
						gutter: 30,
						columnWidth: '.blog-post, .testimonial-card'
					}
				});
			});
		}

		// post more ajax load
		if (plugins.postMoreLink.length) {
			var $postMoreLink = plugins.postMoreLink,
				$postPreload = $('#postPreload'),
				$postLoader = $('#moreLoader');

			$postMoreLink.on('click', function () {
				var target = $(this).attr('data-load');
				$postLoader.addClass('visible');
				$(this).hide();
				$.ajax({
					url: target,
					success: function (data) {
						setTimeout(function () {
							$postPreload.append(data);
							$postLoader.removeClass('visible');
						}, 500);
					}
				});
			})
		}

		// testimonial more ajax load
		if (plugins.testimonialMoreLink.length) {
			var $testimonialMoreLink = plugins.testimonialMoreLink,
				$testimonialPreload = $('#testimonialPreload'),
				$testimonialLoader = $('#moreLoader');

			$testimonialMoreLink.on('click', function () {
				var target = $(this).attr('data-load');
				$testimonialLoader.addClass('visible');
				$(this).hide();
				$.ajax({
					url: target,
					success: function (data) {
						$testimonialPreload.append(data);
						$testimonialLoader.removeClass('visible');
						if (plugins.postGallery.length) {
							$(' > div', $testimonialPreload).each(function () {
								var $item = $(this);
								plugins.postGallery.append($item).isotope('appended', $item);
							});
						}
					}
				});
			})
		}

		// product gallery
		if (plugins.productImage.length) {
			plugins.productImage.elevateZoom({
				gallery: 'productPreviews',
				cursor: 'pointer',
				galleryActiveClass: 'active',
				zoomWindowPosition: 1,
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 500,
				lensFadeIn: 500,
				lensFadeOut: 500
			});
			var ezApi = plugins.productImage.data('elevateZoom');
			var windowWidth = window.innerWidth || $window.width();
			if (windowWidth < 769) {
				ezApi.changeState('disable');
			}
			var mq = window.matchMedia('(min-width: 768px)');
			mq.addListener((b) => {
				if (b.matches) {
					ezApi.changeState('enable');
				} else {
					ezApi.changeState('disable');
				}
			});
			$('#productPreviews > a').on('click', function () {
				plugins.productImage.attr({
					src: $(this).attr('data-image'),
					'data-zoom-image': $(this).attr('data-zoom-image')
				})
			})
		}

		// icrease/decrease input
		function changeInput() {
			$(document).on('click', '.count-add, .count-reduce', function (e) {
				var $this = $(e.target),
					input = $this.parent().find('.count-input'),
					v = $this.hasClass('count-reduce') ? (input.val() - 1) : (input.val() * 1 + 1),
					min = input.attr('data-min') ? input.attr('data-min') : 1;
				if (v >= min) input.val(v);
				e.preventDefault();
			});
		}
		changeInput();

		// rangeSlider
		if (plugins.rangeSlider.length) {
			var rangeSlider1 = document.getElementById('rangeSlider1');
			noUiSlider.create(rangeSlider1, {
				start: [100, 2000],
				connect: true,
				step: 100,
				padding: 100,
				range: {
					'min': 0,
					'max': 10100,
				}
			});
			var number1_1 = document.getElementById('number-1-1');
			var number1_2 = document.getElementById('number-1-2');
			rangeSlider1.noUiSlider.on('update', function (values, handle) {
				var value = values[handle];
				if (handle) {
					number1_1.textContent = Math.round(value);
				} else {
					number1_2.textContent = Math.round(value);
				}
			});
			number1_1.addEventListener('change', function () {
				rangeSlider1.noUiSlider.set([this.textContent, null]);
			});
			number1_2.addEventListener('change', function () {
				rangeSlider1.noUiSlider.set([null, this.textContent]);
			});
		}
		$.fn.dropMenu = function () {
			var $drop = this,
				$body = $('body');
			$('li', $drop).on('mouseenter', function () {
				if ($('ul', this).length) {
					var $elm = $('ul:first', this),
						off = $elm.offset(),
						isInside = (off.left + $elm.width() <= $body.width());
					if (!isInside) {
						$elm.addClass('posRight');
					} else {
						$elm.removeClass('posRight');
					}
				}
			}).on('mouseleave', function () {
				if ($('ul', this).length) {
					var $elm = $('ul:first', this);
					setTimeout(function () {
						$elm.removeClass('posRight');
					}, 200);
				}
			})
		}
		$.fn.stickyHeader = function () {
			var $header = this,
				$body = $('body'),
				headerOffset,
				stickyH;

			function setHeigth() {
				$(".fix-space").remove();
				$header.removeClass('animated is-sticky slideInDown');
				$body.removeClass('hdr-sticky');
				headerOffset = $('#slidemenu', $header).offset().top;
				stickyH = $header.height() + headerOffset;
			}
			setHeigth();
			var prevWindow = window.innerWidth || $(window).width()
			$(window).bind('resize', function () {
				var currentWindow = window.innerWidth || $(window).width();
				if (currentWindow != prevWindow) {
					setHeigth()
					prevWindow = currentWindow;
				}
			});
			$(window).scroll(function () {
				if (prevWindow < 992) return;
				var st = getCurrentScroll();
				if (st > headerOffset) {
					if (!$(".fix-space").length && !$body.hasClass('home')) {
						$header.after('<div class="fix-space"></div>');
						$(".fix-space").css({
							'height': $header.height() + 'px'
						});
					}
					$header.addClass('is-sticky animated slideInDown');
					$body.addClass('hdr-sticky');
				} else {
					$(".fix-space").remove();
					$header.removeClass('animated is-sticky slideInDown');
					$body.removeClass('hdr-sticky');
				}
			});

			function getCurrentScroll() {
				return window.pageYOffset || document.documentElement.scrollTop;
			}
		}

		// CAROUSELS

		// products carousel
		if (plugins.prdCarousel.length) {
			plugins.prdCarousel.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				dots: false,
				arrows: true,
				responsive: [{
					breakpoint: 1299,
					settings: {
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		}

		// text_icon carousel
		if (plugins.textIconCarousel.length) {
			plugins.textIconCarousel.slick({
				mobileFirst: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: true,
				arrows: false,
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		}

		// testimonials carousel
		if (plugins.testimonialsCarousel.length) {
			plugins.testimonialsCarousel.slick({
				mobileFirst: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 3000,
				arrows: false,
				dots: true,
				fade: true,
				cssEase: 'linear'
			});
		}
		// person carousel (team)
		if (plugins.personCarousel.length) {
			plugins.personCarousel.slick({
				mobileFirst: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		}


		// category carousel
		if (plugins.categoryCarousel.length) {
			plugins.categoryCarousel.slick({
				mobileFirst: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		}

		// post carousel
		if (plugins.postCarousel.length) {
			plugins.postCarousel.slick({
				mobileFirst: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
				arrows: true,
				dots: false
			});
		}

		// END CAROUSELS

		// lazy loading effect
		if (plugins.animation.length) {
			onScrollInit(plugins.animation, windowWidth);
		}

		toggleNavbarMethod(windowWidth);
		toggleCart('.header-cart', '.header-cart-dropdown');
		mobileClickBanner(windowWidth);

		if (plugins.stickyHeader.length) {
			$(plugins.stickyHeader).stickyHeader();
		}
		if (plugins.dropMenu.length) {
			$(plugins.stickyHeader).dropMenu();
		}

		// Resize window events
		$window.resize(function () {
			var windowWidth = window.innerWidth || $window.width();

			startCarousel();

			if (windowWidth < 992) {
				$fullHeight.height('');
			}
			if (windowWidth > 767 && $navbarToggle.is(':hidden')) {
				$shiftMenu.removeClass('slide-active');
			}
			if (plugins.servicesBlockAlt.length) {
				$(".services-block-alt, .services-block-alt .title, .services-block-alt .text").each(function () {
					$(this).css({
						'height': ''
					});
				})
			}
		});

		$(window).resize(debouncer(function (e) {
			var windowWidth = window.innerWidth || $window.width();
			if (windowWidth > 991) {
				$fullHeight.height($(window).height());
			}

			if (windowWidth > 768) {
				if (plugins.servicesCarousel.length) {
					equalHeight(".text-icon-carousel > div", ".title", ".text");
				}
			}
			if (windowWidth > 480) {
				if (plugins.servicesBlockAlt.length) {
					equalHeight(".services-block-alt", ".title", ".text");
				}
			}

			$dropdown.removeClass('opened');
			toggleNavbarMethod(windowWidth);
			mobileClickBanner(windowWidth);
		}))

	})

	$window.on('load', function () {

		var windowWidth = window.innerWidth || $window.width();

		startCarousel();

		// remove preloader
		$('#loader-wrapper').fadeOut(500);
		if (windowWidth > 768) {
			if (plugins.servicesCarousel.length) {
				equalHeight(".text-icon-carousel > div", ".title", ".text");
			}
		}
		if (windowWidth > 480) {
			if (plugins.servicesBlockAlt.length) {
				equalHeight(".services-block-alt", ".title", ".text");
			}
		}
		if (plugins.googleMapFooter.length) {
			createMap('footer-map', 14, 37.36274700000004, -122.03525300000001)
		}

	});


	/* ---------------------------------------------
     Functions
    --------------------------------------------- */

	// Set equal height to block
	function equalHeight(block) {
		var wrapWidth = $(block).parent().width(),
			blockWidth = $(block).width(),
			wrapDivide = Math.floor(wrapWidth / blockWidth),
			cellArr = $(block);
		for (var arg = 1; arg <= arguments.length; arg++) {
			for (var i = 0; i <= cellArr.length; i = i + wrapDivide) {
				var maxHeight = 0,
					heightArr = [];
				for (var j = 0; j < wrapDivide; j++) {
					heightArr.push($(cellArr[i + j]).find(arguments[arg]));
					if (heightArr[j].outerHeight() > maxHeight) {
						maxHeight = heightArr[j].outerHeight();
					}
				}
				for (var counter = 0; counter < heightArr.length; counter++) {
					$(cellArr[i + counter]).find(arguments[arg]).outerHeight(maxHeight);
				}
			}
		}
	}

	// Slider Animation
	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
			if ($this.hasClass('animate')) {
				$this.removeClass('animation');
			}
		});
	}

	// Time Out Resize
	function debouncer(func, timeout) {
		var timeoutID, timeout = timeout || 500;
		return function () {
			var scope = this,
				args = arguments;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function () {
				func.apply(scope, Array.prototype.slice.call(args));
			}, timeout);
		}
	}

	// Count To
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}

	// Isotope Filters (for gallery)
	function isotopeFilters(gallery) {
		var $gallery = $(gallery);
		if ($gallery.length) {
			var container = $gallery;
			var optionSets = $(".filters-by-category .option-set"),
				optionLinks = optionSets.find("a");
			optionLinks.on('click', function (e) {
				var thisLink = $(this);
				if (thisLink.hasClass("selected")) return false;
				var optionSet = thisLink.parents(".option-set");
				optionSet.find(".selected").removeClass("selected");
				thisLink.addClass("selected");
				var options = {},
					key = optionSet.attr("data-option-key"),
					value = thisLink.attr("data-option-value");
				value = value === "false" ? false : value;
				options[key] = value;
				if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
				else {
					container.isotope(options);
				}
				return false
			})
		}
	}

	// Mobile Only carousel initialization
	function slickMobile(carousel, breakpoint, slidesToShow, slidesToScroll) {
		var windowWidth = window.innerWidth || $window.width();
		if (windowWidth < (breakpoint + 1)) {
			carousel.slick({
				mobileFirst: true,
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToScroll,
				infinite: true,
				autoplay: false,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: breakpoint,
					settings: "unslick",
				}]
			});
		}
	}

	function startCarousel() {
		if (plugins.servicesAltCarousel.length) {
			slickMobile(plugins.servicesAltCarousel, 480, 1, 1);
		}
		if (plugins.servicesCarousel.length) {
			slickMobile(plugins.servicesCarousel, 767, 2, 2);
		}
	}

	// Navigation dropdown menu
	function toggleNavbarMethod(windowWidth) {
		var $dropdownLink = $(".dropdown > a, .dropdown-menu > li > a");
		var $dropdown = $(".dropdown, .dropdown-menu");
		var $dropdownCaret = $(".dropdown > a > .ecaret, .dropdown-menu > li > a .ecaret");
		$dropdownLink.on('click.toggleNavbarMethod', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var url = $(this).attr('href');
			if (url) $(location).attr('href', url);
		});
		if (windowWidth < 768) {
			$dropdown.unbind('.toggleNavbarMethod');
			$dropdownCaret.unbind('.toggleNavbarMethod');
			$dropdownCaret.on('click.toggleNavbarMethod', function (e) {
				e.stopPropagation();
				e.preventDefault();
				var $li = $(this).parent().parent('li');
				if ($li.hasClass('opened')) {
					$li.find('.dropdown-menu').first().stop(true, true).slideUp(0);
					$li.removeClass('opened');
				} else {
					$li.find('.dropdown-menu').first().stop(true, true).slideDown(0);
					$li.addClass('opened');
				}
			})
		}
	}

	// Header Cart dropdown menu
	function toggleCart(cart, drop) {
		$('> a', $(cart)).on('click', function () {
			$(cart).toggleClass('opened');
		});
		$(document).on('click', function (e) {
			if (!$(e.target).closest(cart).length) {
				if ($(cart).hasClass("opened")) {
					$(cart).removeClass('opened');
				}
			}
		})
	}

	// Lazy Load animation
	function onScrollInit(items, wW) {
		if (wW > 991) {
			if (!$('body').data('firstInit')) {
				items.each(function () {
					var $element = $(this),
						animationClass = $element.attr('data-animation'),
						animationDelay = $element.attr('data-animation-delay');
					$element.removeClass('no-animate');
					$element.css({
						'-webkit-animation-delay': animationDelay,
						'-moz-animation-delay': animationDelay,
						'animation-delay': animationDelay
					});
					var trigger = $element;
					trigger.waypoint(function () {
						$element.addClass('animated').addClass(animationClass);
						if ($element.hasClass('hoveranimation')) {
							$element.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function () {
								$(this).removeClass("animated").removeClass("animation").removeClass(animationClass);
							});
						}
					}, {
						triggerOnce: true,
						offset: '90%'
					});
				});
				$('body').data('firstInit', true);
			}
		} else {
			items.each(function () {
				var $element = $(this);
				$element.addClass('no-animate')
			})
		}
	}

	// Get Scrollbar Width
	function getScrollbarWidth() {
		var outer = document.createElement("div");
		outer.style.visibility = "hidden";
		outer.style.width = "100px";
		outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

		document.body.appendChild(outer);

		var widthNoScroll = outer.offsetWidth;
		// force scrollbars
		outer.style.overflow = "scroll";

		// add innerdiv
		var inner = document.createElement("div");
		inner.style.width = "100%";
		outer.appendChild(inner);

		var widthWithScroll = inner.offsetWidth;

		// remove divs
		outer.parentNode.removeChild(outer);

		return widthNoScroll - widthWithScroll;
	}

	// Click event to banner on mobile when action button is hidden
	function mobileClickBanner(wW) {
		if (wW < 768) {
			$(".banner-under-slider").on('click', function (e) {
				var $this = $(this);
				var target = $this.find('.action .btn').attr('href');
				if (target) $(location).attr('href', target);
				e.preventDefault();
			})
		} else {
			$(".banner-under-slider").unbind('click');
		}
	}


	// Google Map
	function createMap(id, mapZoom, lat, lng) {
		// Create google map
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: mapZoom,
			scrollwheel: false, // The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(lat, lng),
			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#e9e9e9"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 18
				}]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [{
					"color": "#ffffff"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f5f5f5"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [{
					"color": "#dedede"
				}, {
					"lightness": 21
				}]
			}, {
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#ffffff"
				}, {
					"lightness": 16
				}]
			}, {
				"elementType": "labels.text.fill",
				"stylers": [{
					"saturation": 36
				}, {
					"color": "#333333"
				}, {
					"lightness": 40
				}]
			}, {
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [{
					"color": "#f2f2f2"
				}, {
					"lightness": 19
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#fefefe"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				}]
			}]
		};
		// Get the HTML DOM element that will contain your map 
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById(id);
		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);
		var image = 'images/map-marker.png';
		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			icon: image
		});

	}
	
	// print
	function printThis(link, target) {
		$(link).on('click', function (e) {
			e.preventDefault();
			$(this).closest(target).print();
		});
	}
	
	// END FUNCTIONS

})(jQuery);