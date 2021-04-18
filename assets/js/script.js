// ; (function ($) {
//     $(document).ready(function () {
//         const scrollbarWidth = window.innerWidth - document.body.clientWidth;

//         $('.alignfull').css({
//             'width': `calc(100vw - ${scrollbarWidth}px)`,
//             'max-width': `calc(100vw - ${scrollbarWidth}px)`,
//             'margin': `0 calc(-50vw + 50% + ${scrollbarWidth / 2}px)`
//         });
//     });
// })(jQuery);

let fImag = document.querySelectorAll('.bBlocksPostArticleDefault .bBlocksPostFImg');
fImag.length && fImag.forEach(im => {
    im ? im.style.minHeight = `${im.clientWidth * .6}px` : null;
});

// Slider Posts
Array.from(document.querySelectorAll('.bBlocksSliderPosts')).map(slider => {
    const { id, layout, columns, column_gap, slider_is_loop, slider_is_autoplay, slider_speed, slider_is_fade, slider_is_touch_move, slider_is_page_clickable, slider_is_page_dynamic } = slider.dataset;

    const cols = JSON.parse(columns);

    const swiper = 'slider' == layout && new Swiper(`#bBlocksSliderAdvancedPosts-${id}`, {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: cols.mobile,
        breakpoints: {
            // when window width is >= 576px
            576: {
                slidesPerView: cols.tablet,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: cols.desktop,
            },
        },
        spaceBetween: parseInt(column_gap),
        loop: slider_is_loop == true,
        autoplay: slider_is_autoplay == true,
        speed: parseInt(slider_speed),
        effect: columns == 1 && slider_is_fade == true ? 'fade' : '',
        fadeEffect: {
            crossFade: true
        },
        allowTouchMove: slider_is_touch_move == true,
        allowSlideNext: true,
        allowSlidePrev: true,
        autoHeight: false,
        notificationClass: null,

        // Controllers
        pagination: {
            el: '.swiper-pagination',
            clickable: slider_is_page_clickable == true,
            dynamicBullets: slider_is_page_dynamic == true,
        },
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        }
    });
});