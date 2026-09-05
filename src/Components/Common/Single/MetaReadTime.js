import MetaImage from './MetaImage';

const MetaReadTime = ({ post, attributes, separatorEl }) => {
	const { readTime } = post;

	const { isMetaReadTime, metaReadTimeLabel } = attributes;

	// Seconds are a premium-only display, so only the minute count is rendered here.
	const readTimeText = readTime?.min;

	return isMetaReadTime ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='readTime' />

			<span>{readTimeText} {metaReadTimeLabel}</span>
		</span>
	</> : null;
};
export default MetaReadTime;
