import { Dashicon } from '@wordpress/components';

// Functions
import { renderHTML } from '../utils/functions';

const PostMetaCategory = props => {
	const { atts: { isMetaCategory, metaCategoryIn }, post: { wbCategories } } = props;

	return isMetaCategory && 'content' === metaCategoryIn && wbCategories ? <span>
		<Dashicon icon='category' />

		{renderHTML(wbCategories.coma)}
	</span> : null;
};
export default PostMetaCategory;