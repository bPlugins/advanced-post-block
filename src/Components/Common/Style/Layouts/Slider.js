import { isValidCSS, getBorderCSS } from '../../../../../../bpl-tools/utils/getCSS';

const Slider = ({ attributes, sliderPostsSl }) => {
	const { sliderHeight, sliderPageColor, sliderPageWidth, sliderPageHeight, sliderPageBorder, sliderPrevNextColor } = attributes;

	return `
		${sliderPostsSl},
		${sliderPostsSl} .swiper-slide article{
			${isValidCSS('min-height', sliderHeight)}
		}
		${sliderPostsSl} .swiper-pagination .swiper-pagination-bullet{
			${isValidCSS('background', sliderPageColor)}
			${isValidCSS('width', sliderPageWidth)}
			${isValidCSS('height', sliderPageHeight)}
			${getBorderCSS(sliderPageBorder)}
		}
		${sliderPostsSl} .swiper-button-prev,
		${sliderPostsSl} .swiper-button-next{
			${isValidCSS('color', sliderPrevNextColor)}
		}
	`;
}
export default Slider;
