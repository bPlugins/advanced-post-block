import { useState, useEffect } from 'react';

import Pagination from './Pagination';
import Navigation from './Navigation';
import Button from './Button';
import { getPaginationPage, savePaginationPage } from '../../../utils/paginationStorage';

const LoadMore = ({ attributes, id, pageNumber = 1, totalCount, onChange, isLoading, persist = true }) => {
	const { postsPerPage, isPagination, paginationPrevLabel, paginationNextLabel, loadMore = {} } = attributes;
	const { type = '', scrollTop = {}, button = {} } = loadMore || {};

	// Determine the actual type. Old 'isPagination' attribute takes precedence or maps to 'pagination'
	const loadMoreType = isPagination ? 'pagination' : type;

	// Initialize from sessionStorage if available, otherwise use passed pageNumber
	const [currentPage, setCurrentPage] = useState(() => {
		return persist ? getPaginationPage(id, pageNumber) : pageNumber;
	});

	// The parent owns the page: a filter change can move it from outside.
	useEffect(() => {
		setCurrentPage(pageNumber);
	}, [pageNumber]);

	const totalPages = Math.ceil(totalCount / postsPerPage);

	const setPageNumber = pn => {
		if (pn < 1 || pn > totalPages) return;
		onChange(pn);
		setCurrentPage(pn);
		if (persist) savePaginationPage(id, pn);
	};

	// Save pagination state to sessionStorage whenever it changes
	useEffect(() => {
		if (persist) savePaginationPage(id, currentPage);
	}, [currentPage, id, persist]);

	// If no type is selected and not pagination, return null
	if (!loadMoreType) {
		return null;
	}

	const defaultProps = { currentPage, totalPages, setPageNumber }

	switch (loadMoreType) {
		case 'pagination':
			return <Pagination
				id={id}
				blockId={id}
				{...defaultProps}
				totalCount={totalCount}
				postsPerPage={postsPerPage}
				prevLabel={paginationPrevLabel}
				nextLabel={paginationNextLabel}
				scrollTop={scrollTop}
				attributes={attributes}
				onChange={onChange}
				persist={persist}
			/>;
		case 'navigation':
			return <Navigation
				id={id}
				{...defaultProps}
				prevLabel={paginationPrevLabel}
				nextLabel={paginationNextLabel}
				scrollTop={scrollTop}
			/>;
		case 'button':
			return <Button
				{...defaultProps}
				{...button}
				isLoading={isLoading}
			/>;
		default:
			return null;
	}
};

export default LoadMore;
