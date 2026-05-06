import { useState, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import Title from '../Single/Title';
import { prefix } from '../../../utils/data';

const NewsTicker = ({ posts, attributes, id }) => {
	const [prevEl, setPrevEl] = useState(null);
	const [nextEl, setNextEl] = useState(null);

	const containerClass = `${prefix}NewsTicker theme1 type-vertical`;

	const prevClass = `${prefix}NewsTickerPrev-${id}`;
	const nextClass = `${prefix}NewsTickerNext-${id}`;

	// Memoize Swiper configurations to prevent re-initialization loops on multiple blocks
	const { modules, swiperEffect, effectConfig, autoplayConfig, navigationConfig } = useMemo(() => {
		const mods = [Autoplay, FreeMode, Navigation];
		let currentEffect = 'slide';
		let eConfig = {};

		return {
			modules: mods,
			swiperEffect: currentEffect,
			effectConfig: eConfig,
			autoplayConfig: {
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			navigationConfig: {
				prevEl,
				nextEl,
			}
		};
	}, [prevEl, nextEl]);

	return <div className={containerClass} id={id} style={{ '--nt-speed': `3000ms`, '--nt-direction': 'up' }}>
		<div className='newsTickerLabel'>
			<span>{__('Trending Now', 'advanced-post-block')}</span>
		</div>

		<div className={`newsTickerPostsWrapper pause-on-hover`}>
			<div style={{ position: 'relative', width: '100%' }}>
				<div style={{ visibility: 'hidden', pointerEvents: 'none', opacity: 0 }} aria-hidden="true">
					<article className='apbPost'>
						{posts.length > 0 && <Title post={posts[0]} attributes={attributes} />}
					</article>
				</div>
				<Swiper
					className='newsTickerPosts'
					style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
					direction='vertical'
					modules={modules}
					slidesPerView={1}
					loop={true}
					autoplay={autoplayConfig}
					navigation={navigationConfig}
					effect={swiperEffect}
					{...effectConfig}
					speed={400}
					allowTouchMove={false}
				>
					{posts.map((post) => <SwiperSlide className='article' key={post.id}>
						<article className='apbPost'>
							<Title post={post} attributes={attributes} />
						</article>
					</SwiperSlide>)}
				</Swiper>
			</div>
		</div>

		<div className={`newsTickerNav`}>
			<button ref={setPrevEl} className={`newsTickerNavBtn ${prevClass}`} aria-label='Previous'>
				<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
					<polyline points='18 15 12 9 6 15' />
				</svg>
			</button>
			<button ref={setNextEl} className={`newsTickerNavBtn ${nextClass}`} aria-label='Next'>
				<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
					<polyline points='6 9 12 15 18 9' />
				</svg>
			</button>
		</div>
	</div>;
}
export default NewsTicker;
