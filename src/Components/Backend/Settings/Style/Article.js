import { __ } from '@wordpress/i18n';
import { TabPanel, PanelBody } from '@wordpress/components';

import { ShadowControl, Badge } from '../../../../../../bpl-tools/Components';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { normalHoverTabs } from '../../../../../../bpl-tools/utils/options';

const Article = ({ attributes, setAttributes }) => {
	const { border, hoverBorder, shadow, hoverShadow } = attributes;

	return <PanelBody className='bPlPanelBody' title={__('Article', 'advanced-post-block')}>
		<TabPanel className='bPlTabPanel small' activeClass='activeTab' tabs={normalHoverTabs}>{tab => <>
			{'normal' === tab.name && <>
				<BorderControl label={__('Border', 'advanced-post-block')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ width: '1px', color: '#0c0d3c1a', radius: '5px' }} />

				<ShadowControl label={<>{__('Shadow', 'advanced-post-block')} <Badge /></>} value={shadow} onChange={val => setAttributes({ shadow: val })} />
			</>}

			{'hover' === tab.name && <>
				<BorderControl label={<>{__('Hover Border', 'advanced-post-block')} <Badge /></>} value={hoverBorder} onChange={val => setAttributes({ hoverBorder: val })} defaults={{ width: '1px', color: '#0c0d3c1a', radius: '5px' }} />

				<ShadowControl label={<>{__('Hover Shadow', 'advanced-post-block')} <Badge /></>} value={hoverShadow} onChange={val => setAttributes({ hoverShadow: val })} />
			</>}
		</>}</TabPanel>
	</PanelBody>
}
export default Article;