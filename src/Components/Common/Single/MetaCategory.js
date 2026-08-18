import { renderHTML } from '../../../utils/functions';
import MetaImage from './MetaImage';

const MetaCategory = ({ post, attributes, separatorEl }) => {
	const { categories } = post;

	const { isMetaCategory, metaCategoryIn } = attributes;

	return (isMetaCategory && 'content' === metaCategoryIn && categories.coma) ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='category' />

			{renderHTML(categories.coma)}
		</span>
	</> : null;
};
export default MetaCategory;