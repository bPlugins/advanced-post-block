import { useState, useEffect } from 'react';

import CommonSlider from '../../Common/Layout/Slider';

const Slider = ({ posts, attributes, id }) => {
	const { columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderAutoplayOptions = { delay: 1.5 }, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderIsPrevNext } = attributes;

	const [rendered, setRendered] = useState(true);

	const SwiperEl = () => <CommonSlider posts={posts} attributes={attributes} id={id} />

	useEffect(() => {
		setRendered(!rendered);
	}, [columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderAutoplayOptions, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderIsPrevNext]);

	return <SwiperEl />
}
export default Slider;