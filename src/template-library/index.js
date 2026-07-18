import { subscribe } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { createRoot } from 'react-dom/client';

import './style.scss';
import TemplateLibrary from './TemplateLibrary';

const mountTemplateLibrary = () => {
	const templateLibraryWrap = document.createElement('div');
	templateLibraryWrap.classList.add('apbTemplateLibrary');
	createRoot(templateLibraryWrap).render(<TemplateLibrary />);

	subscribe(() => {
		setTimeout(() => {
			const toolbar = document.querySelector('.edit-post-header-toolbar');
			if (toolbar) {
				if (!toolbar.querySelector('.apbTemplateLibrary')) {
					toolbar.appendChild(templateLibraryWrap);
				}
			}
		}, 1);
	});
};
domReady(mountTemplateLibrary);
