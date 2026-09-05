import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import { PanelBody, SelectControl, RangeControl, TextControl, ToggleControl, PanelRow, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { Label, HelpTooltip, Notice, Badge } from '../../../../../../bpl-tools/Components';

import { postsOrdersBy, postsOrders } from '../../../../utils/options';
import { strToIntArr } from '../../../../utils/functions';
import AsyncTokenField from './AsyncTokenField';

const PostsQuery = ({ attributes, setAttributes, postTypes }) => {
	const { postType, taxonomyRelation = 'AND', selectedCategories = [], selectedTags, postsAuthors = [], isPostsPerPageAll, postsPerPage, postsOrderBy, postsOrder, postsOffset, postsInclude, postsExclude, isExcludeSticky } = attributes;

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

		{'post' === postType && <>
			<AsyncTokenField
				label={<>{__('Select Tags:', 'advanced-post-block')} <Badge size='regular' /></>}
				value={selectedTags || []}
				onChange={ids => setAttributes({ selectedTags: ids })}
				apiPath="/wp/v2/tags"
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

		{!isPostsPerPageAll && <>
			<NumberControl className='mt20' label={<>{__('Post Offset:', 'advanced-post-block')} <Badge size='regular' /> <HelpTooltip text={__('Number of posts to skip. This works when Posts Per Page is not set to -1.', 'advanced-post-block')} /></>} value={postsOffset} onChange={val => setAttributes({ postsOffset: parseInt(val) })} min={0} />
			<Notice>{__('`Post Offset` will not work if `Post Per Page` is -1', 'advanced-post-block')}</Notice>
		</>}

		<TextControl className='mt20' label={<>{__('Include Posts:', 'advanced-post-block')} <Badge size='regular' /> <HelpTooltip text={__('Specific post IDs to display (separated by commas).', 'advanced-post-block')} /></>} value={postsInclude?.join(',')} onChange={val => setAttributes({ postsInclude: strToIntArr(val) })} />
		<Notice>{__('Enter the posts id by coma separated Ex: `23,45,16`', 'advanced-post-block')}</Notice>

		<TextControl className='mt20' label={<>{__('Exclude Posts:', 'advanced-post-block')} <Badge size='regular' /> <HelpTooltip text={__('Post IDs to skip (separated by commas).', 'advanced-post-block')} /></>} value={postsExclude?.join(',')} onChange={val => setAttributes({ postsExclude: strToIntArr(val) })} />
		<Notice>{__('Enter the posts id by coma separated Ex: `23,45,16`', 'advanced-post-block')}</Notice>

		<ToggleControl className='mt20' label={<>{__('Exclude Sticky Posts', 'advanced-post-block')} <HelpTooltip text={__('Completely remove sticky posts from the results.', 'advanced-post-block')} /></>} checked={isExcludeSticky} onChange={val => setAttributes({ isExcludeSticky: val })} />

		<Notice status='premium' isIcon={true}>{__('Query presets, custom taxonomy filtering, search queries, advanced sorting, and excluding the current post are available in the Premium version.', 'advanced-post-block')}</Notice>
	</PanelBody>
};
export default PostsQuery;
