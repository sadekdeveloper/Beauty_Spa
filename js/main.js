(function ($) {
    "use strict";

    // THEMEFOREST POINT 5: Cache window object globally
    var $window = $(window);

    /*------------------------------------------------
    * Preloader 
    ------------------------------------------------*/
    $window.on('load', function () {
        var $loading = $('#loading');
        var $preloader = $('#preloader');
        if ($loading.length > 0) {
            $loading.fadeOut();
        }
        if ($preloader.length > 0) {
            $preloader.delay(300).fadeOut('slow');
        }
    });

    // skill
    var $skillPer = $(".skill-per");
    if ($skillPer.length > 0) {
        $skillPer.each(function () {
            var $this = $(this);
            var id = $this.attr("id");
            if (id) {
                $this.css("width", id + "%");
                $({
                    animatedValue: 0
                }).animate({
                    animatedValue: id
                }, {
                    duration: 1000,
                    step: function () {
                        $this.attr("id", Math.floor(this.animatedValue) + "%");
                    },
                    complete: function () {
                        $this.attr("id", Math.floor(this.animatedValue) + "%");
                    }
                });
            }
        });
    }

    // sticky (Optimized for performance)
    var $headerSticky = $("#header-sticky");
    if ($headerSticky.length > 0) {
        $window.on('scroll', function () {
            var scroll = $window.scrollTop();
            if (scroll < 200) {
                $headerSticky.removeClass("sticky-menu");
            } else {
                $headerSticky.addClass("sticky-menu");
            }
        });
    }

    // RESPONSIVE MENU
    var $mobileMenu = $('#mobile-menu');
    var $responsiveBtn = $('.responsive');
    if ($responsiveBtn.length > 0 && $mobileMenu.length > 0) {
        $responsiveBtn.on('click', function (e) {
            $mobileMenu.slideToggle();
        });
    }

    // meanmenu
    if ($mobileMenu.length > 0) {
        $mobileMenu.meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
    }

    // Helper function for simple click toggles (ThemeForest Best Practice)
    function bindToggleEvent(triggerClass, targetClass, action, toggleClass) {
        var $trigger = $(triggerClass);
        if ($trigger.length > 0) {
            $trigger.on('click', function (e) {
                if ($(this).is('a')) e.preventDefault();
                var $target = $(targetClass);
                if (action === 'add') {
                    $target.addClass(toggleClass);
                } else if (action === 'remove') {
                    $target.removeClass(toggleClass);
                } else {
                    $target.toggleClass(toggleClass);
                }
            });
        }
    }

    bindToggleEvent('.info-bar', '.extra-info', 'add', 'info-open');
    bindToggleEvent('.close-icon', '.extra-info', 'remove', 'info-open');
    bindToggleEvent(".menu-tigger", ".offcanvas-menu,.offcanvas-overly", 'add', 'active');
    bindToggleEvent(".menu-close,.offcanvas-overly", ".offcanvas-menu,.offcanvas-overly", 'remove', 'active');

    // menu toggle
    var $mainMenuLinks = $(".main-menu li a");
    if ($mainMenuLinks.length > 0 && $mobileMenu.length > 0) {
        $mainMenuLinks.on('click', function () {
            if ($window.width() < 700) {
                $mobileMenu.slideUp();
            }
        });
    }

    // smoth scroll
    var $smoothScrollLinks = $('a.smoth-scroll');
    if ($smoothScrollLinks.length > 0) {
        $smoothScrollLinks.on('click', function (event) {
            var $anchor = $(this);
            var targetUrl = $anchor.attr('href');
            if (targetUrl !== '#' && $(targetUrl).length > 0) {
                $('html, body').stop().animate({
                    scrollTop: $(targetUrl).offset().top - 100
                }, 1000);
            }
            event.preventDefault();
        });
    }

    // mainSlider
    var $basicSlider = $('.slider-active');
    if ($basicSlider.length > 0) {
        function mainSlider() {
            $basicSlider.on('init', function (e, slick) {
                var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
                doAnimations($firstAnimatingElements);
            });
            $basicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                doAnimations($animatingElements);
            });
            $basicSlider.slick({
                autoplay: true,
                autoplaySpeed: 10000,
                dots: false,
                fade: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            dots: false,
                            arrows: false
                        }
                    }
                ]
            });

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
                });
            }
        }
        mainSlider();
    }


    /* ====================================================================
       ALL Slick Sliders wrapped in length checks (ThemeForest Rule)
       ==================================================================== */

    var $servicesActive = $('.services-active');
    if ($servicesActive.length > 0) {
        $servicesActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $teamActive = $('.team-active');
    if ($teamActive.length > 0) {
        $teamActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $featureSliderActive = $('.feature-slider-active');
    if ($featureSliderActive.length > 0) {
        $featureSliderActive.slick({
            dots: false,
            infinite: true,
            arrows: false,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $portfolioActive = $('.portfolio-active');
    if ($portfolioActive.length > 0) {
        $portfolioActive.slick({
            dots: false,
            infinite: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $brandActive = $('.brand-active');
    if ($brandActive.length > 0) {
        $brandActive.slick({
            dots: false,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 1500,
            arrows: false,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $testimonialActive = $('.testimonial-active');
    if ($testimonialActive.length > 0) {
        $testimonialActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $testimonialActive2 = $('.testimonial-active2');
    if ($testimonialActive2.length > 0) {
        $testimonialActive2.slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 1500,
            infinite: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $sliderFor = $('.slider-for');
    var $sliderNav = $('.slider-nav');
    if ($sliderFor.length > 0 && $sliderNav.length > 0) {
        $sliderFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $sliderNav.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        });
    }

    var $homeBlogActive = $('.home-blog-active');
    if ($homeBlogActive.length > 0) {
        $homeBlogActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $homeBlogActive2 = $('.home-blog-active2');
    if ($homeBlogActive2.length > 0) {
        $homeBlogActive2.slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $blogActive = $('.blog-active');
    if ($blogActive.length > 0) {
        $blogActive.slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        });
    }

    // counterUp
    var $count = $('.count');
    if ($count.length > 0) {
        $count.counterUp({
            delay: 100,
            time: 1000
        });
    }

    /* magnificPopup img view */
    var $popupImage = $('.popup-image');
    if ($popupImage.length > 0) {
        $popupImage.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    /* magnificPopup video view */
    var $popupVideo = $('.popup-video');
    if ($popupVideo.length > 0) {
        $popupVideo.magnificPopup({
            type: 'iframe'
        });
    }

    // paroller
    var $paroller = $('.paroller');
    if ($paroller.length > 0) {
        $paroller.paroller();
    }

    //* Parallaxmouse js
    function parallaxMouse() {
        var $parallax = $('#parallax');
        if ($parallax.length > 0) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        }
    }
    parallaxMouse();

    // service active
    var $singleServices = $('.s-single-services');
    if ($singleServices.length > 0) {
        $singleServices.on('mouseenter', function () {
            $(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active');
        });
    }
    var $sLink = $('.s-link');
    if ($sLink.length > 0) {
        $sLink.on('mouseenter', function () {
            $(this).addClass('active').parent().siblings().find('.s-link').removeClass('active');
        });
    }

    // scrollToTop
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollName: 'scrollUp',
            topDistance: '300',
            topSpeed: 300,
            animation: 'fade',
            animationInSpeed: 200,
            animationOutSpeed: 200,
            scrollText: '<i class="fas fa-level-up-alt"></i>',
            activeOverlay: false,
        });
    }

    // isotop
    var $gridWrapper = $('.grid');
    if ($gridWrapper.length > 0) {
        $gridWrapper.imagesLoaded(function () {
            var $grid = $gridWrapper.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: 1
                }
            });
            $('.button-group').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                if (filterValue) {
                    $grid.isotope({
                        filter: filterValue
                    });
                }
            });
        });
    }

    // typed js
    var $elementTyped = $(".element");
    if ($elementTyped.length > 0) {
        $elementTyped.each(function () {
            var a = $(this);
            var dataElements = a.attr("data-elements");
            if (dataElements) {
                a.typed({
                    strings: dataElements.split(","),
                    typeSpeed: 100,
                    backDelay: 3000
                });
            }
        });
    }

    //for menu active class
    var $buttonGroupBtns = $('.button-group > button');
    if ($buttonGroupBtns.length > 0) {
        $buttonGroupBtns.on('click', function (event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
    }

    //Tabs Box
    var $tabsBox = $('.tabs-box');
    if ($tabsBox.length > 0) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
                $(target).fadeIn(300);
                $(target).addClass('active-tab animated fadeIn');
            }
        });
    }

    /*
    -----------------------------------------------------
    Gsap (ThemeForest Fix: Checking if GSAP exists first to prevent fatal errors)
    ----------------------------------------------------- 
    */
    if (typeof gsap !== 'undefined') {

        if (typeof ScrollTrigger !== 'undefined' && typeof SplitText !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, SplitText);
        }

        const fadeItems = document.querySelectorAll(".fade");
        if (fadeItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
            fadeItems.forEach((fadeItem) => {
                let startPosition = "top 90%",
                    tweenOptions = {
                        duration: 1.5,
                        delay: 0.5,
                        opacity: 1,
                    };

                let timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: fadeItem,
                        start: startPosition,
                        markers: false,
                    },
                });
                timeline.to(fadeItem, tweenOptions);
            });
        }

        const fadeSlideItems = document.querySelectorAll(".fade-slide");
        if (fadeSlideItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
            fadeSlideItems.forEach((fadeSlideItem) => {
                let slideAmount = 80,
                    startPosition = "top 90%",
                    tweenOptions = {
                        duration: 1.3,
                        delay: 0.5,
                        opacity: 0,
                        ease: "power2.out",
                    };

                if (fadeSlideItem.hasAttribute("data-slide-amount")) {
                    slideAmount = fadeSlideItem.getAttribute("data-slide-amount");
                }
                if (fadeSlideItem.hasAttribute("data-opacity")) {
                    tweenOptions.opacity = fadeSlideItem.getAttribute("data-opacity");
                }
                if (fadeSlideItem.hasAttribute("data-ease")) {
                    tweenOptions.ease = fadeSlideItem.getAttribute("data-ease");
                }
                if (fadeSlideItem.hasAttribute("data-duration")) {
                    tweenOptions.duration = fadeSlideItem.getAttribute("data-duration");
                }
                if (fadeSlideItem.hasAttribute("data-delay")) {
                    tweenOptions.delay = fadeSlideItem.getAttribute("data-delay");
                }
                if (fadeSlideItem.classList.contains("right")) {
                    tweenOptions.x = slideAmount;
                }
                if (fadeSlideItem.classList.contains("left")) {
                    tweenOptions.x = -slideAmount;
                }
                if (fadeSlideItem.classList.contains("top")) {
                    tweenOptions.y = -slideAmount;
                }
                if (fadeSlideItem.classList.contains("bottom")) {
                    tweenOptions.y = slideAmount;
                }

                let timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: fadeSlideItem,
                        start: startPosition,
                        markers: false,
                    },
                });
                timeline.from(fadeSlideItem, tweenOptions);
            });
        }

        const splitChars = document.querySelectorAll(".split_chars");
        if (splitChars.length > 0 && typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            splitChars.forEach((item) => {
                let isScrollAble = true,
                    tweenOptions = {
                        duration: 1.3,
                        delay: 0.5,
                        autoAlpha: 0,
                        stagger: 0.15,
                        ease: "power2.out",
                    },
                    scrollTrigger = {
                        trigger: item,
                        start: "top 90%",
                        markers: false,
                    };

                if (item.hasAttribute("data-duration")) {
                    tweenOptions.duration = item.getAttribute("data-duration");
                }
                if (item.hasAttribute("data-delay")) {
                    tweenOptions.delay = item.getAttribute("data-delay");
                }
                if (item.hasAttribute("data-ease")) {
                    tweenOptions.ease = item.getAttribute("data-ease");
                }
                if (item.hasAttribute("data-stagger")) {
                    tweenOptions.stagger = item.getAttribute("data-stagger");
                }
                if (item.hasAttribute("data-translateX")) {
                    tweenOptions.x = item.getAttribute("data-translateX");
                }
                if (item.hasAttribute("data-translateY")) {
                    tweenOptions.y = item.getAttribute("data-translateY");
                }

                if (!item.hasAttribute("data-translateX") && !item.hasAttribute("data-translateY")) {
                    tweenOptions.x = 100;
                }

                if (item.hasAttribute("data-scroll-trigger")) {
                    isScrollAble = item.getAttribute("data-scroll-trigger") === "true";
                }
                if (item.hasAttribute("data-trigger-start")) {
                    scrollTrigger.start = item.getAttribute("data-trigger-start");
                }

                if (isScrollAble) {
                    tweenOptions.scrollTrigger = scrollTrigger;
                }

                let splittedText = new SplitText(item, {
                    type: "chars, words"
                });
                gsap.from(splittedText.chars, tweenOptions);
            });
        }

        const moveLine3DItems = document.querySelectorAll(".move-line-3d");
        if (moveLine3DItems.length > 0 && typeof SplitText !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            moveLine3DItems.forEach((item) => {
                let startPosition = "top 90%",
                    tweenOptions = {
                        duration: 1,
                        delay: 0.3,
                        opacity: 0,
                        rotationX: -80,
                        force3D: true,
                        transformOrigin: "top center -50",
                        stagger: 0.1,
                    };

                if (item.hasAttribute("data-start")) {
                    startPosition = item.getAttribute("data-start");
                }
                if (item.hasAttribute("data-duration")) {
                    tweenOptions.duration = item.getAttribute("data-duration");
                }
                if (item.hasAttribute("data-delay")) {
                    tweenOptions.delay = item.getAttribute("data-delay");
                }
                if (item.hasAttribute("data-opacity")) {
                    tweenOptions.opacity = item.getAttribute("data-opacity");
                }
                if (item.hasAttribute("data-stagger")) {
                    tweenOptions.stagger = item.getAttribute("data-stagger");
                }
                if (item.hasAttribute("data-rotate")) {
                    tweenOptions.rotationX = item.getAttribute("data-rotate");
                }
                if (item.hasAttribute("data-origin")) {
                    tweenOptions.transformOrigin = item.getAttribute("data-origin");
                }

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: startPosition,
                        duration: tweenOptions.duration,
                        scrub: false,
                        markers: false,
                    },
                });

                const splitedText = new SplitText(item, {
                    type: "lines"
                }).split({
                    type: "lines"
                });
                gsap.set(item, {
                    perspective: 400
                });
                timeline.from(splitedText.lines, tweenOptions);
            });
        }
    }

})(jQuery);
