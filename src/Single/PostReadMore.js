const PostReadMore = props => {
	const { atts: { isReadMore, readMoreLabel, isLinkNewTab } } = props;

	return isReadMore ? <div className='apbPostReadMore'>
		<a target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'>{readMoreLabel}</a>
	</div> : null;
};
export default PostReadMore;