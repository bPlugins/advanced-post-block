const { Fragment } = wp.element;

// Components
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Overlay = ({ atts, post }) => {
    const { layout, subLayout, rowGap, isFImg, contentAlign, contentBGColor, postTextPTB, postTextPLR, borderColor } = atts;
    const { wbImage } = post;

    const articleStyle = { backgroundImage: `url(${'true' === isFImg && wbImage ? wbImage.full[0] : null})`, marginBottom: 'masonry' == layout ? `${rowGap}px` : '', border: `1px solid ${borderColor}` }
    const postTextStyle = { backgroundColor: contentBGColor, padding: `${postTextPTB}px ${postTextPLR}px`, alignItems: `${'left' == contentAlign ? 'flex-start' : 'right' == contentAlign ? 'flex-end' : 'centre' == contentAlign ? 'center' : ''}` }

    return (
        <article className={`bBlocksPostArticle bBlocksPostArticleOverlay ${'overlay-content-hover' == subLayout && wbImage ? 'bBlocksPostArticleOverlayHover' : ''} ${'overlay-box' == subLayout ? 'bBlocksPostArticleOverlayBox' : ''} ${'slider' == layout ? 'swiper-slide' : ''}`} style={articleStyle}>
            <div className="bBlocksPostText" style={postTextStyle}>
                <PostTitle atts={atts} post={post} />

                <PostMeta atts={atts} post={post} />

                {'overlay-box' != subLayout && <Fragment>
                    <PostExcerpt atts={atts} post={post} />
                    <PostReadMore atts={atts} post={post} />
                </Fragment>}
            </div>
        </article>
    );
};

export default Overlay;