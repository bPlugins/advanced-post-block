const PostTitle = props => {
    const { atts: { contentAlign, isTitle, isTitleLink, titleFontSize, titleColor, titleMB, isLinkNewTab }, post: { link, title } } = props;

    const titleStyle = { textAlign: contentAlign, fontSize: `${titleFontSize}px`, color: titleColor, margin: `0 0 ${titleMB}px 0` }

    return (
        'true' == isTitle ? <h2 className='bBlocksPostTitle' style={titleStyle}>
            {'true' == isTitleLink ? <a href={link} target={'true' == isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' style={{ color: titleColor }}>{title.rendered}</a> : title.rendered}
        </h2> : null
    );
};
export default PostTitle;