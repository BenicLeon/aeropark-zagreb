(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


let isFirstLoad = true;

function changeLanguage(language) {
    var sections = document.querySelectorAll('.language-section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    var activeSection = document.getElementById(language);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    document.documentElement.lang = language;

    // Update href attributes for navigation links
    var navigationLinks = document.querySelectorAll('.nav-item.nav-link');
    for (let i = 0; i < 4; i++) {
        var link = navigationLinks[i];
        var targetId = link.getAttribute('href').substring(1);
        if (language !== 'hr') {
            if (isFirstLoad) {
                targetId = language + '-' + targetId;
            } else {
                targetId = targetId.replace(/^[a-z]{2,3}-/, language + '-');
            }
            link.innerText = getLinkText(targetId, language, i);
        } else {
            targetId = targetId.replace(/^([a-z]{2,3}-)?/, '');
            link.innerText = getLinkText(targetId, language, i);
        }
        link.setAttribute('href', '#' + targetId);
    }

    isFirstLoad = false;

    // Inicijalizacija karusela ako je jezik engleski
    if (language === 'en') {
        initializeCarousel();
    }
}

function initializeCarousel() {
    $('#carouselExampleControls').carousel();
}

function getLinkText(targetId, language, index) {
    switch (index) {
        case 0:
            return language === 'en' ? 'Homepage' : (language === 'sl' ? 'Domov' : 'Početna');
        case 1:
            return language === 'en' ? 'About' : (language === 'sl' ? 'O nas' : 'O nama');
        case 2:
            return language === 'en' ? 'Price List' : (language === 'sl' ? 'Cenik' : 'Cijenik');
        case 3:
            return language === 'en' ? 'Services' : (language === 'sl' ? 'Storitve' : 'Usluge');
        default:
            return '';
    }
}
var slideIndex = 0;

function showSlides() {
    var slides = document.querySelectorAll('#slideshow .carousel-item');
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Promjena slike svake 2 sekunde (prilagodite vrijeme prema potrebama)
}

// Pozivamo funkciju za pokretanje slideshowa
showSlides();

