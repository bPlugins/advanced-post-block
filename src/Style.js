import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSpaceCSS, getTypoCSS } from '../../Components/Helper/getCSS';

const Style = ({ attributes, clientId }) => {
	const { layout, columnGap, rowGap, isContentEqualHight, sliderHeight, fImgFitting, contentAlign, contentBG, contentPadding, border, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderPrevNextColor, titleTypo, titleColor, titleMargin, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, excerptAlign, excerptTypo, excerptColor, excerptMargin, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	const mainSl = `#apbAdvancedPosts-${clientId}`;
	const postSl = `${mainSl} .apbPost`;
	const sliderPostsSl = `${mainSl} .apbSliderPosts`;
	const postReadMoreSl = `${postSl} .apbPostReadMore`;
	const postTitleSl = `${postSl} .apbPostTitle`;
	const postMetaSl = `${postSl} .apbPostMeta`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', titleTypo)?.googleFontLink}
		${getTypoCSS('', metaTypo)?.googleFontLink}
		${getTypoCSS('', excerptTypo)?.googleFontLink}
		${getTypoCSS('', readMoreTypo)?.googleFontLink}
		${getTypoCSS(`${postTitleSl}, ${postTitleSl} a`, titleTypo)?.styles}
		${getTypoCSS(`${postMetaSl}, ${postMetaSl} *, ${postSl} .apbPostFImgCats`, metaTypo)?.styles}
		${getTypoCSS(`${postSl} .apbPostExcerpt`, excerptTypo)?.styles}
		${getTypoCSS(`${postReadMoreSl} a`, readMoreTypo)?.styles}
		
		${postSl}{
			margin-bottom: ${'masonry' === layout ? `${rowGap}px` : '0px'};
			${getBorderCSS(border)}
		}
		${mainSl} .apbPostDefault,
		${mainSl} .apbPostSideImage{
			text-align: ${contentAlign};
			${getBackgroundCSS(contentBG)}
		}

		${postSl} .apbPostText{
			padding: ${getSpaceCSS(contentPadding)};
		}
		${mainSl} .apbPostOverlay .apbPostText{
			${getBackgroundCSS(contentBG)}
			align-items: ${'left' === contentAlign ? 'flex-start' : 'right' === contentAlign ? 'flex-end' : 'center' === contentAlign ? 'center' : ''}
		}

		${postTitleSl}{
			text-align: ${contentAlign};
			color: ${titleColor};
			margin: ${getSpaceCSS(titleMargin)};
		}
		${postTitleSl} a{
			color: ${titleColor};
		}
		${postMetaSl}{
			text-align: ${contentAlign};
			color: ${metaTextColor};
			margin: ${getSpaceCSS(metaMargin)};
		}
		${postMetaSl} a{
			color: ${metaLinkColor};
		}
		${postMetaSl} .dashicons{
			color: ${metaIconColor};
		}
		${postSl} .apbPostFImg{
			background-size: ${fImgFitting};
		}
		${postSl} .apbPostFImgCats a{
			${getColorsCSS(metaColorsOnImage)}
		}
		${postSl} .apbPostExcerpt{
			text-align: ${excerptAlign};
			color: ${excerptColor};
			margin: ${getSpaceCSS(excerptMargin)};
		}
		${postReadMoreSl}{
			text-align: ${readMoreAlign};
		}
		${postReadMoreSl} a{
			${getColorsCSS(readMoreColors)}
			padding: ${getSpaceCSS(readMorePadding)};
			${getBorderCSS(readMoreBorder)}
		}
		${postReadMoreSl} a:hover{
			${getColorsCSS(readMoreHovColors)}
		}

		${mainSl} .apbGridPosts{
			grid-gap: ${rowGap}px ${columnGap}px;
			align-items: ${false === isContentEqualHight ? 'start' : 'initial'};
		}
		${mainSl} .apbMasonryPosts{
			gap: ${columnGap}px;
		}

		${sliderPostsSl},
		${sliderPostsSl} .swiper-slide{
			min-height: ${sliderHeight};
		}
		${sliderPostsSl} .swiper-pagination .swiper-pagination-bullet{
			background: ${sliderPageColor};
			width: ${sliderPageWidth};
			height: ${sliderPageHeight};
			${getBorderCSS(sliderPageBorder)}
		}
		${sliderPostsSl} .swiper-button-prev,
		${sliderPostsSl} .swiper-button-next{
			color: ${sliderPrevNextColor};
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;

export const FImgStyle = ({ posts, attributes, clientId }) => {
	const { isFImg } = attributes;

	return <style>
		{posts.map(post => {
			const { id, thumbnail } = post;

			const sideImgCSS = `#apbAdvancedPosts-${clientId} .apbPostSideImage.apbPost-${id}{ display: ${isFImg && thumbnail ? 'grid' : 'flex'}; }`;
			const fImgCSS = isFImg && thumbnail ? `#apbAdvancedPosts-${clientId} .apbPostOverlay.apbPost-${id}, #apbAdvancedPosts-${clientId} .apbPost .apbPostFImg-${id}{ background-image: url(${thumbnail}); }` : '';

			return sideImgCSS + fImgCSS;
		})}
	</style>
}