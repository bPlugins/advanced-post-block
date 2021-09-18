import { Dashicon } from '@wordpress/components';

const PostMetaComment = props => {
    const { atts: { isMetaComment }, post: { link, wbComment } } = props;

    return isMetaComment ? <span>
        <Dashicon icon='admin-comments' />&nbsp;
        <a href={`${link}#comments`} target='_blank' rel='noreferrer'>{wbComment}</a>
    </span> : null;
};
export default PostMetaComment;