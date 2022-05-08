const PostTitle = props => {
	const { atts: { isTitle, isTitleLink, isLinkNewTab }, post: { title } } = props;

	return isTitle ? <>
		{isTitleLink ? <h2 className='apbPostTitle'>
			<a target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' dangerouslySetInnerHTML={{ __html: title.rendered }} />
		</h2> : <h2 className='apbPostTitle' dangerouslySetInnerHTML={{ __html: title.rendered }} />}
	</> : null;
};
export default PostTitle;