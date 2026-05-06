import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

import { prefix } from '../../../utils/data';

const Title = ({ post, attributes }) => {
	const { link, title: postTitle } = post;

	const { isTitle, isTitleLink, isLinkNewTab, title = {} } = attributes;
	const { tag: Tag = 'h3' } = title || {};

	return isTitle ? <>
		{isTitleLink ?
			<Tag className={`${prefix}Title`}>
				<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' dangerouslySetInnerHTML={{ __html: sanitizeHTML(postTitle) }} aria-label={postTitle} />
			</Tag> :
			<Tag className={`${prefix}Title`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(postTitle) }} />}
	</> : null;
};
export default Title;