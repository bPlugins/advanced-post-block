import { Fragment } from '@wordpress/element';

// Components
import FeatureImage from '../Single/FeatureImage';
import PostTitle from '../Single/PostTitle';
import PostExcerpt from '../Single/PostExcerpt';
import PostReadMore from '../Single/PostReadMore';
import PostMeta from '../Single/PostMeta';

const Default = ({ post, attributes }) => {
	const { id } = post;
	const { layout, subLayout } = attributes;

	return <article className={`apbPost apbPost-${id} apbPostDefault ${'slider' === layout ? 'swiper-slide' : ''}`}>
		<FeatureImage atts={attributes} post={post} />

		<div className='apbPostText'>
			<PostTitle atts={attributes} post={post} />

			<PostMeta atts={attributes} post={post} />

			{'title-meta' !== subLayout && <Fragment>
				<PostExcerpt atts={attributes} post={post} />
				<PostReadMore atts={attributes} post={post} />
			</Fragment>}
		</div>
	</article>;
};
export default Default;