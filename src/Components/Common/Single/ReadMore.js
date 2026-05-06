import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

import { prefix } from '../../../utils/data';

const ReadMore = ({ post, attributes }) => {
	const { link } = post;

	const { isReadMore, readMoreLabel, isLinkNewTab, readMore = {} } = attributes;
	const { icon } = readMore || {};

	const isSvgIcon = icon && icon.startsWith('<svg');

	const iconEl = icon ? (isSvgIcon ? <span
		className={`${prefix}ReadMoreIcon`}
		dangerouslySetInnerHTML={{ __html: icon }}
	/> : <img
		src={icon}
		alt=''
		className={`${prefix}ReadMoreIcon`}
	/>) : null;

	return isReadMore ? <div className={`${prefix}ReadMore`}>
		<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' aria-label={readMoreLabel}>
			<span dangerouslySetInnerHTML={{ __html: sanitizeHTML(readMoreLabel) }} />
			{iconEl}
		</a>
	</div> : null;
};
export default ReadMore;