import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

import { truncate } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const Title = ({ post, attributes }) => {
	const { link, title: postTitle } = post;

	const { isTitle, isTitleLink, isLinkNewTab, title = {} } = attributes;
	const { tag: Tag = 'h3', limit: titleLimit = {} } = title || {};

	const truncatedTitle = truncate(postTitle, titleLimit);

	return isTitle ? <>
		{isTitleLink ?
			<Tag className={`${prefix}Title`}>
				<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' dangerouslySetInnerHTML={{ __html: sanitizeHTML(truncatedTitle) }} aria-label={postTitle} />
			</Tag> :
			<Tag className={`${prefix}Title`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(truncatedTitle) }} />}
	</> : null;
};
export default Title;