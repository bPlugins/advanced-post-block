import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../utils/data';

const Sorting = () => {
	return <PanelBody className='bPlPanelBody' title={<>
		{__('Elements', 'advanced-post-block')}
		<PremiumBadge />
	</>} initialOpen={false}>
		<PremiumPanel title={__('Premium Sorting', 'advanced-post-block')} description={__('Drag-and-drop sorting of title, meta, and excerpt elements is available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
	</PanelBody>
};

export default Sorting;
