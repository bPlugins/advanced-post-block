import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

import { PremiumBadge, PremiumPanel } from '../../../../../../../bpl-tools/ProControls';

import { pricingUrl } from '../../../../../utils/data';

const NewsTickerOptions = () => {
	return <PanelBody className='bPlPanelBody apbNewsTickerOptions' title={<>
		{__('News Ticker Options', 'advanced-post-block')}
		<PremiumBadge />
	</>} initialOpen={false}>
		<PremiumPanel title={__('News Ticker Options', 'advanced-post-block')} description={__('News ticker themes, types, directions, animations and custom configuration are available in the Premium version.', 'advanced-post-block')} pricingUrl={pricingUrl} />
	</PanelBody>
}
export default NewsTickerOptions;
