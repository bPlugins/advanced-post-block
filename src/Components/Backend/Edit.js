import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { tabController } from '../../../../bpl-tools/utils/functions';
import { crownIcon } from '../../../../bpl-tools/utils/icons';

import Settings from './Settings/Settings';
import APBPosts from './APBPosts';
import { layouts } from '../../utils/options';
import { pricingUrl } from '../../utils/data';

const Edit = props => {
	const { attributes, setAttributes, isSelected } = props;
	const { layout, subLayout, columns } = attributes;
	const blockProps = useBlockProps();

	useEffect(() => tabController(), [isSelected]);

	return <>
		{layout && <Settings {...{ attributes, setAttributes }} />}

		<div {...blockProps}>
			{!layout ?
				<div className='apbLayoutSelector'>
					<h2>{__('Select/Choose Preferred Posts Layout', 'advanced-post-block')}</h2>

					<div className='apbLayouts'>
						{layouts?.map(item => {
							const { label, value, icon } = item;

							return <div key={value} className='apbLayout' onClick={() => {
								setAttributes({
									layout: value,
									subLayout: (['slider', 'ticker'].includes(value) && ['default', 'title-meta'].includes(subLayout)) || ('ticker' === value && 'overlay-half-content' === subLayout) ? 'left-image' : subLayout,
									columns: ['slider', 'ticker'].includes(value) ? { ...columns, desktop: 2 } : columns
								});
							}}>
								<span className='proBadge'>Pro</span>

								{icon}

								<div className='label'>{label}</div>
							</div>
						})}
					</div>

					<p>{__('If you already added the block before and don\'t know what was selected then select the Grid layout', 'advanced-post-block')}</p>

					<div className='proLayoutsNotice'>
						{crownIcon}
						<p>
							{__('Grid 1, Magazine 1, and Magazine 2 layouts are available in the', 'advanced-post-block')} <a href={pricingUrl} target='_blank' rel='noopener noreferrer'>{__('PREMIUM VERSION', 'advanced-post-block')}</a>
						</p>
					</div>
				</div> :
				<APBPosts {...{ attributes, id: blockProps.id }} />
			}
		</div>
	</>
}
export default Edit;
