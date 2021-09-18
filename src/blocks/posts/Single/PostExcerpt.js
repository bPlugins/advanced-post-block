// Functions
import func from '../../../Const/functions';
const { truncate, renderHTML } = func;

const PostExcerpt = props => {
    const { atts: { isExcerpt, excerptLength }, post: { content } } = props;

    return isExcerpt ? <div className='apbPostExcerpt apbInnerContent'>{renderHTML(truncate(content.rendered, excerptLength))}</div> : null;
};
export default PostExcerpt;