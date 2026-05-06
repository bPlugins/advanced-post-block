import MetaImage from './MetaImage';

const PostMetaDate = ({ post, attributes }) => {
	const { date } = post;

	const { isMetaDate } = attributes;

	const displayDate = date;

	return (isMetaDate && date) ? <span className='metaItem'>
		<MetaImage item='date' />

		<span>{displayDate}</span>
	</span> : null;
};
export default PostMetaDate;