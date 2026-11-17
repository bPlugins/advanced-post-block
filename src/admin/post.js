import './post.scss';

document.addEventListener('DOMContentLoaded', () => {
	const banner = document.getElementById('apbBFCMBanner');
	if (!banner) {
		return;
	}

	const storageKey = 'bpl_bfcm_2026_dismissed_advanced-post-block';
	try {
		if (window.localStorage.getItem(storageKey) === 'true') {
			banner.remove();
			return;
		}
	} catch (e) {
		// localStorage unavailable
	}

	const dismissBtn = document.getElementById('apbBFCMDismissBtn');
	if (dismissBtn) {
		dismissBtn.addEventListener('click', (e) => {
			e.preventDefault();
			banner.style.opacity = '0';
			setTimeout(() => {
				banner.remove();
			}, 250);

			try {
				window.localStorage.setItem(storageKey, 'true');
			} catch (err) {
				// ignore localStorage error
			}

			const nonce = banner.dataset.nonce;
			if (nonce && window.ajaxurl) {
				const formData = new FormData();
				formData.append('action', 'apb_dismiss_bfcm_banner');
				formData.append('nonce', nonce);
				fetch(window.ajaxurl, {
					method: 'POST',
					body: formData,
				}).catch(() => {
					// ignore network error
				});
			}
		});
	}
});

window.copyBPlAdminShortcode = id => {
	var input = document.querySelector('#bPlAdminShortcode-' + id + ' input');
	var tooltip = document.querySelector('#bPlAdminShortcode-' + id + ' .tooltip');
	input.select();
	input.setSelectionRange(0, 30);
	document.execCommand('copy');
	tooltip.innerHTML = wp.i18n.__('Copied Successfully!', 'advanced-post-block');
	setTimeout(() => {
		tooltip.innerHTML = wp.i18n.__('Copy To Clipboard', 'advanced-post-block');
	}, 1500);
}