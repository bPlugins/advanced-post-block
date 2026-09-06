import { __ } from '@wordpress/i18n';
import { renderToString } from '@wordpress/element';
import { PanelBody, ToggleControl, SelectControl, Button, ButtonGroup, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { Label, HelpTooltip, Notice } from '../../../../../../../bpl-tools/Components';
import { pxUnit, emUnit, remUnit } from '../../../../../../../bpl-tools/utils/options';

import { accordionThemes, accordionIconPositions, accordionIndicatorIcons } from '../../../../../utils/options';
import { accordionThemeSwitch } from '../../../../../utils/switcher';

const AccordionOptions = ({ attributes, setAttributes }) => {
	const { accordion = {} } = attributes;
	const { theme = 'classic', firstOpen = true, showIcon = true, iconPosition = 'right', indicatorIconUp = '', indicatorIconDown = '', maxWidth = {} } = accordion || {};

	const setAccordion = obj => setAttributes({ accordion: { ...accordion, ...obj } });

	return <PanelBody className='bPlPanelBody apbAccordionOptions' title={__('Accordion Options', 'advanced-post-block')} initialOpen={false}>
		<UnitControl className='mb20' label={<>
			{__('Max Width:', 'advanced-post-block')}
			<HelpTooltip text={__('Cap the accordion width and center it. Leave empty for full width.', 'advanced-post-block')} />
		</>} labelPosition='left' value={maxWidth?.desktop} onChange={val => setAccordion({ maxWidth: { ...maxWidth, desktop: val } })} units={[pxUnit(), emUnit(), remUnit()]} />

		<SelectControl className='mt20' label={<>
			{__('Theme:', 'advanced-post-block')}
			<HelpTooltip text={__('Pick a preset accordion style. Colors, border, background, shadow and typography stay driven by the standard controls.', 'advanced-post-block')} />
		</>} labelPosition='left' value={theme} onChange={val => setAttributes({ accordion: { ...accordion, theme: val }, ...accordionThemeSwitch(val, attributes) })} options={accordionThemes} />

		<ToggleControl className='mt15' label={__('Open First Item By Default', 'advanced-post-block')} checked={firstOpen} onChange={val => setAccordion({ firstOpen: val })} />

		<ToggleControl className='mt10' label={__('Show Expand Icon', 'advanced-post-block')} checked={showIcon} onChange={val => setAccordion({ showIcon: val })} />

		{showIcon && <>
			<SelectControl className='mt20' label={__('Icon Position:', 'advanced-post-block')} labelPosition='left' value={iconPosition} onChange={val => setAccordion({ iconPosition: val })} options={accordionIconPositions} />

			<Label className='mt20'>{__('Indicator Icon:', 'advanced-post-block')} <HelpTooltip text={__('First icon shows when open, second when closed.', 'advanced-post-block')} /></Label>
			<ButtonGroup className='bPlBtnGroup'>
				{accordionIndicatorIcons.map((option, i) => {
					const up = renderToString(option.value[0]);
					const down = renderToString(option.value[1]);
					const isActive = indicatorIconUp === up && indicatorIconDown === down;

					return <Button key={i} label={option.label} showTooltip variant={isActive ? 'primary' : ''} onClick={() => setAccordion({ indicatorIconUp: up, indicatorIconDown: down })}>
						<span className='apbAccIndicatorPreview'>{option.value[0]}{option.value[1]}</span>
					</Button>;
				})}
			</ButtonGroup>
		</>}

		<Notice className='mt20' status='premium' isIcon={true}>{__('More themes (Thumbnail, Numbered FAQ, Split Panel, Minimal Lines), multiple open panels, animation speed, more indicator icons, and hover animations are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
}
export default AccordionOptions;
