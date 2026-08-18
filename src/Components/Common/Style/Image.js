import { isValidCSS, getBoxCSS, getMultiShadowCSS, getBorderBoxCSS } from '../../../../../bpl-tools/utils/getCSS';

const Image = ({ attributes, postSl, prefix }) => {
	const { fImgFitting = 'cover', image = {} } = attributes;
	const { width = '100%', height = '60%', styles = {} } = image || {};

	const { border = { width: '0px', style: 'none' }, radius = { top: '0px', right: '0px', bottom: '0px', left: '0px' }, hoverRadius = { top: '0px', right: '0px', bottom: '0px', left: '0px' }, shadow = [], hoverShadow = [], margin = { top: '', right: '', bottom: '', left: '' }, hoverAnimation = 'none' } = styles || {};

	return `
		${postSl} .${prefix}Thumb{
			${isValidCSS('width', width)}
			${isValidCSS('padding-bottom', height)}
			${getBorderBoxCSS(border)}
			${isValidCSS('border-radius', getBoxCSS(radius))}
			${isValidCSS('box-shadow', getMultiShadowCSS(shadow))}
			${isValidCSS('margin', getBoxCSS(margin))}
		}
		${postSl}:hover .${prefix}Thumb{
			${isValidCSS('border-radius', getBoxCSS(hoverRadius))}
			${isValidCSS('box-shadow', getMultiShadowCSS(hoverShadow))}
		}
		${postSl} .${prefix}Thumb img,
		${postSl}.${prefix}Overlay img{
			${isValidCSS('object-fit', fImgFitting)}
			${'zoom-out' === hoverAnimation ? 'transform: scale(1.1);' : ''}
		}
		${postSl}:hover .${prefix}Thumb img,
		${postSl}.${prefix}Overlay:hover img{
			${'zoom-in' === hoverAnimation ? 'transform: scale(1.1);' : ''}
			${'zoom-out' === hoverAnimation ? 'transform: scale(1.0);' : ''}
		}
	`;
}
export default Image;
