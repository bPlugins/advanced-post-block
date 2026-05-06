import { isValidCSS, getColorsCSS, getBoxCSS } from '../../../../../bpl-tools/utils/getCSS';

const CategoryBadge = ({ attributes, postSl, prefix }) => {
	const { metaColorsOnImage, categoryOnImage = {} } = attributes;
	const { styles = {} } = categoryOnImage || {};

	const { margin = { top: '0px', right: '0px', bottom: '10px', left: '10px' } } = styles || {};

	return `
		${postSl} .${prefix}CatsBadge{
			${isValidCSS('margin', getBoxCSS(margin))}
		}
		${postSl} .${prefix}CatsBadge a{
			${getColorsCSS(metaColorsOnImage)}
		}
	`;
}
export default CategoryBadge;
