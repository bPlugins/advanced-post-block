import { sanitizeHTML } from '../../../../../bpl-tools/utils/common';

import { prefix } from '../../../utils/data';

const MetaCategoryBadge = ({ post, attributes, location, className = '' }) => {
	const { categories } = post;

	const { isMeta, isMetaCategory, metaCategoryIn } = attributes;

	const isShow = isMeta && isMetaCategory && categories?.space && metaCategoryIn === location;

	if (!isShow) return null;

	const finalClass = 'image' === metaCategoryIn ? 'bottomLeft' : 'aboveContent';

	return <div className={`${prefix}CatsBadge ${finalClass} ${className}`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(categories.space) }} />;
};
export default MetaCategoryBadge;