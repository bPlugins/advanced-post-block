import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

import { prefix } from '../../../utils/data';

const Button = ({ currentPage, totalPages, setPageNumber, label = __('Load More', 'advanced-post-block'), isLoading }) => {
	if (currentPage >= totalPages) return null;

	return <div className={`${prefix}LoadMore loadMoreButton`}>
		<button className='loadMoreBtn' onClick={() => setPageNumber(currentPage + 1)} disabled={isLoading}>
			{label}

			{isLoading && <div className='loadMoreBtnSpinner'>
				<Spinner />
			</div>}
		</button>
	</div>
};

export default Button;
