import { prefix } from '../../../utils/data';

const Navigation = ({ id, currentPage, totalPages, prevLabel, nextLabel, setPageNumber, scrollTop }) => {
	const { enabled = false, offset: scrollTopOffset = 50 } = scrollTop || {};

	const handlePageChange = newPage => {
		setPageNumber(newPage);
		if (enabled) {
			const element = document.getElementById(id);
			if (element) {
				const top = element.getBoundingClientRect().top + window.scrollY - scrollTopOffset;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		}
	};

	return <ul className={`${prefix}LoadMore loadMoreNavigation`}>
		<li
			className={`loadMoreBtn ${currentPage === 1 ? 'active disabled' : ''}`}
			onClick={() => currentPage === 1 ? null : handlePageChange(currentPage - 1)}
		>
			{prevLabel}
		</li>

		<li
			className={`loadMoreBtn ${currentPage === totalPages ? 'active disabled' : ''}`}
			onClick={() => currentPage === totalPages ? null : handlePageChange(currentPage + 1)}
		>
			{nextLabel}
		</li>
	</ul>
};

export default Navigation;
