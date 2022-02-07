import { Dashicon } from '@wordpress/components';

const PostMetaDate = props => {
	const { atts: { isMetaDate }, post: { wbDate } } = props;

	return isMetaDate && wbDate ? <span>
		<Dashicon icon='calendar-alt' />&nbsp;
		<span>{wbDate}</span>
	</span> : null;
};
export default PostMetaDate;