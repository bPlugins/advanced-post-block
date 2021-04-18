import PostMetaAuthor from './PostMetaAuthor';
import PostMetaDate from './PostMetaDate';
import PostMetaCategory from './PostMetaCategory';
import PostMetaComment from './PostMetaComment';

const PostMeta = ({ atts, post }) => {
    const { contentAlign, isMeta, metaFontSize, metaTransform, metaTextColor, metaMB } = atts;

    const metaStyle = { textAlign: contentAlign, fontSize: `${metaFontSize}px`, textTransform: metaTransform, color: metaTextColor, margin: `0 0 ${metaMB}px 0` }

    return (
        'true' == isMeta && <div className="bBlocksPostMeta" style={metaStyle}>
            <PostMetaAuthor atts={atts} post={post} />
            <PostMetaDate atts={atts} post={post} />
            <PostMetaCategory atts={atts} post={post} />
            <PostMetaComment atts={atts} post={post} />
        </div>
    );
};
export default PostMeta;