import { __ } from '@wordpress/i18n';
import { PanelBody, TabPanel } from '@wordpress/components';

import { ColorControl, Label, Notice } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';

const AccordionOptions = ({ attributes, setAttributes }) => {
	const { layout, accordion = {} } = attributes;

	if ('accordion' !== layout) return null;

	const { styles = {} } = accordion || {};
	const { headerBG = '', hovHeaderBG = '', headerPadding, indicatorColor = '', indicatorActiveColor = '' } = styles || {};

	const setAccordion = obj => setAttributes({ accordion: { ...accordion, ...obj } });
	const setStyles = obj => setAccordion({ styles: { ...styles, ...obj } });

	return <PanelBody className='bPlPanelBody apbAccordionStyle' title={__('Accordion Options', 'advanced-post-block')} initialOpen={false}>
		<Label>{__('Header Background:', 'advanced-post-block')}</Label>
		<TabPanel className='bPlTabPanel small' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <ColorControl value={headerBG} onChange={val => setStyles({ headerBG: val })} defaultColor='' />}

			{'hover' === tab.name && <ColorControl value={hovHeaderBG} onChange={val => setStyles({ hovHeaderBG: val })} defaultColor='' />}
		</>}</TabPanel>

		<SpaceControl className='mt20' label={__('Header Padding:', 'advanced-post-block')} value={headerPadding} onChange={val => setStyles({ headerPadding: val })} defaults={{ side: 2, vertical: '18px', horizontal: '20px' }} />

		<ColorControl className='mt20' label={__('Indicator Color:', 'advanced-post-block')} value={indicatorColor} onChange={val => setStyles({ indicatorColor: val })} defaultColor='' />

		<ColorControl label={__('Indicator Active Color:', 'advanced-post-block')} value={indicatorActiveColor} onChange={val => setStyles({ indicatorActiveColor: val })} defaultColor='' />

		<Notice className='mt20'>{__('Body background uses Content Background, item border/shadow use the Article panel (open state = Hover Border), body padding uses Content Padding.', 'advanced-post-block')}</Notice>

		<Notice status='premium' isIcon={true}>{__('Lift Up and Zoom In hover animations are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default AccordionOptions;
