import { render } from '@wordpress/element';
const $ = jQuery;
import 'swiper/css/bundle'; // Swiper CSS

import { GeneralStyle } from './Style';
import './style.scss';

// Advanced Posts
document.addEventListener('DOMContentLoaded', () => {
	const allApbPosts = document.querySelectorAll('.wp-block-ap-block-posts');
	allApbPosts.forEach(apbPosts => {
		const attributes = JSON.parse(apbPosts.dataset.attributes);
		const { layout, columns, columnGap, rowGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPageClickable, sliderIsPageDynamic } = attributes;


		// Style
		const apbStyle = document.querySelector(`#${apbPosts.id} .apbStyle`);

		render(<GeneralStyle attributes={attributes} clientId={attributes.cId} />, apbStyle);


		// Slider
		const sliderEl = document.querySelector(`#${apbPosts.id} .apbSliderPosts`);
		if (sliderEl) {
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


		// Ticker
		const tickerEl = document.querySelector(`#${apbPosts.id} .apbTickerPosts`);
		if (tickerEl) {
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

		apbPosts?.removeAttribute('data-attributes');
	});
});

// Custom Scripts
// ; (function ($) {
// 	$(document).ready(function () {
// 		const scrollbarWidth = window.innerWidth - document.body.clientWidth;

// 		$('.alignfull').css({
// 			'width': `calc(100vw - ${scrollbarWidth}px)`,
// 			'max-width': `calc(100vw - ${scrollbarWidth}px)`,
// 			'margin': `0 calc(-50vw + 50% + ${scrollbarWidth / 2}px)`
// 		});
// 	});
// })(jQuery);