import { useMemo } from 'react';

import { sanitizeHTML, sanitizeSVG, sanitizeURL } from '../../../../../bpl-tools/utils/common';

import { prefix } from '../../../utils/data';

const ReadMore = ({ post, attributes }) => {
	const { link } = post;

	const { isReadMore, readMoreLabel, isLinkNewTab, readMore = {} } = attributes;
	const { icon } = readMore || {};

	const isSvgIcon = 'string' === typeof icon && icon.trim().startsWith('<svg');

	// The icon is author-controlled markup: never inject it raw. sanitizeSVG drops
	// scripts, SMIL and on* handlers; useMemo keeps it from re-parsing per post.
	const safeSvg = useMemo(() => (isSvgIcon ? sanitizeSVG(icon) : ''), [icon, isSvgIcon]);
	const safeSrc = !isSvgIcon && icon ? sanitizeURL(icon) : null;

	const iconEl = isSvgIcon ? (safeSvg ? <span
		className={`${prefix}ReadMoreIcon`}
		dangerouslySetInnerHTML={{ __html: safeSvg }}
	/> : null) : (safeSrc ? <img
		src={safeSrc}
		alt=''
		className={`${prefix}ReadMoreIcon`}
	/> : null);

	return isReadMore ? <div className={`${prefix}ReadMore`}>
		<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' aria-label={readMoreLabel}>
			<span dangerouslySetInnerHTML={{ __html: sanitizeHTML(readMoreLabel) }} />
			{iconEl}
		</a>
	</div> : null;
};
export default ReadMore;