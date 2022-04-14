// Functions
import { truncate, renderHTML } from '../Const/functions';

const PostExcerpt = props => {
	const { atts: { isExcerpt, excerptLength }, post: { excerpt, content } } = props;

	const renderContent = excerpt ? excerpt?.rendered : content?.rendered;

	return isExcerpt ? <div className='apbPostExcerpt apbInnerContent'>{renderHTML(truncate(renderContent, excerptLength))}</div> : null;
};
export default PostExcerpt;