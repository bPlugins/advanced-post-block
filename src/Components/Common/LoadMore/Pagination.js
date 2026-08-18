import { usePagination, DOTS } from './usePagination';
import { prefix } from '../../../utils/data';
import { savePaginationPage } from '../../../utils/paginationStorage';

const Pagination = ({ id, currentPage, totalCount, postsPerPage, prevLabel, nextLabel, setPageNumber, scrollTop }) => {
	const { enabled = false, offset: scrollTopOffset = 50 } = scrollTop || {};

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		pageSize: postsPerPage,
		siblingCount: 1
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	let lastPage = paginationRange[paginationRange.length - 1];

	const handlePageChange = newPage => {
		if (newPage < 1 || newPage > lastPage) return;

		setPageNumber(newPage);
		savePaginationPage(id, newPage);
		if (enabled) {
			const element = document.getElementById(id);
			if (element) {
				const top = element.getBoundingClientRect().top + window.scrollY - scrollTopOffset;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		}
	};

	return <ul className={`${prefix}LoadMore loadMorePagination`}>
		<li className={`loadMoreBtn ${prefix}PageNumber ${currentPage === 1 ? 'disabled' : ''}`}
			onClick={() => handlePageChange(currentPage - 1)}
		>{prevLabel}</li>

		{paginationRange.map((pageNumber, index) => {
			if (pageNumber === DOTS) {
				return <li key={index} className='dots'>&#183;&#183;&#183;&#183;&#183;</li>;
			}

			return <li key={index}
				className={`loadMoreBtn ${prefix}PageNumber ${prefix}PageNumber-${pageNumber} ${pageNumber === currentPage ? `active ${prefix}ActivePage` : ''}`}
				onClick={() => handlePageChange(pageNumber)}
			> {pageNumber}</li>;
		})}

		<li className={`loadMoreBtn ${prefix}PageNumber ${currentPage === lastPage ? 'disabled' : ''}`}
			onClick={() => handlePageChange(currentPage + 1)}
		>{nextLabel}</li>
	</ul>
};
export default Pagination;
