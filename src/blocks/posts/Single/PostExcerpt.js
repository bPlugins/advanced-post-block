// Functions
import func from '../../../Const/functions';
const { truncate, renderHTML } = func;

const PostExcerpt = props => {
    const { atts: { isExcerpt, excerptLength, excerptAlign, excerptColor, excerptMB }, post: { content } } = props;

    const excerptStyle = { textAlign: excerptAlign, color: excerptColor, margin: `0 0 ${excerptMB}px 0` }

    return (
        'true' == isExcerpt ? <div className='bBlocksPostExcerpt b_blocks_inner_content' style={excerptStyle}>{renderHTML(truncate(content.rendered, excerptLength))}</div> : null
    );
};
export default PostExcerpt;