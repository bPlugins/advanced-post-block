import PostMetaAuthor from './PostMetaAuthor';
import PostMetaDate from './PostMetaDate';
import PostMetaCategory from './PostMetaCategory';
import PostMetaComment from './PostMetaComment';

const PostMeta = ({ atts, post }) => {
	const { isMeta } = atts;

	return isMeta && <div className='apbPostMeta'>
		<PostMetaAuthor atts={atts} post={post} />
		<PostMetaDate atts={atts} post={post} />
		<PostMetaCategory atts={atts} post={post} />
		<PostMetaComment atts={atts} post={post} />
	</div>;
};
export default PostMeta;