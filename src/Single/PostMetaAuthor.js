const PostMetaAuthor = ({ post, attributes }) => {
	const { author } = post;
	const { isMetaAuthor } = attributes;

	return isMetaAuthor ? <span>
		<span className='dashicons dashicons-admin-users' />

		<a href={author.link} target='_blank' rel='noreferrer'>{author.name}</a>
	</span> : null;
};
export default PostMetaAuthor;