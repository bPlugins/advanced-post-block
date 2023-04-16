export const sliderConfig = (attributes) => {
	const { columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPageClickable, sliderIsPageDynamic } = attributes;

	return {
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
	const slideHeightArray = [];
	const swiperSlide = document.querySelectorAll(`#${id} .apbSliderPosts .swiper-slide`);
	const swiperSlideText = document.querySelectorAll(`#${id} .apbSliderPosts .swiper-slide .apbPostText`);
	swiperSlideText?.forEach(slideText => {
		slideHeightArray.push(slideText?.clientHeight);
	});
	swiperSlide?.length && swiperSlide.forEach(slide => {
		slide.style.height = `${Math.max(...slideHeightArray)}px`;
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
		visible: 3,
		gap: rowGap,
		mousePause: true
	}
}