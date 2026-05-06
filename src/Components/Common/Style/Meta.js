import { isValidCSS, getSpaceCSS } from '../../../../../bpl-tools/utils/getCSS';

const Meta = ({ attributes, postMetaSl, contentFlexAlign }) => {
	const { metaTextColor, metaLinkColor, metaIconColor, metaMargin, meta = {}, } = attributes;
	const { styles = {} } = meta || {};

	const { hoverColor = '', linkHoverColor = '', iconHoverColor = '' } = styles || {};

	return `
		${postMetaSl}{
			${isValidCSS('justify-content', contentFlexAlign)}
			${isValidCSS('margin', getSpaceCSS(metaMargin))}
		}
		${postMetaSl} .metaItem{
			${isValidCSS('color', metaTextColor)}
		}
		${postMetaSl} .metaItem:hover{
			${isValidCSS('color', hoverColor)}
		}
		${postMetaSl} a{
			${isValidCSS('color', metaLinkColor)}
		}
		${postMetaSl} a:hover{
			${isValidCSS('color', linkHoverColor)}
		}
		${postMetaSl} .metaItem svg{
			${isValidCSS('fill', metaIconColor)}
			${isValidCSS('color', metaIconColor)}
		}
		${postMetaSl} .metaItem:hover svg{
			${isValidCSS('fill', iconHoverColor)}
			${isValidCSS('color', iconHoverColor)}
		}
	`;
}
export default Meta;
