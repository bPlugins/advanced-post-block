const PostMetaDate = ({ post, attributes }) => {
	const { date } = post;
	const { isMetaDate } = attributes;

	return isMetaDate ? <span>
		<span className='dashicons dashicons-calendar-alt' />

		<span>{date}</span>
	</span> : null;
};
export default PostMetaDate;