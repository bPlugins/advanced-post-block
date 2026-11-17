import { __ } from '@wordpress/i18n';
import { Outlet, Link, useLocation } from 'react-router-dom';

import Header from '../../../../bpl-tools/Admin/Header';
import BFCMBanner from '../../../../bpl-tools/Admin/BFCMBanner';

const navigation = [
	{ name: __('Welcome', 'advanced-post-block'), href: '/welcome' },
	{ name: __('Demos', 'advanced-post-block'), href: '/demos' },
	{ name: __('Pricing', 'advanced-post-block'), href: '/pricing' },
	{ name: __('Feature Comparison', 'advanced-post-block'), href: '/feature-comparison' },
	{ name: __('Settings', 'advanced-post-block'), href: '/settings' }
];

const Layout = (props) => {
	const location = useLocation();
	const { bfcmBanner, isPremium, isBFCMDismissed, dismissNonce } = props;

	const handleDismiss = () => {
		if (dismissNonce && window.ajaxurl) {
			const data = new FormData();
			data.append('action', 'apb_dismiss_bfcm_banner');
			data.append('nonce', dismissNonce);
			fetch(window.ajaxurl, {
				method: 'POST',
				body: data,
			}).catch(() => {
				// ignore network error
			});
		}
	};

	return <div className='bPlDashboard'>
		{bfcmBanner && (
			<BFCMBanner
				{...bfcmBanner}
				isPremium={isPremium}
				isDismissed={isBFCMDismissed}
				onDismiss={handleDismiss}
			/>
		)}

		<Header {...props}>
			<nav className='bPlDashboardNav'>
				{navigation?.map((item, index) => <Link
					key={index}
					to={item.href}
					className={`navLink ${location.pathname === item.href ? 'active' : ''}`}
				>
					{item.name}
				</Link>)}
			</nav>
		</Header>

		<main className='bPlDashboardMain'>
			<Outlet />
		</main>
	</div>
}
export default Layout;