import { isValidCSS, getBackgroundCSS, getBorderCSS, getSpaceCSS, getMultiShadowCSS } from '../../../../../bpl-tools/utils/getCSS';

const Base = ({ attributes, postSl, newsTickerSl, contentFlexAlign, prefix }) => {
	const { contentBG, hoverContentBG = {}, contentPadding, border, hoverBorder = {}, shadow = [], hoverShadow = [] } = attributes;

	return `
		${postSl}{
			${getBorderCSS(border)}
			${isValidCSS('box-shadow', getMultiShadowCSS(shadow))}
		}
		${postSl}:hover{
			${getBorderCSS(hoverBorder)}
			${isValidCSS('box-shadow', getMultiShadowCSS(hoverShadow))}
		}

		${postSl}:not(.${prefix}Overlay){
			${getBackgroundCSS(contentBG)}
		}
		${postSl}:not(.${prefix}Overlay):hover{
			${getBackgroundCSS(hoverContentBG)}
		}

		${newsTickerSl}{
			${getBackgroundCSS(contentBG)}
			${getBorderCSS(border)}
			${isValidCSS('box-shadow', getMultiShadowCSS(shadow))}
		}
		${newsTickerSl}:hover{
			${getBackgroundCSS(hoverContentBG)}
			${getBorderCSS(hoverBorder)}
			${isValidCSS('box-shadow', getMultiShadowCSS(hoverShadow))}
		}

		${postSl} .${prefix}Text{
			${isValidCSS('padding', getSpaceCSS(contentPadding))}
		}
		${postSl}.${prefix}Overlay .${prefix}Text{
			${getBackgroundCSS(contentBG)}
			${isValidCSS('align-items', contentFlexAlign)}
		}

		${postSl}.${prefix}Overlay:hover .${prefix}Text{
			${getBackgroundCSS(hoverContentBG)}
		}

		${postSl} .${prefix}Text .${prefix}CatsBadge.aboveContent{
			${isValidCSS('justify-content', contentFlexAlign)}
		}
	`;
}
export default Base;
