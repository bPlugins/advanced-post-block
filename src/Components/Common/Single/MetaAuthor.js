import MetaImage from './MetaImage';

const MetaAuthor = ({ post, attributes }) => {
	const { author } = post;
	const { name } = author || {};

	const { isMetaAuthor } = attributes;

	return (isMetaAuthor && name) ? <span className='metaItem'>
		<MetaImage item='author' />

		<span>{name}</span>
	</span> : null;
};
export default MetaAuthor;