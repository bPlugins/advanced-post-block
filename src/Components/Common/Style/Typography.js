import { getTypoCSS } from '../../../../../bpl-tools/utils/getCSS';

const Typography = ({ attributes, postTitleSl, postMetaSl, postSl, postReadMoreSl, prefix }) => {
	const { titleTypo, metaTypo, excerptTypo, readMoreTypo } = attributes;

	return `
		${getTypoCSS('', titleTypo)?.googleFontLink}
		${getTypoCSS('', metaTypo)?.googleFontLink}
		${getTypoCSS('', excerptTypo)?.googleFontLink}
		${getTypoCSS('', readMoreTypo)?.googleFontLink}
		${getTypoCSS(`${postTitleSl}, ${postTitleSl} a`, titleTypo)?.styles}
		${getTypoCSS(`${postMetaSl}, ${postMetaSl} *, ${postSl} .${prefix}CatsBadge`, metaTypo)?.styles}
		${getTypoCSS(`${postSl} .${prefix}Excerpt`, excerptTypo)?.styles}
		${getTypoCSS(`${postReadMoreSl} a`, readMoreTypo)?.styles}
	`;
}
export default Typography;
