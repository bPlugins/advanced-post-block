const { Fragment } = wp.element;

// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Default = ({ atts, post }) => {
    const { layout, subLayout, rowGap, contentAlign, contentBGColor, postTextPTB, postTextPLR, borderColor } = atts;

    const articleStyle = { marginBottom: 'masonry' == layout ? `${rowGap}px` : '', textAlign: contentAlign, backgroundColor: contentBGColor, border: `1px solid ${borderColor}` }
    const postTextStyle = { padding: `${postTextPTB}px ${postTextPLR}px` }

    return (
        <article className={`bBlocksPostArticle bBlocksPostArticleDefault ${'slider' == layout ? 'swiper-slide' : ''}`} style={articleStyle}>
            <FeatureImage atts={atts} post={post} />

            <div className="bBlocksPostText" style={postTextStyle}>
                <PostTitle atts={atts} post={post} />

                <PostMeta atts={atts} post={post} />

                {'title-meta' != subLayout && <Fragment>
                    <PostExcerpt atts={atts} post={post} />
                    <PostReadMore atts={atts} post={post} />
                </Fragment>}
            </div>
        </article>
    );
};
export default Default;