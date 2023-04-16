import { render } from 'react-dom';
const $ = jQuery;
import 'swiper/css/bundle'; // Swiper CSS

import './style.scss';
import Style from './Style';
import { setSliderHeight, sliderConfig, tickerConfig } from './utils/configs';

// Advanced Posts
document.addEventListener('DOMContentLoaded', () => {
	const allApbPosts = document.querySelectorAll('.wp-block-ap-block-posts');
	allApbPosts.forEach(apbPosts => {
		const attributes = JSON.parse(apbPosts.dataset.attributes);
		const { layout } = attributes;


		// Style
		const styleEl = document.querySelector(`#${apbPosts.id} .apbStyle`);
		render(<Style attributes={attributes} clientId={attributes.cId} />, styleEl);


		// Slider
		if ('slider' === layout) {
			const sliderEl = document.querySelector(`#${apbPosts.id} .apbSliderPosts`);

			if (sliderEl) {
				new Swiper(sliderEl, sliderConfig(attributes));

				// Slider Height
				setSliderHeight(apbPosts.id);
			}
		}


		// Ticker
		if ('ticker' === layout) {
			const tickerEl = document.querySelector(`#${apbPosts.id} .apbTickerPosts`);

			tickerEl && $(tickerEl).easyTicker(tickerConfig(attributes));
		}


		// Remove attributes data
		apbPosts?.removeAttribute('data-attributes');
	});
});