import { isValidCSS, getColorsCSS, getSpaceCSS } from '../../../../../bpl-tools/utils/getCSS';

const Pagination = ({ attributes, loadMoreSl }) => {
	const { paginationColors, paginationHovColors, paginationPadding, paginationSpacing, loadMore = {} } = attributes;
	const { alignment = 'center' } = loadMore || {};

	return `
		${loadMoreSl}{
			${isValidCSS('gap', paginationSpacing)}
			${isValidCSS('justify-content', alignment)}
		}
		${loadMoreSl} .loadMoreBtn{
			font-size: 15px;
			${getColorsCSS(paginationColors)}
			${isValidCSS('padding', getSpaceCSS(paginationPadding))}
		}
		${loadMoreSl} .loadMoreBtn:hover,
		${loadMoreSl} .loadMoreBtn.active{
			${getColorsCSS(paginationHovColors)}
		}

		@media only screen and (max-width: 640px) {
			${loadMoreSl}{
				gap: calc( ${paginationSpacing} / 2 );
			}
			${loadMoreSl} .loadMoreBtn{
				font-size: 12px;
				${isValidCSS('padding', getSpaceCSS(paginationPadding)?.split(' ').map(v => `calc( ${v} / 2 )`).join(' '))}
			}
		}
	`;
}
export default Pagination;
