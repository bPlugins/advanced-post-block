import { isValidCSS } from '../../../../../../bpl-tools/utils/getCSS';

const Grid = ({ attributes, mainSl, prefix }) => {
	const { columnGap, rowGap, isContentEqualHight } = attributes;

	return `
		${mainSl} .${prefix}GridPosts,
		${mainSl} .${prefix}Magazine1Posts,
		${mainSl} .${prefix}Magazine1ListInner,
		${mainSl} .${prefix}Magazine2Posts{
			${isValidCSS('row-gap', rowGap + 'px')}
			${isValidCSS('column-gap', columnGap + 'px')}
		}
		${mainSl} .${prefix}GridPosts{
			${isValidCSS('align-items', false === isContentEqualHight ? 'start' : 'initial')}
		}
	`;
}
export default Grid;
