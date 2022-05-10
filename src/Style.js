import { mediaUrl } from './Const/functions';

const GeneralStyle = ({ attributes, clientId }) => {
	const { layout, columnGap, rowGap, isContentEqualHight, sliderHeight, contentAlign, contentBG, contentPadding, border, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderPrevNextColor, isTitleLink, titleTypo, titleColor, titleMargin, metaTypo, metaTextColor, metaLinkColor, metaIconColor, metaColorsOnImage, metaMargin, excerptAlign, excerptTypo, excerptColor, excerptMargin, readMoreAlign, readMoreTypo, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder } = attributes;

	return <style dangerouslySetInnerHTML={{
		__html: `
		@import url(${titleTypo?.googleFontLink || 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'});
		${metaTypo?.googleFontLink ? `@import url(${metaTypo?.googleFontLink});` : ''}
		${excerptTypo?.googleFontLink ? `@import url(${excerptTypo?.googleFontLink});` : ''}
		${readMoreTypo?.googleFontLink ? `@import url(${readMoreTypo?.googleFontLink});` : ''}
		
		#apbAdvancedPosts-${clientId} .apbPost{
			margin-bottom: ${'masonry' === layout ? `${rowGap}px` : '0px'};
			${border?.styles || 'border: 1px solid #4527a400; border-radius: 5px;'}
		}
		#apbAdvancedPosts-${clientId} .apbPostDefault, #apbAdvancedPosts-${clientId} .apbPostSideImage{
			text-align: ${contentAlign};
			${contentBG?.styles || 'background-color: #f4f2fc;'}
		}

		#apbAdvancedPosts-${clientId} .apbPost .apbPostText{ padding: ${contentPadding?.styles || '20px 25px'}; }
		#apbAdvancedPosts-${clientId} .apbPostOverlay .apbPostText{
			${contentBG?.styles || 'background-color: #f4f2fc;'}
			align-items: ${'left' === contentAlign ? 'flex-start' : 'right' === contentAlign ? 'flex-end' : 'center' === contentAlign ? 'center' : ''}
		}

		#apbAdvancedPosts-${clientId} .apbPost .apbPostTitle{
			text-align: ${contentAlign};
			${!isTitleLink ? titleTypo?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;' : ''}
			color: ${titleColor};
			margin: ${titleMargin?.styles || '0 0 15px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostTitle a{
			${titleTypo?.styles || 'font-family: Roboto, sans-serif; font-size: 25px;'}
			color: ${titleColor};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta{
			text-align: ${contentAlign};
			${metaTypo?.styles || 'font-size: 13px; text-transform: uppercase;'}
			color: ${metaTextColor};
			margin: ${metaMargin?.styles || '0 0 15px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta a{ color: ${metaLinkColor}; }
		#apbAdvancedPosts-${clientId} .apbPost .apbPostMeta .dashicons{ color: ${metaIconColor}; }
		#apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats{ ${metaTypo?.styles || 'font-size: 13px; text-transform: uppercase;'} }
		#apbAdvancedPosts-${clientId} .apbPost .apbPostFImgCats a{ ${metaColorsOnImage?.styles || 'color: #fff; background: #4527a4;'} }
		#apbAdvancedPosts-${clientId} .apbPost .apbPostExcerpt{
			text-align: ${excerptAlign};
			${excerptTypo?.styles || 'font-size: 15px;'}
			color: ${excerptColor};
			margin: ${excerptMargin?.styles || '0 0 10px 0'};
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore{ text-align: ${readMoreAlign}; }
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a{
			${readMoreTypo?.styles || 'font-size: 14px; text-transform: uppercase; font-weight: 600;'}
			${readMoreColors?.styles || 'color: #fff; background: #8344c5;'}
			padding: ${readMorePadding?.styles || '12px 35px'};
			${readMoreBorder?.styles || 'border-radius: 3px;'}
		}
		#apbAdvancedPosts-${clientId} .apbPost .apbPostReadMore a:hover{ ${readMoreHovColors?.styles || 'color: #fff; background: #4527a4;'} }

		#apbAdvancedPosts-${clientId} .apbGridPosts{
			grid-gap: ${rowGap}px ${columnGap}px;
			align-items: ${false === isContentEqualHight ? 'start' : 'initial'};
		}
		#apbAdvancedPosts-${clientId} .apbMasonryPosts{ gap: ${columnGap}px; }
		#apbAdvancedPosts-${clientId} .apbSliderPosts, #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-slide{ min-height: ${sliderHeight}; }
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-pagination .swiper-pagination-bullet{
			background: ${sliderPageColor};
			width: ${sliderPageWidth};
			height: ${sliderPageHeight};
			${sliderPageBorder?.styles || 'border-radius: 50%;'}
		}
		#apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-prev, #apbAdvancedPosts-${clientId} .apbSliderPosts .swiper-button-next{ color: ${sliderPrevNextColor}; }
		`.replace(/\s+/g, ' ')
	}} />
}

const FImgStyle = ({ posts, attributes, clientId }) => {
	const { isFImg } = attributes;

	return <style>
		{posts.map(post => {
			const { id, featured_media } = post;
			const fImgUrl = mediaUrl(featured_media);

			const sideImgCSS = `#apbAdvancedPosts-${clientId} .apbPostSideImage.apbPost-${id}{ display: ${fImgUrl ? 'grid' : 'flex'}; }`;
			const fImgCSS = isFImg && fImgUrl ? `#apbAdvancedPosts-${clientId} .apbPostOverlay.apbPost-${id}, #apbAdvancedPosts-${clientId} .apbPost .apbPostFImg-${id}{ background-image: url(${fImgUrl}); }` : '';

			return sideImgCSS + fImgCSS;
		})}
	</style>;
};
export { GeneralStyle, FImgStyle }