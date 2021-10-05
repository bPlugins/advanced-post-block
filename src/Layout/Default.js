import { Fragment } from '@wordpress/element';

// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Default = ({ atts, post }) => {
    const { layout, subLayout } = atts;
    const { id } = post;

    return <article className={`apbPost apbPost-${id} apbPostDefault ${'slider' === layout ? 'swiper-slide' : ''}`}>
        <FeatureImage atts={atts} post={post} />

        <div className='apbPostText'>
            <PostTitle atts={atts} post={post} />

            <PostMeta atts={atts} post={post} />

            {'title-meta' !== subLayout && <Fragment>
                <PostExcerpt atts={atts} post={post} />
                <PostReadMore atts={atts} post={post} />
            </Fragment>}
        </div>
    </article>;
};
export default Default;