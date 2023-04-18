import { useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
const $ = jQuery;

import { tabController } from '../../Components/Helper/functions';

import Settings from './Settings';
import Style, { FImgStyle } from './Style';
import MapPosts from './Layout/MapPosts';
import { setSliderHeight, sliderConfig, tickerConfig } from './utils/configs';

const Edit = props => {
	const { attributes, setAttributes, className, clientId, isSelected, posts, isEditorSidebarOpened } = props;

	const { align, layout, columns, sliderIsPage, sliderIsPrevNext } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);

	const sliderRef = useRef(null);
	const sliderWrapperRef = useRef(null);
	const tickerRef = useRef(null);
	const tickerWrapperRef = useRef(null);

	// Components
	const Loading = () => <h3 className='apbLoading'><Spinner /> {__('Loading...', 'advanced-post-block')}</h3>;
	const NoPosts = () => <h3 className='apbNoPosts'>{__('No posts found!! Please add some posts', 'advanced-post-block')}</h3>;

	const currentBlock = document.querySelector(`#block-${clientId} .wp-block`);
	// Slider Posts
	useEffect(() => {
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

			new Swiper(`#apbAdvancedPosts-${clientId} .apbSliderWrapper .apbSliderPosts`, sliderConfig(attributes));

			// Slider Height
			setSliderHeight(`apbAdvancedPosts-${clientId}`);

			// Remove Duplicate
			let seen = {};
			$(`#apbAdvancedPosts-${clientId} .swiper-notification`).each(function () {
				let txt = $(this).attr('class');
				if (seen[txt])
					$(this).remove();
				else
					seen[txt] = true;
			});
		}
	}, [attributes, posts, isEditorSidebarOpened]);

	// Ticker
	useEffect(() => {
		if ('ticker' === layout && tickerWrapperRef.current) {
			// Re init ticker
			tickerWrapperRef.current.innerHTML = '';
			tickerWrapperRef.current.innerHTML = tickerRef.current.outerHTML;

			$(`#apbAdvancedPosts-${clientId} .apbTickerWrapper .apbTickerPosts`).easyTicker(tickerConfig(attributes));
		}
	}, [posts?.length, attributes, tickerWrapperRef]);

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} posts={posts} />

		{!posts ? <Loading /> : posts?.length ? <div className={`${className} apbAdvancedPosts`} id={`apbAdvancedPosts-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />
			<FImgStyle posts={posts} attributes={attributes} clientId={clientId} />

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
export default withSelect((select, { attributes }) => {
	const { getEntityRecords, getMedia } = select('core');

	const { postType, selectedCategories, isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, fImgSize } = attributes;

	const catsFilter = 'post' === postType ? { categories: selectedCategories } : {};

	const query = {
		...catsFilter,
		per_page: isPostsPerPageAll ? -1 : postsPerPage, // -1 to display all
		orderby: postsOrderBy,
		order: postsOrder,
	}

	// Arranged function
	// const mediaUrl = id => getMedia(id)?.source_url
	const imageBySize = (id, size) => getMedia(id)?.media_details?.sizes?.[size]?.source_url || getMedia(id)?.source_url;

	const arrangedPosts = (posts) => {
		return posts?.map(post => {
			const { id, link, slug: name, featured_media, title, excerpt, wbAuthor, content, wbDate, date_gmt, modified, modified_gmt, wbComment, comment_status, wbCategories, wbReadTime, status } = post;
			const thumbnail = imageBySize(featured_media, fImgSize)?.replace(/<[^>]+>/g, '')

			return {
				id,
				link,
				name,
				thumbnail,
				title: title?.rendered,
				excerpt: excerpt?.raw,
				content: content?.rendered?.replace(/(<([^>]+)>)/gi, ''),
				author: wbAuthor,
				date: wbDate,
				dateGMT: date_gmt,
				modifiedDate: modified,
				modifiedDateGMT: modified_gmt,
				commentCount: wbComment,
				commentStatus: comment_status,
				categories: wbCategories,
				readTime: wbReadTime,
				status
			};
		})
	}

	return {
		posts: arrangedPosts(getEntityRecords('postType', postType, query)),

		media: id => getMedia(id),

		isEditorSidebarOpened: !!select('core/edit-post')?.isEditorSidebarOpened()
	};
})(Edit);