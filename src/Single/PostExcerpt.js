import { truncate } from '../utils/functions';

const PostExcerpt = ({ post, attributes }) => {
	const { excerpt, content } = post;
	const { isExcerpt, isExcerptFromContent, excerptLength } = attributes;

	const renderContent = !isExcerptFromContent && excerpt ? excerpt : content;

	return isExcerpt ? <div className='apbPostExcerpt apbInnerContent' dangerouslySetInnerHTML={{ __html: truncate(renderContent, excerptLength) }} /> : null;
};
export default PostExcerpt;