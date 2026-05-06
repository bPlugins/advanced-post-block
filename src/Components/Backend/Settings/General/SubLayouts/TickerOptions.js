import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { PremiumBadge, PremiumPanel } from '../../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../../utils/data';

const TickerOptions = () => {
	return <PanelBody className='bPlPanelBody apbTickerOptions' title={<>
		{__('Ticker Options', 'advanced-post-block')}
		<PremiumBadge />
	</>} initialOpen={false}>
		<PremiumPanel title={__('Ticker Options', 'advanced-post-block')} description={__('Ticker speed, direction, and animation style controls are available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
	</PanelBody>
}
export default TickerOptions;
