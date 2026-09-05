import { isValidCSS, getColorsCSS, getBoxCSS } from '../../../../../bpl-tools/utils/getCSS';

const CategoryBadge = ({ attributes, postSl, prefix }) => {
	const { metaColorsOnImage, categoryOnImage = {} } = attributes;
	const { styles = {} } = categoryOnImage || {};

	const { padding = { top: '3px', right: '8px', bottom: '3px', left: '8px' }, radius = { top: '3px', right: '3px', bottom: '3px', left: '3px' }, margin = { top: '0px', right: '0px', bottom: '10px', left: '10px' } } = styles || {};

	return `
		${postSl} .${prefix}CatsBadge{
			${isValidCSS('margin', getBoxCSS(margin))}
		}
		${postSl} .${prefix}CatsBadge a{
			${getColorsCSS(metaColorsOnImage)}
			${isValidCSS('padding', getBoxCSS(padding))}
			${isValidCSS('border-radius', getBoxCSS(radius))}
		}
	`;
}
export default CategoryBadge;
