import { __ } from '@wordpress/i18n';
import { PanelBody, TabPanel, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { ColorsControl, ColorControl, Typography } from '../../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { updateData } from '../../../../../../bpl-tools/utils/functions';
import { pxUnit, emUnit } from '../../../../../../bpl-tools/utils/options';

import { fillFilter, filterStyleDefaults, supportsFilter } from '../../../../utils/filter';

const stateTabs = [
	{ name: 'normal', title: __('Normal', 'advanced-post-block') },
	{ name: 'hover', title: __('Hover', 'advanced-post-block') },
	{ name: 'active', title: __('Active', 'advanced-post-block') }
];

const FilterOptions = ({ attributes, setAttributes }) => {
	const { layout, frontendFilter } = attributes;

	const filter = fillFilter(frontendFilter);
	const { enabled, styles } = filter;
	const { gap, marginBottom, typo, labelColor, item, resultCountColor, resetColor } = styles;
	const defaults = filterStyleDefaults;

	if (!enabled || !supportsFilter(layout)) return null;

	const update = (val, ...path) => setAttributes({ frontendFilter: updateData(filter, val, 'styles', ...path) });

	return <PanelBody className='bPlPanelBody' title={__('Frontend Filter', 'advanced-post-block')} initialOpen={false}>
		<Typography value={typo} onChange={val => update(val, 'typo')} defaults={{ fontSize: { desktop: 14, tablet: 14, mobile: 14 }, fontWeight: 500 }} />

		<UnitControl className='mt20' label={__('Space Between Filters:', 'advanced-post-block')} labelPosition='left' value={gap} onChange={val => update(val, 'gap')} units={[pxUnit(), emUnit()]} />

		<UnitControl className='mt20' label={__('Space to the Posts:', 'advanced-post-block')} labelPosition='left' value={marginBottom} onChange={val => update(val, 'marginBottom')} units={[pxUnit(), emUnit()]} />

		<ColorControl className='mt20' label={__('Label Color:', 'advanced-post-block')} value={labelColor} onChange={val => update(val, 'labelColor')} defaultColor={defaults.labelColor} />


		<h3 className='mt20'>{__('Pills', 'advanced-post-block')}</h3>

		<TabPanel className='bPlTabPanel small' activeClass='activeTab' tabs={stateTabs}>{tab => <>
			{'normal' === tab.name && <>
				<ColorsControl className='mt10' label={__('Colors:', 'advanced-post-block')} value={item.colors} onChange={val => update(val, 'item', 'colors')} defaults={defaults.item.colors} />

				<BorderControl className='mt10' label={__('Border:', 'advanced-post-block')} value={item.border} onChange={val => update(val, 'item', 'border')} defaults={defaults.item.border} />
			</>}

			{'hover' === tab.name && <ColorsControl className='mt10' label={__('Hover Colors:', 'advanced-post-block')} value={item.hoverColors} onChange={val => update(val, 'item', 'hoverColors')} defaults={defaults.item.hoverColors} />}

			{'active' === tab.name && <>
				<ColorsControl className='mt10' label={__('Active Colors:', 'advanced-post-block')} value={item.activeColors} onChange={val => update(val, 'item', 'activeColors')} defaults={defaults.item.activeColors} />

				<ColorControl className='mt10' label={__('Active Border Color:', 'advanced-post-block')} value={item.activeBorderColor} onChange={val => update(val, 'item', 'activeBorderColor')} defaultColor={defaults.item.activeBorderColor} />
			</>}
		</>}</TabPanel>

		<SpaceControl className='mt20' label={__('Padding:', 'advanced-post-block')} value={item.padding} onChange={val => update(val, 'item', 'padding')} defaults={defaults.item.padding} />


		<h3 className='mt20'>{__('Results Line', 'advanced-post-block')}</h3>

		<ColorControl label={__('Result Count Color:', 'advanced-post-block')} value={resultCountColor} onChange={val => update(val, 'resultCountColor')} defaultColor={defaults.resultCountColor} />

		<ColorControl className='mt20' label={__('Clear Button Color:', 'advanced-post-block')} value={resetColor} onChange={val => update(val, 'resetColor')} defaultColor={defaults.resetColor} />
	</PanelBody>;
};
export default FilterOptions;
