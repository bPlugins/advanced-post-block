import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSpaceCSS, getTypoCSS } from '../../Components/Helper/getCSS';

import { mediaUrl } from './utils/functions';

const GeneralStyle = ({ attributes, clientId }) => {
	const { layout, columnGap, rowGap, isContentEqualHight, sliderHeight, contentAlign, contentBG, contentPadding, border, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderPrevNextColor, isTitleLink, titleTypo, titleColor, titleMargin, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, excerptAlign, excerptTypo, excerptColor, excerptMargin, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS(titleTypo)?.googleFontLink ? `@import url(${getTypoCSS(titleTypo)?.googleFontLink});` : ''}
		${getTypoCSS(metaTypo)?.googleFontLink ? `@import url(${getTypoCSS(metaTypo)?.googleFontLink});` : ''}
		${getTypoCSS(excerptTypo)?.googleFontLink ? `@import url(${getTypoCSS(excerptTypo)?.googleFontLink});` : ''}
		${getTypoCSS(readMoreTypo)?.googleFontLink ? `@import url(${getTypoCSS(readMoreTypo)?.googleFontLink});` : ''}
		
		#apbAdvancedPosts-${clientId} .apbPost{
			margin-bottom: ${'masonry' === layout ? `${rowGap}px` : '0px'};
			${getBorderCSS(border) || 'border: 1px solid #4527a400; border-radius: 5px;'}
		}
		#apbAdvancedPosts-${clientId} .apbPostDefault,
		#apbAdvancedPosts-${clientId} .apbPostSideImage{
			text-align: ${contentAlign};
			${getBackgroundCSS(contentBG) || 'background-color: #f4f2fc;'}
		}

		#apbAdvancedPosts-${clientId} .apbPost .apbPostText{
			padding: ${getSpaceCSS(contentPadding) || '20px 25px'};
		}
		#apbAdvancedPosts-${clientId} .apbPostOverlay .apbPostText{
			${getBackgroundCSS(contentBG) || 'background-color: #f4f2fc;'}
			align-items: ${'left' === contentAlign ? 'flex-start' : 'right' === contentAlign ? 'flex-end' : 'center' === contentAlign ? 'center' : ''}
		}

		#apbAdvancedPosts-${clientId} .apbPost .apbPostTitle{
			text-align: ${contentAlign};
			${!isTitleLink ? getTypoCSS(titleTypo)?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;' : ''}
			color: ${titleColor};
			margin: ${getSpaceCSS(titleMargin) || '0 0 15px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostTitle a{
			${getTypoCSS(titleTypo)?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;'}
			color: ${titleColor};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta{
			text-align: ${contentAlign};
			${getTypoCSS(metaTypo)?.styles || 'font-size: 13px; text-transform: uppercase;'}
			color: ${metaTextColor};
			margin: ${getSpaceCSS(metaMargin) || '0 0 15px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta a{
			color: ${metaLinkColor};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta .dashicons{
			color: ${metaIconColor};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats{
			${getTypoCSS(metaTypo)?.styles || 'font-size: 13px; text-transform: uppercase;'}
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats a{
			${getColorsCSS(metaColorsOnImage) || 'color: #fff; background: #4527a4;'}
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostExcerpt{
			text-align: ${excerptAlign};
			${getTypoCSS(excerptTypo)?.styles || 'font-size: 15px;'}
			color: ${excerptColor};
			margin: ${getSpaceCSS(excerptMargin) || '0 0 10px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore{
			text-align: ${readMoreAlign};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a{
			${getTypoCSS(readMoreTypo)?.styles || 'font-size: 14px; text-transform: uppercase; font-weight: 600;'}
			${getColorsCSS(readMoreColors) || 'color: #fff; background: #8344c5;'}
			padding: ${getSpaceCSS(readMorePadding) || '12px 35px'};
			${getBorderCSS(readMoreBorder) || 'border-radius: 3px;'}
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a:hover{
			${getColorsCSS(readMoreHovColors) || 'color: #fff; background: #4527a4;'}
		}

		#apbAdvancedPosts-${clientId} .apbGridPosts{
			grid-gap: ${rowGap}px ${columnGap}px;
			align-items: ${false === isContentEqualHight ? 'start' : 'initial'};
		}
		#apbAdvancedPosts-${clientId} .apbMasonryPosts{
			gap: ${columnGap}px;
		}

		#apbAdvancedPosts-${clientId} .apbSliderPosts,
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide{
			min-height: ${sliderHeight};
		}
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-pagination .swiper-pagination-bullet{
			background: ${sliderPageColor};
			width: ${sliderPageWidth};
			height: ${sliderPageHeight};
			${getBorderCSS(sliderPageBorder) || 'border-radius: 50%;'}
		}
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-prev,
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-next{
			color: ${sliderPrevNextColor};
		}
		`.replace(/\s+/g, ' ')
	}} />
}

const FImgStyle = ({ posts, attributes, clientId }) => {
	const { isFImg } = attributes;

	return <style>
		{posts.map(post => {
			const { id, featured_media } = post;
			const fImgUrl = mediaUrl(featured_media)?.replace(/<[^>]+>/g, '');

			const sideImgCSS = `#apbAdvancedPosts-${clientId} .apbPostSideImage.apbPost-${id}{ display: ${isFImg && fImgUrl ? 'grid' : 'flex'}; }`;
			const fImgCSS = isFImg && fImgUrl ? `#apbAdvancedPosts-${clientId} .apbPostOverlay.apbPost-${id}, #apbAdvancedPosts-${clientId} .apbPost .apbPostFImg-${id}{ background-image: url(${fImgUrl}); }` : '';

			return sideImgCSS + fImgCSS;
		})}
	</style>;
};
export { GeneralStyle, FImgStyle }