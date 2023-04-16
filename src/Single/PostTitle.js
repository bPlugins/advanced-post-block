const PostTitle = ({ post, attributes }) => {
	const { link, title } = post;
	const { isTitle, isTitleLink, isLinkNewTab } = attributes;

	return isTitle ? <>
		{isTitleLink ?
			<h2 className='apbPostTitle'>
				<a href={link} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer' dangerouslySetInnerHTML={{ __html: title }} />
			</h2> :
			<h2 className='apbPostTitle' dangerouslySetInnerHTML={{ __html: title }} />}
	</> : null;
};
export default PostTitle;