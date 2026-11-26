import { createRoot } from 'react-dom';
import 'swiper/css/bundle';

import './style.scss';
import APBPosts from './Components/Frontend/APBPosts';

document.addEventListener('DOMContentLoaded', () => {
	const postsEls = document.querySelectorAll('.wp-block-ap-block-posts');
	postsEls.forEach(postsEl => {
		const nonce = JSON.parse(postsEl.dataset.nonce);
		const attributes = JSON.parse(postsEl.dataset.attributes);

		// The signed query, the REST address and the filter choices printed by render.php.
		let request = {};
		try {
			request = JSON.parse(postsEl.dataset.request || '{}');
		} catch (error) {
			request = {};
		}

		createRoot(postsEl).render(<APBPosts nonce={nonce} attributes={attributes} id={postsEl.id} request={request} />);

		postsEl?.removeAttribute('data-nonce');
		postsEl?.removeAttribute('data-attributes');
		postsEl?.removeAttribute('data-request');
	});
});
