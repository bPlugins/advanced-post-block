import { isValidCSS, getSpaceCSS } from '../../../../../bpl-tools/utils/getCSS';

const Excerpt = ({ attributes, postSl, prefix }) => {
	const { excerptAlign, excerptColor, excerptMargin, excerpt = {} } = attributes;
	const { styles = {} } = excerpt || {};

	const { hoverColor = '' } = styles || {};

	return `
		${postSl} .${prefix}Excerpt{
			${isValidCSS('text-align', excerptAlign)}
			${isValidCSS('color', excerptColor)}
			${isValidCSS('margin', getSpaceCSS(excerptMargin))}
		}
		${postSl}:hover .${prefix}Excerpt{
			${isValidCSS('color', hoverColor)}
		}
	`;
}
export default Excerpt;
