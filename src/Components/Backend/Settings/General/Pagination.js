import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, TextControl, ToggleControl, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { Badge, BtnGroup, ColorsControl, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';
import { SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { pxUnit, emUnit } from '../../../../../../bpl-tools/utils/options';
import { primaryColor, titleColor } from '../../../../../../bpl-tools/utils/data';

import { loadMoreTypes, flexAligns } from '../../../../utils/options';

const Pagination = ({ attributes, setAttributes, updateObj }) => {
	const { isPostsPerPageAll, isPagination, paginationPrevLabel, paginationNextLabel, paginationColors, paginationHovColors, paginationPadding, paginationSpacing, loadMore = {} } = attributes;
	const { type = '', alignment = 'center', scrollTop = {} } = loadMore || {};
	const { enabled = false, offset: scrollTopOffset = 50 } = scrollTop || {};

	const loadMoreType = isPagination ? 'pagination' : type;

	if (isPostsPerPageAll) return null;

	return <PanelBody className='bPlPanelBody' title={<>
		{__('Load More / Pagination', 'advanced-post-block')}
		<Badge size='regular' />
	</>} initialOpen={false}>
		<SelectControl
			label={<>
				{__('Type', 'advanced-post-block')}
				<HelpTooltip text={__('Choose how to load more posts. Note: Posts Per Page must not be -1.', 'advanced-post-block')} />
			</>}
			labelPosition='left'
			value={loadMoreType}
			onChange={val => setAttributes({ isPagination: false, loadMore: { ...loadMore, type: val } })}
			options={loadMoreTypes}
		/>
		<Notice status='warning'>{__(`Load More / Pagination will not work if 'Post Per Page' is -1`, 'advanced-post-block')}</Notice>


		<BtnGroup className='mt20' label={__('Alignment', 'advanced-post-block')} value={alignment} onChange={val => updateObj('loadMore', val, 'alignment')} options={flexAligns} isIcon={true} />


		{['pagination', 'navigation'].includes(loadMoreType) && <>
			<ToggleControl className='mt20' label={__('Back to Top on Change', 'advanced-post-block')} checked={enabled} onChange={val => updateObj('loadMore', val, 'scrollTop', 'enabled')} />

			{enabled && <RangeControl className='mt20' label={__('Top Offset (px)', 'advanced-post-block')} value={scrollTopOffset} onChange={val => updateObj('loadMore', val, 'scrollTop', 'offset')} min={0} max={500} step={1} />}

			<TextControl className='mt20' label={__('Previous Label:', 'advanced-post-block')} value={paginationPrevLabel} onChange={val => setAttributes({ paginationPrevLabel: val })} />

			<TextControl className='mt20' label={__('Next Label:', 'advanced-post-block')} value={paginationNextLabel} onChange={val => setAttributes({ paginationNextLabel: val })} />
		</>}


		<ColorsControl label={__('Colors', 'advanced-post-block')} value={paginationColors} onChange={val => setAttributes({ paginationColors: val })} defaults={{ color: '#fff', bg: primaryColor }} />

		<ColorsControl label={__('Active/Hover Colors', 'advanced-post-block')} value={paginationHovColors} onChange={val => setAttributes({ paginationHovColors: val })} defaults={{ color: '#fff', bg: titleColor }} />

		<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} value={paginationPadding} onChange={val => setAttributes({ paginationPadding: val })} defaults={{ vertical: '8px', horizontal: '15px' }} />

		<UnitControl className='mt20' label={__('Space Between:', 'advanced-post-block')} labelPosition='left' value={paginationSpacing} onChange={val => setAttributes({ paginationSpacing: val })} units={[pxUnit(), emUnit()]} />

		<Notice status='premium' isIcon={true}>{__('Infinity Scroll and the Load More button are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default Pagination;
