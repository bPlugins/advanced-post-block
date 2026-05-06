import TitleMeta from '../Single/TitleMeta';
import MetaCategoryBadge from '../Single/MetaCategoryBadge';
import ReadMore from '../Single/ReadMore';
import { classNames } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const Overlay = ({ post, attributes, postClass }) => {
	const { title, thumbnail: { url: thumbUrl } } = post;

	const { subLayout } = attributes;

	const className = classNames(postClass, `${prefix}Overlay`, {
		[`${prefix}OverlayHover`]: 'overlay-content-hover' === subLayout && thumbUrl,
		[`${prefix}OverlayBox`]: 'overlay-box' === subLayout || 'overlay-content-box' === subLayout,
		[`${prefix}OverlayHalfContent`]: 'overlay-half-content' === subLayout
	});

	return <article className={className}>
		{thumbUrl && <img src={thumbUrl} alt={title} />}

		<div className={`${prefix}Text`}>
			<MetaCategoryBadge post={post} attributes={attributes} location='aboveContent' />

			<TitleMeta post={post} attributes={attributes} />

			{'overlay-box' !== subLayout && 'overlay-half-content' !== subLayout && <>
				<ReadMore post={post} attributes={attributes} />
			</>}
		</div>
	</article>;
};

export default Overlay;