import { prefix } from '../../../utils/data';
import MetaCategoryBadge from './MetaCategoryBadge';

const FeatureImage = ({ post, attributes }) => {
	const { link, thumbnail = {} } = post;
	const { url, alt } = thumbnail || {};

	const { isFImg, isFImgLink, isLinkNewTab } = attributes;

	return (isFImg && url) ? <figure className={`${prefix}Thumb`}>
		{isFImgLink ? <a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' aria-label={alt}>
			<img src={url} alt={alt} />
		</a> : <img src={url} alt={alt} />}

		<MetaCategoryBadge post={post} attributes={attributes} location='image' />
	</figure> : null;
};
export default FeatureImage;