const PostTitle = props => {
    const { atts: { isTitle, isTitleLink, isLinkNewTab }, post: { link, title } } = props;

    return isTitle ? <h2 className='apbPostTitle'>
        {isTitleLink ? <a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'>{title.rendered}</a> : title.rendered}
    </h2> : null;
};
export default PostTitle;