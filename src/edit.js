import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useState, useEffect, createContext, useRef } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

// Components
import Settings from './settings';
import Styles from './Styles';
import MapPosts from './Layout/MapPosts';

const $ = jQuery;

export const ExcerptLengthCtx = createContext();

const Edit = props => {
	const { attributes, setAttributes, className, clientId, getPostTypes, posts, categories, isEditorSidebarOpened } = props;

	const { align, layout, columns, columnGap, rowGap, sliderIsLoop, sliderIsTouchMove, sliderIsAutoplay, sliderSpeed, sliderEffect, sliderIsPage, sliderIsPageClickable, sliderIsPageDynamic, sliderIsPrevNext } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId }); }, [clientId]); // Set & Update clientId to cId
	const sliderRef = useRef(null);
	const sliderWrapperRef = useRef(null);
	const tickerRef = useRef(null);
	const tickerWrapperRef = useRef(null);

	// Components
	const Loading = () => <h3 className='apbLoading'><Spinner /> {__('Loading...', 'advanced-post-block')}</h3>;
	const NoPosts = () => <h3 className='apbNoPosts'>{__('No posts found!! Please add some posts', 'advanced-post-block')}</h3>;

	const currentBlock = document.querySelector(`#block-${clientId} .wp-block`);
	useEffect(() => {
		// Slider Posts
		if ('slider' === layout && sliderWrapperRef.current) {
			const currentSlider = document.querySelector(`#apbAdvancedPosts-${clientId} .apbSliderWrapper .apbSliderPosts`);

			const currentAll = currentSlider && currentBlock;

			currentAll ? currentBlock.style.display = 'block' : 'initial';
			align === 'full' && currentAll ? currentBlock.style.maxWidth = 'none' : '';
			align === 'wide' && currentAll ? currentBlock.style.maxWidth = 'none' : '';
			align === 'center' && currentAll ? currentBlock.style.maxWidth = '' : '';

			currentAll && isEditorSidebarOpened ? currentBlock.style.display = 'grid' : '';

			currentAll ? currentSlider.style.width = `${currentBlock.clientWidth}px` : '';

			// Re init slider
			sliderWrapperRef.current.innerHTML = '';
			sliderWrapperRef.current.innerHTML = sliderRef.current.outerHTML;

			new Swiper(`#apbAdvancedPosts-${clientId} .apbSliderWrapper .apbSliderPosts`, {
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

		let seen = {};
		$(`#apbAdvancedPosts-${clientId} .swiper-notification`).each(function () {
			let txt = $(this).attr('class');
			if (seen[txt])
				$(this).remove();
			else
				seen[txt] = true;
		});

		// Slider Height
		const slideHeightArray = [];
		const swiperSlide = document.querySelectorAll(`#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide`);
		const swiperSlideText = document.querySelectorAll(`#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide .apbPostText`);
		swiperSlideText?.length && swiperSlideText.forEach(slideText => {
			slideHeightArray.push(slideText?.clientHeight);
		});
		swiperSlide?.length && swiperSlide.forEach(slide => {
			slide.style.height = `${Math.max(...slideHeightArray)}px`;
		});

		// Ticker Posts
		if ('ticker' === layout && tickerWrapperRef.current) {
			// Re init ticker
			tickerWrapperRef.current.innerHTML = '';
			tickerWrapperRef.current.innerHTML = tickerRef.current.outerHTML;

			$(`#apbAdvancedPosts-${clientId} .apbTickerWrapper .apbTickerPosts`).easyTicker({
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
	}, [attributes, posts]);

	// Set excerpt length
	const [maxExcerptLength, setMaxExcerptLength] = useState(50);
	useEffect(() => {
		const allMaxExcerptLength = [];
		posts?.length && posts.map(post => {
			allMaxExcerptLength.push(post?.excerpt?.rendered.replace(/(<p class='?"?read-more'?"?(.*?)<\/p>)/g, '').trim().split(' ').length);

			setMaxExcerptLength(Math.max(...allMaxExcerptLength));
		});
	}, [posts]);

	return <>
		<ExcerptLengthCtx.Provider value={maxExcerptLength}>
			<Settings attributes={attributes} setAttributes={setAttributes} posts={posts} getPostTypes={getPostTypes} categories={categories} />
		</ExcerptLengthCtx.Provider>

		{!posts ? <Loading /> : posts?.length ? <div className={`${className} apbAdvancedPosts`} id={`apbAdvancedPosts-${clientId}`}>
			<Styles posts={posts} attributes={attributes} clientId={clientId} />

			{'grid' === layout ? <div className={`apbGridPosts columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
				<MapPosts posts={posts} attributes={attributes} clientId={clientId} />
			</div> /* Grid Layout */ :

				'masonry' === layout ? <div className={`apbMasonryPosts cols-${columns.desktop} cols-tablet-${columns.tablet} cols-mobile-${columns.mobile}`}>
					<MapPosts posts={posts} attributes={attributes} clientId={clientId} />
				</div> /* Masonry Layout */ :

					'slider' === layout ? <>
						<div className='apbSliderWrapper' ref={sliderWrapperRef}></div>
						<div className='apbSliderPosts' ref={sliderRef}>
							<div className='swiper-wrapper'>
								<MapPosts posts={posts} attributes={attributes} clientId={clientId} />
							</div>

							{sliderIsPage && <div className='swiper-pagination'></div>}

							{sliderIsPrevNext && <>
								<div className='swiper-button-prev'></div><div className='swiper-button-next'></div>
							</>}
						</div>
					</>/* Slider Layout */ :
						'ticker' === layout && <>
							<div className='apbTickerWrapper' ref={tickerWrapperRef}></div>
							<div className='apbTickerPosts' ref={tickerRef}>
								<div>
									<MapPosts posts={posts} attributes={attributes} clientId={clientId} />
								</div>
							</div>
						</>/* Ticker Layout */
			}
		</div> : <NoPosts />}
	</>
}
export default withSelect((select, props) => {
	const { postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder } = props.attributes;

	const catsFilter = 'post' === postType ? { categories: selectedCategories } : {};

	const query = {
		...catsFilter,
		per_page: isPostsPerPageAll ? -1 : postsPerPage, // -1 to display all
		orderby: postsOrderBy,
		order: postsOrder,
	}

	return {
		getPostTypes: select('core').getPostTypes({ per_page: -1 })?.filter(p => 'page' !== p.slug && 'attachment' !== p.slug && 'wp_block' !== p.slug && 'wp_template' !== p.slug && 'wp_navigation' !== p.slug && 'wp_template_part' !== p.slug && 'nav_menu_item' !== p.slug)?.map(p => ({ label: p.name, value: p.slug })),
		posts: select('core').getEntityRecords('postType', postType, query),
		categories: select('core').getEntityRecords('taxonomy', 'category', { per_page: -1 }),
		media: id => select('core').getMedia(id),
		authors: select('core').getAuthors(),
		isEditorSidebarOpened: select('core/edit-post').isEditorSidebarOpened()
	};
})(Edit);