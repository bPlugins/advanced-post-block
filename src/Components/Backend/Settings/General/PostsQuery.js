import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { PanelBody, SelectControl, RangeControl, PanelRow } from '@wordpress/components';
import { Label, HelpTooltip, Notice } from '../../../../../../bpl-tools/Components';

import { postsOrdersBy, postsOrders } from '../../../../utils/options';
import AsyncTokenField from './AsyncTokenField';

const PostsQuery = ({ attributes, setAttributes, postTypes }) => {
	const { postType, taxonomyRelation = 'AND', selectedCategories = [], postsAuthors = [], postsPerPage, postsOrderBy, postsOrder } = attributes;

	return <PanelBody className='bPlPanelBody' title={__('Posts Query', 'advanced-post-block')} initialOpen={false}>
		<SelectControl label={<>{__('Post Type:', 'advanced-post-block')} <HelpTooltip text={__('Select the source for your posts (e.g., Posts, Pages).', 'advanced-post-block')} /></>} labelPosition='left' value={postType} onChange={val => setAttributes({ postType: val })} options={postTypes} />

		<Notice status='warning'>{__('If the post type is not viewable then the default post type will work.', 'advanced-post-block')}</Notice>

		<SelectControl className='mt20' label={__('Taxonomy Relation:', 'advanced-post-block')} labelPosition='left' value={taxonomyRelation} onChange={val => setAttributes({ taxonomyRelation: val })} options={[
			{ label: __('AND', 'advanced-post-block'), value: 'AND' },
			{ label: __('OR', 'advanced-post-block'), value: 'OR' }
		]} />

		{'post' === postType && <>
			<AsyncTokenField
				label={__('Select Categories:', 'advanced-post-block')}
				value={selectedCategories}
				onChange={ids => setAttributes({ selectedCategories: ids })}
				apiPath="/wp/v2/categories"
			/>
		</>}

		<AsyncTokenField
			label={__('Select Authors:', 'advanced-post-block')}
			value={postsAuthors || []}
			onChange={ids => setAttributes({ postsAuthors: ids })}
			apiPath="/wp/v2/users?who=authors"
		/>

		<Label>{__('Post Per Page:', 'advanced-post-block')}</Label>
		<RangeControl value={postsPerPage} onChange={val => setAttributes({ postsPerPage: val, isPostsPerPageAll: -1 === val })} min={-1} max={36} step={1} />
		<Notice status='warning'>{__('To show all posts set -1, and do not set 0', 'advanced-post-block')}</Notice>

		<PanelRow className='gap5 mt20'>
			<Label className=''>
				{__('Post Order By:', 'advanced-post-block')}
				<HelpTooltip text={__("Order posts by the IDs specified in the 'Include Posts' field when 'Post In' is selected.", 'advanced-post-block')} />
			</Label>
			<SelectControl value={postsOrderBy} onChange={val => setAttributes({ postsOrderBy: val })} options={postsOrdersBy} />
		</PanelRow>

		<PanelRow className='gap5 mt20'>
			<Label className=''>{__('Post Order:', 'advanced-post-block')}</Label>
			<SelectControl value={postsOrder} onChange={val => setAttributes({ postsOrder: val })} options={postsOrders} />
		</PanelRow>

		<Notice status='premium' isIcon={true}>{__('Custom post types, taxonomy filtering, advanced sorting, offset, and precise post inclusion/exclusion are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default PostsQuery;
