import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

import { truncate } from '../../../utils/functions';
import { prefix } from '../../../utils/data';

const Excerpt = ({ post, attributes }) => {
	const { excerpt: postExcerpt, content } = post;

	const { isExcerpt, isExcerptFromContent = false, excerptLength, excerpt = {} } = attributes;
	const { from = 'excerpt' } = excerpt || {};

	const finalExcerpt = ('content' === from || isExcerptFromContent)
		? content
		: postExcerpt;

	const excerptContent = truncate(finalExcerpt, {
		type: 'word',
		value: excerptLength
	});

	return (isExcerpt && finalExcerpt) ? <div className={`${prefix}Excerpt ${prefix}InnerContent`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(excerptContent) }} /> : null;
};
export default Excerpt;