import { Dashicon } from '@wordpress/components';

const PostMetaAuthor = props => {
    const { atts: { isMetaAuthor }, post: { wbAuthor } } = props;

    return isMetaAuthor ? <span>
        <Dashicon icon='admin-users' />&nbsp;

        {wbAuthor && <a href={wbAuthor.link} target='_blank' rel='noreferrer'>{wbAuthor.name}</a>}
    </span> : null;
};
export default PostMetaAuthor;