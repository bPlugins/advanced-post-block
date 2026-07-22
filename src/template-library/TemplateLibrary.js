import { __ } from '@wordpress/i18n';

import BPLTemplateLibrary from '../../../bpl-tools/TemplateLibrary';

import { pluginIcon } from '../utils/icons';
import { prefix, pricingUrl } from '../utils/data';

/**
 * Plugin-specific TemplateLibrary wrapper for Advanced Post Block
 * Provides all plugin-specific configuration and translations
 */
const TemplateLibrary = () => {
	const nonce = apbtemplatenonce;
	const isPremium = false; // Free version — Pro templates show the "Get Pro" link

	return <BPLTemplateLibrary
		prefix={prefix}
		logo={pluginIcon}
		buttonLabel={__('Template Library', 'advanced-post-block')}
		modalTitle={__('Templates Library', 'advanced-post-block')}

		types={['patterns']}

		pricingUrl={pricingUrl}

		ajaxActionMain='apb_templates_main'
		ajaxActionTemplates='apb_templates'
		ajaxActionImport='apb_template_import'
		ajaxActionCounts='apb_template_counts'

		nonce={nonce}
		isPremium={isPremium}
	/>;
};
export default TemplateLibrary;
