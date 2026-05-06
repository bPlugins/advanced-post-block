import { createRoot } from 'react-dom';
import 'swiper/css/bundle';

import './style.scss';
import APBPosts from './Components/Frontend/APBPosts';

document.addEventListener('DOMContentLoaded', () => {
	const postsEls = document.querySelectorAll('.wp-block-ap-block-posts');
	postsEls.forEach(postsEl => {
		const nonce = JSON.parse(postsEl.dataset.nonce);
		const attributes = JSON.parse(postsEl.dataset.attributes);

		createRoot(postsEl).render(<APBPosts nonce={nonce} attributes={attributes} id={postsEl.id} />);

		postsEl?.removeAttribute('data-nonce');
		postsEl?.removeAttribute('data-attributes');
	});
});