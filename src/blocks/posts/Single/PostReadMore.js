const PostReadMore = props => {
    const { atts: { isReadMore, readMoreLabel, isLinkNewTab }, post: { link } } = props;

    return isReadMore ? <div className='apbPostReadMore'>
        <a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'>{readMoreLabel}</a>
    </div> : null;
};
export default PostReadMore;