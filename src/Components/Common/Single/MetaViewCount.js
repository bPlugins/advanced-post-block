import MetaImage from './MetaImage';

const MetaViewCount = ({ post, attributes, separatorEl }) => {
	const { views = 0 } = post;

	const { meta = {} } = attributes;
	const { viewCount: { isVisible } = {} } = meta || {};

	return isVisible ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='viewCount' />

			<span>{views} {views > 1 ? 'Views' : 'View'}</span>
		</span>
	</> : null;
};
export default MetaViewCount;
