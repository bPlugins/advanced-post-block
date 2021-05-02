const PostReadMore = props => {
    const { atts: { isReadMore, readMoreLabel, isLinkNewTab, readMoreAlign, readMoreFontSize, readMoreTransform, readMoreFontWeight, readMoreColor, readMoreHovColor }, post: { link } } = props;

    const readMoreHov = e => e.target.style.color = readMoreHovColor;
    const readMoreHovLeave = e => e.target.style.color = readMoreColor;

    const readMoreStyle = { display: 'inline-block', fontSize: `${readMoreFontSize}px`, textTransform: readMoreTransform, fontWeight: readMoreFontWeight, color: readMoreColor, transition: 'all .3s ease' }

    return (
        'true' == isReadMore ? <div className='bBlocksPostReadMore' style={{ textAlign: readMoreAlign }}>
            <a href={link} target={'true' == isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' style={readMoreStyle} onMouseEnter={readMoreHov} onMouseLeave={readMoreHovLeave}>{readMoreLabel}</a>
        </div> : null
    );
};
export default PostReadMore;