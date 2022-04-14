import { Dashicon } from '@wordpress/components';

// Functions
import { renderHTML } from '../Const/functions';

const PostMetaCategory = props => {
	const { atts: { isMetaCategory, metaCategoryIn }, post: { wbCategories } } = props;

	return isMetaCategory && 'content' === metaCategoryIn && wbCategories ? <span>
		<Dashicon icon='category' />&nbsp;
		{renderHTML(wbCategories.coma)}
	</span> : null;
};
export default PostMetaCategory;