import { sprintf, _n } from '@wordpress/i18n';
import MetaImage from './MetaImage';

const MetaViewCount = ({ post, attributes, separatorEl }) => {
	const { views = 0 } = post;

	const { meta = {} } = attributes;
	const { viewCount: { isVisible } = {} } = meta || {};

	return isVisible ? <>
		{separatorEl}
		<span className='metaItem'>
			<MetaImage item='viewCount' />

			<span>{sprintf( /* translators: %s: Number of post views. */ _n('%s View', '%s Views', Number(views) || 0, 'advanced-post-block'), views)}</span>
		</span>
	</> : null;
};
export default MetaViewCount;
