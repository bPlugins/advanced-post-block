import { __ } from '@wordpress/i18n';

import { prefix } from '../../utils/data';

const SkeletonArticle = () => <article className={`${prefix}Post`}>
	<span className={`${prefix}LoadingItem ${prefix}Thumb`}></span>

	<div className={`${prefix}Text`}>
		<div className={`${prefix}Title`}>
			<span className={`${prefix}LoadingItem`}></span>
			<span className={`${prefix}LoadingItem`}></span>
		</div>
		<div className={`${prefix}Meta`}>
			<span className={`${prefix}LoadingItem`}></span>
		</div>
		<div className={`${prefix}Excerpt`}>
			<span className={`${prefix}LoadingItem`}></span>
			<span className={`${prefix}LoadingItem`}></span>
			<span className={`${prefix}LoadingItem`}></span>
			<span className={`${prefix}LoadingItem`}></span>
		</div>
		<div className={`${prefix}ReadMore`}>
			<span className={`${prefix}LoadingItem`}></span>
		</div>
	</div>
</article>

const SkeletonAccordionItem = () => <div className={`${prefix}AccordionItem ${prefix}Post`}>
	<div className={`${prefix}AccordionHeader`}>
		<div className={`${prefix}AccordionTrigger`}>
			<span className={`${prefix}AccordionHeaderText`}>
				<span className={`${prefix}LoadingItem`} style={{ width: '55%', height: '18px' }}></span>
			</span>
			<span className={`${prefix}AccordionIndicator ${prefix}LoadingItem`} style={{ width: '18px', height: '18px' }}></span>
		</div>
	</div>
</div>

const LoadingSkeleton = ({ attributes }) => {
	const { layout, columns, isPostsPerPageAll, postsPerPage, sliderHeight, sliderIsPage, sliderIsPrevNext, accordion } = attributes;
	const { theme: accordionTheme = 'classic', maxWidth = { desktop: '' } } = accordion || {};

	const colD = columns?.desktop || 3;
	const colT = columns?.tablet || 2;
	const colM = columns?.mobile || 1;
	const gridClass = `${prefix}GridPosts columns-${colD} columns-tablet-${colT} columns-mobile-${colM}`;

	const numPosts = isPostsPerPageAll ? 6 : (Number(postsPerPage) || 6);

	const renderSkeletons = (count) => {
		return Array.from({ length: count }).map((_, index) => <SkeletonArticle key={index} />);
	};

	return <div className={`${prefix}LoadingPlaceholder`}>
		{layout === 'slider' ? <>
			<style>{`.${prefix}SliderSkeleton article { min-height: ${sliderHeight}; }`}</style>
			<div className={`${prefix}SliderSkeleton`}>
				<div className='swiper-wrapper'>
					{renderSkeletons(Math.max(1, colD))}
				</div>
				{sliderIsPage && <div className='swiper-pagination'></div>}
				{sliderIsPrevNext && <>
					<div className='swiper-button-prev'></div>
					<div className='swiper-button-next'></div>
				</>}
			</div>
		</> :
			layout === 'ticker' ?
				<div className={`${prefix}TickerPosts`}>{renderSkeletons(Math.max(1, 2))}</div> :
				layout === 'newsTicker' ?
					<div className={`${prefix}NewsTicker theme1 newsTickerSkeleton`}>
						<div className='newsTickerLabel'>
							<span>{__('Trending Now', 'advanced-post-block')}</span>
						</div>
						<div className='newsTickerPostsWrapper'>
							<span className={`${prefix}LoadingItem newsTickerSkeletonBar`}></span>
						</div>
					</div> :
					layout === 'accordion' ?
						<div className={`${prefix}AccordionPosts theme-${accordionTheme}`} style={maxWidth?.desktop ? { maxWidth: maxWidth.desktop } : undefined}>
							{Array.from({ length: Math.max(1, numPosts) }).map((_, index) => <SkeletonAccordionItem key={index} />)}
						</div> :
						<div className={gridClass}>{renderSkeletons(Math.max(1, numPosts))}</div>
		}
	</div>
};

export default LoadingSkeleton;
