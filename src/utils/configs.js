import { prefix } from './data';

export const masonryConfig = (container, attributes) => {
	const { columnGap, rowGap } = attributes;

	return {
		container,
		baseWidth: 400,
		gutterX: columnGap,
		gutterY: rowGap,
		minify: false,
		ultimateGutter: 5,
		surroundingGutter: false
	}
}

export const sliderConfig = (attributes) => {
	const { columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderAutoplayOptions = { delay: 1.5 }, sliderSpeed, sliderEffect, sliderIsPageClickable, sliderIsPageDynamic } = attributes;

	return {
		direction: 'horizontal',
		slidesPerView: columns?.mobile,
		breakpoints: {
			641: { slidesPerView: columns?.tablet },
			1025: { slidesPerView: columns?.desktop },
		},
		spaceBetween: columnGap,
		loop: sliderIsLoop,
		allowTouchMove: sliderIsTouchMove,
		grabCursor: sliderIsTouchMove,
		autoplay: sliderIsAutoplay ? { delay: sliderAutoplayOptions?.delay * 1000 } : false,
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
		autoHeight: false, // Frontend
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
	}
}

export const setSliderHeight = (id) => {
	const heightArray = [];
	const slideEls = document.querySelectorAll(`#${id} .swiper .swiper-slide`);
	const textEls = document.querySelectorAll(`#${id} .swiper .swiper-slide .${prefix}Text`);
	textEls?.forEach(textEl => {
		heightArray.push(textEl?.clientHeight);
	});
	slideEls?.length && slideEls.forEach(slideEl => {
		slideEl.querySelector('article').style.height = `${Math.max(...heightArray)}px`;
	});
}

export const tickerConfig = (attributes) => {
	const { rowGap } = attributes;

	return {
		direction: 'up',
		easing: 'swing',
		speed: 'slow',
		interval: 2000,
		height: 'auto',
		gap: rowGap,
		visible: 3,
		mousePause: true
	}
}