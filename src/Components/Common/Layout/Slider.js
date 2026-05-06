import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, EffectCreative, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SubLayout from '../SubLayout/SubLayout';
import { setSliderHeight } from '../../../utils/configs';
import { prefix } from '../../../utils/data';

const Slider = ({ posts, attributes, id }) => {
	const { columns, columnGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderAutoplayOptions = { delay: 1.5 }, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderIsPrevNext } = attributes;

	useEffect(() => {
		setSliderHeight(id);
	}, [posts?.length]);

	return <Swiper className={`${prefix}SliderPosts`}
		spaceBetween={columnGap}
		slidesPerView={columns.mobile}
		breakpoints={{ 641: { slidesPerView: columns.tablet }, 1025: { slidesPerView: columns.desktop } }}
		modules={[Autoplay, EffectFade, EffectCreative, Navigation, Pagination]}
		loop={sliderIsLoop}
		allowTouchMove={sliderIsTouchMove}
		grabCursor={sliderIsTouchMove}
		autoplay={sliderIsAutoplay ? { delay: sliderAutoplayOptions?.delay * 1000 } : false}
		speed={sliderSpeed * 1000}
		effect={sliderEffect}
		fadeEffect={{ crossFade: true }}
		creativeEffect={{
			prev: {
				shadow: true,
				translate: ['-120%', 0, -500]
			},
			next: {
				shadow: true,
				translate: ['120%', 0, -500]
			}
		}}
		pagination={sliderIsPage ? {
			clickable: sliderIsPageClickable,
			dynamicBullets: sliderIsPageDynamic
		} : false}
		navigation={sliderIsPrevNext}

		allowSlideNext={true}
		allowSlidePrev={true}
		autoHeight={false} // Frontend
		notificationClass={null}
	>
		{posts.map(post => <SwiperSlide key={post.id}>
			<SubLayout {...{ post, attributes }} />
		</SwiperSlide>)}
	</Swiper>
}
export default Slider;