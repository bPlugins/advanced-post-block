import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { FrontShortCode, AdvertiseCard, ProModal } from '../../../../../bpl-tools/ProControls';
import { tabController, updateData } from '../../../../../bpl-tools/utils/functions';

import General from './General';
import Elements from './Elements';
import Style from './Style';
import { generalStyleTabs } from '../../../utils/options';
import { pricingUrl, shortCodePostType } from '../../../utils/data';

const Settings = ({ attributes, setAttributes, isProModalOpen, setIsProModalOpen, taxOfPostType, currentPostType, currentPostId }) => {
	const { contentAlign } = attributes;

	// Set max excerpt length
	// const [maxExcerptLength, setMaxExcerptLength] = useState(50);
	// useEffect(() => {
	// 	const allMaxExcerptLength = [];
	// 	posts?.map(post => {
	// 		allMaxExcerptLength.push(post?.excerpt?.replace(/(<p class='?"?read-more'?"?(.*?)<\/p>)/g, '').trim().split(' ').length);

	// 		setMaxExcerptLength(Math.max(...allMaxExcerptLength));
	// 	});
	// }, [posts]);

	const updateObj = (key, val, ...props) => {
		setAttributes({ [key]: updateData(attributes[key], val, ...props) });
	}

	const props = {
		attributes,
		setAttributes,
		updateObj
	}

	return <>
		<InspectorControls>
			{currentPostType === shortCodePostType && <div className='bPlInspectorInfo'>
				<FrontShortCode postType={shortCodePostType} shortCode={`[${shortCodePostType} id=${currentPostId}]`} />
			</div>}

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={() => tabController()}>{tab => <>
				{'general' === tab.name && <General {...props} />}

				{'elements' === tab.name && <Elements {...props} taxOfPostType={taxOfPostType} />}

				{'style' === tab.name && <Style {...props} />}
			</>}</TabPanel>


			<AdvertiseCard planLink={pricingUrl} />
		</InspectorControls>


		<ProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link={pricingUrl} title={__('Unlock More with<br/>Advanced Post Block Pro!', 'advanced-post-block')} description={__(`The free features of Plugin do a lot-still, without PRO, you're holding yourself back from getting more.`, 'advanced-post-block')} features={[
			'More Layouts: Grid 1, Magazine 1, and Magazine 2 layouts.',
			'Display from posts, pages, or custom posts.',
			'Advanced Query: Presets, Tags, and Filters.',
			'Display Post View and Reading Time and Custom Taxonomies.',
			'Flexible pagination and infinity loading.',
			'Image Grayscale, Lazy Loading, and Default Image.'
		]}></ProModal>


		<BlockControls>
			<AlignmentToolbar value={contentAlign} onChange={val => setAttributes({ contentAlign: val })} />
		</BlockControls>
	</>;
};
export default withSelect((select, { attributes }) => {
	const { postType } = attributes;

	const { getTaxonomies } = select('core');
	const { getDeviceType, getCurrentPostId, getCurrentPostType } = select('core/editor');

	const taxonomies = getTaxonomies({ per_page: -1 });
	const taxOfPostType = taxonomies?.filter(tax => tax.types.includes(postType) && tax.slug !== 'category')
		?.map(({ name, slug, rest_base }) => ({ name, slug, rest_base }));

	return {
		device: getDeviceType()?.toLowerCase(),

		currentPostId: getCurrentPostId(),

		currentPostType: getCurrentPostType(),

		taxOfPostType
	}
})(Settings);