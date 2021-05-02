// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const SideImage = ({ atts, post }) => {
    const { layout, subLayout, rowGap, contentAlign, contentBGColor, postTextPTB, postTextPLR, borderColor } = atts;
    const { wbImage } = post;

    const articleStyle = { display: `${wbImage ? 'grid' : 'flex'}`, marginBottom: 'masonry' == layout ? `${rowGap}px` : '', textAlign: contentAlign, backgroundColor: contentBGColor, border: `1px solid ${borderColor}` }
    const postTextStyle = { padding: `${postTextPTB}px ${postTextPLR}px` }

    return (
        <article className={`bBlocksPostArticle bBlocksPostArticleSideImage ${'left-image' == subLayout ? 'leftImage' : 'right-image' == subLayout ? 'rightImage' : ''} ${'slider' == layout ? 'swiper-slide' : ''}`} style={articleStyle}>
            {'left-image' == subLayout && <FeatureImage atts={atts} post={post} />}

            <div className='bBlocksPostText' style={postTextStyle}>
                <PostTitle atts={atts} post={post} />

                <PostMeta atts={atts} post={post} />

                <PostExcerpt atts={atts} post={post} />
                <PostReadMore atts={atts} post={post} />
            </div>

            {'right-image' == subLayout && <FeatureImage atts={atts} post={post} />}
        </article>
    );
};
export default SideImage;