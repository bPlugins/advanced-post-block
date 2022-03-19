const $ = jQuery;
import 'swiper/css/bundle'; // Swiper CSS

import './style.scss';

// Advanced Posts
document.addEventListener('DOMContentLoaded', () => {
	const allApbPosts = document.querySelectorAll('.wp-block-ap-block-posts');
	allApbPosts.forEach(apbPosts => {
		// Slider
		const sliderEl = document.querySelector(`#${apbPosts.id} .apbSliderPosts`);
		if (sliderEl) {
			const { layout, columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPageClickable, sliderIsPageDynamic } = JSON.parse(sliderEl.dataset.slider);

			'slider' === layout && new Swiper(sliderEl, {
				// Optional parameters
				direction: 'horizontal',
				slidesPerView: columns?.mobile,
				breakpoints: {
					// when window width is >= 576px
					576: { slidesPerView: columns?.tablet },
					// when window width is >= 768px
					768: { slidesPerView: columns?.desktop },
				},
				spaceBetween: columnGap,
				loop: sliderIsLoop,
				allowTouchMove: sliderIsTouchMove,
				grabCursor: sliderIsTouchMove,
				autoplay: sliderIsAutoplay ? { delay: sliderSpeed * 1000 } : false,
				speed: sliderSpeed * 1000,
				effect: sliderEffect,
				fadeEffect: { crossFade: true },
				creativeEffect: {
					prev: {
						shadow: true,
						translate: ['-120%', 0, -500],
					},
					next: {
						shadow: true,
						translate: ['120%', 0, -500],
					}
				},
				allowSlideNext: true,
				allowSlidePrev: true,
				autoHeight: false,
				notificationClass: null,

				// Controllers
				pagination: {
					el: '.swiper-pagination',
					clickable: sliderIsPageClickable,
					dynamicBullets: sliderIsPageDynamic
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}
			});
		}

		const slideHeightArray = [];
		const swiperSlide = document.querySelectorAll(`#${apbPosts.id} .apbSliderPosts .swiper-slide`);
		const swiperSlideText = document.querySelectorAll(`#${apbPosts.id} .apbSliderPosts .swiper-slide .apbPostText`);
		swiperSlideText?.length && swiperSlideText.forEach(slideText => {
			slideHeightArray.push(slideText?.clientHeight);
		});
		swiperSlide?.length && swiperSlide.forEach(slide => {
			slide.style.height = `${Math.max(...slideHeightArray)}px`;
		});

		// Remove data slider attributes
		sliderEl?.removeAttribute('data-slider');

		// Ticker
		const tickerEl = document.querySelector(`#${apbPosts.id} .apbTickerPosts`);
		if (tickerEl) {
			const { rowGap } = JSON.parse(tickerEl.dataset.ticker);

			$(tickerEl).easyTicker({
				direction: 'up',
				easing: 'swing',
				speed: 'slow',
				interval: 2000,
				height: 'auto',
				visible: 3,
				gap: rowGap,
				mousePause: true
			});
		}

		// Remove data ticker attributes
		tickerEl?.removeAttribute('data-ticker');
	});
});

// Custom Scripts
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