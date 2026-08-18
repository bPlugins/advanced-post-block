/* eslint-disable no-console */
/**
 * SessionStorage utility for pagination state management across multiple blocks
 */

const STORAGE_PREFIX = 'apb_pagination_';

/**
 * Get current page from sessionStorage for a specific block
 * @param {string} blockId - Unique block identifier
 * @param {number} defaultPage - Default page if not found in storage
 * @returns {number} Current page number
 */
export const getPaginationPage = (blockId, defaultPage = 1) => {
	if (!blockId) return defaultPage;

	try {
		const stored = sessionStorage.getItem(`${STORAGE_PREFIX}${blockId}`);
		const page = stored ? parseInt(stored, 10) : defaultPage;
		return !isNaN(page) && page > 0 ? page : defaultPage;
	} catch (error) {
		console.warn('Error reading pagination from sessionStorage:', error);
		return defaultPage;
	}
};

/**
 * Save current page to sessionStorage for a specific block
 * If page is 1 or less, delete the storage entry (no need to persist default page)
 * @param {string} blockId - Unique block identifier
 * @param {number} pageNumber - Page number to save
 */
export const savePaginationPage = (blockId, pageNumber) => {
	if (!blockId) return;

	try {
		// Delete storage if on default page (1 or less) to keep storage clean
		if (pageNumber <= 1) {
			sessionStorage.removeItem(`${STORAGE_PREFIX}${blockId}`);
		} else {
			sessionStorage.setItem(`${STORAGE_PREFIX}${blockId}`, String(pageNumber));
		}
	} catch (error) {
		console.warn('Error saving pagination to sessionStorage:', error);
	}
};

/**
 * Clear pagination state for a specific block
 * @param {string} blockId - Unique block identifier
 */
export const clearPaginationPage = (blockId) => {
	if (!blockId) return;

	try {
		sessionStorage.removeItem(`${STORAGE_PREFIX}${blockId}`);
	} catch (error) {
		console.warn('Error clearing pagination from sessionStorage:', error);
	}
};

/**
 * Clear all pagination states (useful for navigation events)
 */
export const clearAllPaginationPages = () => {
	try {
		Object.keys(sessionStorage).forEach(key => {
			if (key.startsWith(STORAGE_PREFIX)) {
				sessionStorage.removeItem(key);
			}
		});
	} catch (error) {
		console.warn('Error clearing all pagination from sessionStorage:', error);
	}
};
