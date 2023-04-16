const PostMetaComment = ({ post, attributes }) => {
	const { link, commentCount } = post;
	const { isMetaComment } = attributes;

	return isMetaComment ? <span>
		<span className='dashicons dashicons-admin-comments' />

		<a href={`${link}/#comments`} target='_blank' rel='noreferrer'>{commentCount}</a>
	</span> : null;
};
export default PostMetaComment;