import { withSelect } from '@wordpress/data';

import { HelpPanel } from '../../../../../bpl-tools/Components';

import { shortCodePostType } from '../../../utils/data';
import NewsTickerOptions from './General/SubLayouts/NewsTickerOptions';
import TickerOptions from './General/SubLayouts/TickerOptions';
import SliderOptions from './General/SubLayouts/SliderOptions';
import AccordionOptions from './General/SubLayouts/AccordionOptions';
import Pagination from './General/Pagination';
import Layout from './General/Layout';
import PostsQuery from './General/PostsQuery';

const General = ({ attributes, setAttributes, updateObj, device, postTypes, allTaxonomies }) => {
	const { layout, isPostsPerPageAll } = attributes;

	const isSlider = 'slider' === layout;
	const isTicker = 'ticker' === layout;
	const isNewsTicker = 'newsTicker' === layout;
	const isAccordion = 'accordion' === layout;

	const props = { attributes, setAttributes, updateObj }

	return <>
		<HelpPanel slug='advanced-post-block' docsLink='https://bplugins.com/docs/advanced-post-block' />

		<Layout {...props} device={device} />

		<PostsQuery {...props} postTypes={postTypes} allTaxonomies={allTaxonomies} />

		{!isSlider && !isTicker && !isNewsTicker && !isPostsPerPageAll ? <Pagination {...props} /> : ''}

		{isSlider && <SliderOptions {...props} />}

		{isTicker && <TickerOptions />}

		{isNewsTicker && <NewsTickerOptions />}

		{isAccordion && <AccordionOptions {...props} />}
	</>
}

export default withSelect((select, { attributes }) => {
	const { getPostTypes, getTaxonomies } = select('core');
	const { getDeviceType } = select('core/editor');

	const { postType } = attributes;
	const taxonomies = getTaxonomies({ per_page: -1 });

	return {
		device: getDeviceType()?.toLowerCase(),

		postTypes: getPostTypes({ per_page: -1 })?.filter(p => ![shortCodePostType, 'attachment', 'nav_menu_item'].includes(p.slug) && !p.slug.startsWith('wp_'))?.map(({ name, slug }) => ({ label: name, value: slug })),

		allTaxonomies: 'post' === postType ? taxonomies?.filter(tax => tax.types.includes('post')).filter(tax => tax.slug !== 'category' && tax.slug !== 'post_tag') : taxonomies?.filter(tax => tax.types.includes(postType)),
	}
})(General);