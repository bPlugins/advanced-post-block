import { __ } from '@wordpress/i18n';
import { Outlet, Link, useLocation } from 'react-router-dom';

import Header from '../../../../bpl-tools/Admin/Header';

const navigation = [
	{ name: __('Welcome', 'advanced-post-block'), href: '/welcome' },
	{ name: __('Demos', 'advanced-post-block'), href: '/demos' },
	{ name: __('Pricing', 'advanced-post-block'), href: '/pricing' },
	{ name: __('Feature Comparison', 'advanced-post-block'), href: '/feature-comparison' },
	{ name: __('Settings', 'advanced-post-block'), href: '/settings' }
];

const Layout = (props) => {
	const location = useLocation();

	return <div className='bPlDashboard'>
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