import { isValidCSS, getColorsCSS, getSpaceCSS, getBorderCSS, getMultiShadowCSS } from '../../../../../bpl-tools/utils/getCSS';

const ReadMore = ({ attributes, postReadMoreSl }) => {
	const { readMoreAlign, readMoreColors, readMoreHovColors, readMorePadding, readMoreBorder, readMore = {} } = attributes;
	const { styles = {} } = readMore || {};

	const { shadow = [], hoverBorder = { radius: '3px' }, hoverShadow = [], hoverAnimation = 'none' } = styles || {};

	return `
		${postReadMoreSl}{
			${isValidCSS('text-align', readMoreAlign)}
		}
		${postReadMoreSl} a{
			${getColorsCSS(readMoreColors)}
			${isValidCSS('padding', getSpaceCSS(readMorePadding))}
			${getBorderCSS(readMoreBorder)}
			${isValidCSS('box-shadow', getMultiShadowCSS(shadow))}
		}
		${postReadMoreSl} a:hover{
			${getColorsCSS(readMoreHovColors)}
			${getBorderCSS(hoverBorder)}
			${isValidCSS('box-shadow', getMultiShadowCSS(hoverShadow))}
			${'zoom-in' === hoverAnimation ? 'transform: scale(1.05);' : ''}
			${'zoom-out' === hoverAnimation ? 'transform: scale(0.95);' : ''}
		}
	`;
}
export default ReadMore;
