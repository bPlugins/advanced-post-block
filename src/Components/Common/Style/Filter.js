import { isValidCSS, getColorsCSS, getSpaceCSS, getBorderCSS, getTypoCSS } from '../../../../../bpl-tools/utils/getCSS';

import { getFilter } from '../../../utils/filter';

const Filter = ({ attributes, mainSl, prefix }) => {
	const { enabled, alignment, styles } = getFilter(attributes);

	if (!enabled) return '';

	const { gap, marginBottom, typo, labelColor, item, resultCountColor, resetColor } = styles;

	const layoutSl = `${mainSl} .${prefix}FilterLayout`;
	const filterSl = `${mainSl} .${prefix}Filter`;
	const itemSl = `${filterSl} .${prefix}FilterItem`;
	const statusSl = `${mainSl} .${prefix}FilterStatus`;
	const textSl = `${itemSl}, ${statusSl}, ${statusSl} button, ${mainSl} .${prefix}FilterNoResults`;

	const justify = { left: 'flex-start', center: 'center', right: 'flex-end' }[alignment] || 'flex-start';

	return `
		${getTypoCSS('', typo)?.googleFontLink}
		${getTypoCSS(textSl, typo)?.styles}

		${layoutSl}{
			${isValidCSS('--apb-filter-gap', gap)}
			${isValidCSS('--apb-filter-space', marginBottom)}
			--apb-filter-justify: ${justify};
		}

		${filterSl} .${prefix}FilterLabel{
			${isValidCSS('color', labelColor)}
		}

		${itemSl}{
			${getColorsCSS(item.colors)}
			${isValidCSS('padding', getSpaceCSS(item.padding))}
			${getBorderCSS(item.border)}
		}
		${itemSl}:hover:not(:disabled):not(.active){
			${getColorsCSS(item.hoverColors)}
		}
		${itemSl}.active{
			${getColorsCSS(item.activeColors)}
			${isValidCSS('border-color', item.activeBorderColor)}
		}

		${statusSl} .${prefix}FilterResultCount{
			${isValidCSS('color', resultCountColor)}
		}
		${mainSl} .${prefix}FilterReset{
			${isValidCSS('color', resetColor)}
		}
	`;
}
export default Filter;
