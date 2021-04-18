const { Dashicon } = wp.components;

const PostMetaAuthor = props => {
    const { atts: { isMetaAuthor, metaLinkColor, metaIconColor }, post: { author, wbAuthor } } = props;

    return (
        'true' == isMetaAuthor ? <span>
            <Dashicon icon="admin-users" style={{ color: metaIconColor }} />&nbsp;

            {wbAuthor && <a href={wbAuthor.link} target="_blank" style={{ color: metaLinkColor }}>{wbAuthor.name}</a>}
        </span> : null
    );
};
export default PostMetaAuthor;