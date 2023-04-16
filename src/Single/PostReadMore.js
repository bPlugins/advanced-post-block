const PostReadMore = ({ post, attributes }) => {
	const { link } = post;
	const { isReadMore, readMoreLabel, isLinkNewTab } = attributes;

	return isReadMore ? <div className='apbPostReadMore'>
		<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' dangerouslySetInnerHTML={{ __html: readMoreLabel }} />
	</div> : null;
};
export default PostReadMore;