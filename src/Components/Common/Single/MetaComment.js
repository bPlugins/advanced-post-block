import MetaImage from './MetaImage';

const MetaComment = ({ post, attributes }) => {
	const { link, title, commentCount, commentStatus } = post;

	const { isMetaComment } = attributes;

	return (isMetaComment && 'open' === commentStatus) ? <span className='metaItem'>
		<MetaImage item='comment' />

		<a href={`${link}/#comments`} target='_blank' rel='noreferrer' aria-label={`Comments of ${title}`}>{commentCount}</a>
	</span> : null;
};
export default MetaComment;