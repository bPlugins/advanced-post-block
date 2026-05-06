import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';

const Settings = ({ deleteDataOnUninstall, uninstallNonce }) => {
	const [enabled, setEnabled] = useState(deleteDataOnUninstall);
	const [notice, setNotice] = useState('');

	const { data, saveData, isLoading, error } = useWPAjax('apbSaveUninstallOption', { nonce: uninstallNonce }, false);

	useEffect(() => {
		if (data) {
			setEnabled(data.enabled);
			setNotice(data.message);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			setNotice(__('Failed to save setting.', 'advanced-post-block'));
		}
	}, [error]);

	const handleToggle = () => {
		const newValue = !enabled;

		// Show confirm dialog when enabling (destructive action)
		if (newValue) {
			const confirmed = window.confirm(
				__('Are you sure? This will permanently delete all Advanced Post Block shortcode posts and post view tracking data when the plugin is uninstalled.', 'advanced-post-block')
			);

			if (!confirmed) return;
		}

		setNotice('');
		saveData({ enabled: String(newValue) });
	};

	return <div className='bPlDashboardSettings bPlDashboardCard'>
		<h2>{__('Delete Data on Uninstall', 'advanced-post-block')}</h2>

		<p>{__('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'advanced-post-block')}</p>

		<ul>
			<li>{__('All shortcode posts (apb post type)', 'advanced-post-block')}</li>
			<li>{__('Post view tracking data', 'advanced-post-block')}</li>
		</ul>

		<p className='settingsWarning'>
			{__('⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.', 'advanced-post-block')}
		</p>

		<div className='settingsControl'>
			<label className='toggleControl'>
				<input type='checkbox' checked={enabled} onChange={handleToggle} disabled={isLoading} />

				<span className='toggleSlider' />
			</label>

			<span className='toggleLabel'>
				{enabled
					? __('Data will be deleted on uninstall', 'advanced-post-block')
					: __('Data will be preserved on uninstall', 'advanced-post-block')
				}
			</span>
		</div>

		{notice && <div className={`settingsNotice ${enabled ? 'warning' : 'success'}`}>{notice}</div>}
	</div>;
};
export default Settings;
