import MetaImage from './MetaImage';

const MetaAuthor = ({ post, attributes, separatorEl }) => {
	const { author } = post;
	const { name, link } = author || {};

	const { isMetaAuthor, isMetaAuthorLink = true } = attributes;

	return (isMetaAuthor && name) ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='author' />

			{!isMetaAuthorLink ?
				<span>{name}</span> :
				<a href={link} target='_blank' rel='noreferrer' aria-label={name}>{name}</a>}
		</span>
	</> : null;
};
export default MetaAuthor;