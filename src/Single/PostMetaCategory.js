import { renderHTML } from '../utils/functions';

const PostMetaCategory = ({ post, attributes }) => {
	const { categories } = post;
	const { isMetaCategory, metaCategoryIn } = attributes;

	return (isMetaCategory && 'content' === metaCategoryIn) ? <span>
		<span className='dashicons dashicons-category' />

		{renderHTML(categories.coma)}
	</span> : null;
};
export default PostMetaCategory;