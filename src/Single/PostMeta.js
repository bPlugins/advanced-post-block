import PostMetaAuthor from './PostMetaAuthor';
import PostMetaDate from './PostMetaDate';
import PostMetaCategory from './PostMetaCategory';
import PostMetaComment from './PostMetaComment';

const PostMeta = ({ post, attributes }) => {
	const { isMeta } = attributes;

	return isMeta && <div className='apbPostMeta'>
		<PostMetaAuthor post={post} attributes={attributes} />
		<PostMetaDate post={post} attributes={attributes} />
		<PostMetaCategory post={post} attributes={attributes} />
		<PostMetaComment post={post} attributes={attributes} />
	</div>;
};
export default PostMeta;