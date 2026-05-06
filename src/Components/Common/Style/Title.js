import { isValidCSS, getSpaceCSS } from '../../../../../bpl-tools/utils/getCSS';

const Title = ({ attributes, postTitleSl, postSl, prefix }) => {
	const { contentAlign, titleColor, titleMargin, title = {} } = attributes;
	const { styles = {} } = title || {};

	const { textAlign = '', hoverColor = '' } = styles || {};

	return `
		${postTitleSl}, ${postTitleSl} a{
			${isValidCSS('text-align', textAlign || contentAlign)}
			${isValidCSS('color', titleColor)}
		}
		${postTitleSl}{
			${isValidCSS('margin', getSpaceCSS(titleMargin))}
		}
		${postSl}:hover .${prefix}Title,
		${postSl}:hover .${prefix}Title a{
			${isValidCSS('color', hoverColor)}
		}
	`;
}
export default Title;
