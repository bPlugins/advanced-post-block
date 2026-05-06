import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { PremiumBadge, PremiumPanel } from '../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../utils/data';

const Pagination = () => {
	return <PanelBody className='bPlPanelBody' title={<>
		{__('Load More / Pagination', 'advanced-post-block')}
		<PremiumBadge />
	</>} initialOpen={false}>
		<PremiumPanel title={__('Premium Pagination', 'advanced-post-block')} description={__('Pagination, navigation, infinite scroll or load more buttons with customization are available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
	</PanelBody>
}
export default Pagination;
