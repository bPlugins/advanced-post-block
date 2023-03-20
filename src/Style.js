import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSpaceCSS, getTypoCSS } from '../../Components/Helper/getCSS';

import { mediaUrl } from './utils/functions';

const GeneralStyle = ({ attributes, clientId }) => {
	const { layout, columnGap, rowGap, isContentEqualHight, sliderHeight, contentAlign, contentBG, contentPadding, border, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderPrevNextColor, titleTypo, titleColor, titleMargin, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, excerptAlign, excerptTypo, excerptColor, excerptMargin, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	const mainSl = `#apbAdvancedPosts-${clientId}`;
	const postSl = `${mainSl} .apbPost`;
	const sliderPostsSl = `${mainSl} .apbSliderPosts`;
	const postReadMoreSl = `${postSl} .apbPostReadMore`;
	const postTitleSl = `${postSl} .apbPostTitle`;
	const postMetaSl = `${postSl} .apbPostMeta`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS(`${postTitleSl}, ${postTitleSl} a`, titleTypo)}
		${getTypoCSS(`${postMetaSl}, ${postMetaSl} *, ${postSl} .apbPostFImgCats`, metaTypo)}
		${getTypoCSS(`${postSl} .apbPostExcerpt`, excerptTypo)}
		${getTypoCSS(`${postReadMoreSl} a`, readMoreTypo)}
		
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