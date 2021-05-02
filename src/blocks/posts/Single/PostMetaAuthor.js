import { Dashicon } from '@wordpress/components';

const PostMetaAuthor = props => {
    const { atts: { isMetaAuthor, metaLinkColor, metaIconColor }, post: { wbAuthor } } = props;

    return (
        'true' == isMetaAuthor ? <span>
            <Dashicon icon='admin-users' style={{ color: metaIconColor }} />&nbsp;

            {wbAuthor && <a href={wbAuthor.link} target='_blank' rel='noreferrer' style={{ color: metaLinkColor }}>{wbAuthor.name}</a>}
        </span> : null
    );
};
export default PostMetaAuthor;