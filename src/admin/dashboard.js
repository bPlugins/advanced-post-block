import { createRoot } from 'react-dom/client';

import './dashboard.scss';
import App from './Components/App';
import { dashboardInfo } from './utils/data';

document.addEventListener('DOMContentLoaded', () => {
	const dashboardEl = document.getElementById('apbDashboard');
	let info = {};
	try {
		const raw = dashboardEl.dataset.info;
		if (raw && raw !== 'undefined' && raw !== '') {
			info = JSON.parse(raw);
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn('Advanced Post Block: Invalid data JSON', e);
	}

	createRoot(dashboardEl).render(<App {...dashboardInfo(info)} />);

	dashboardEl.removeAttribute('data-info');
});