import { Dashicon } from '@wordpress/components';

const PostMetaDate = props => {
    const { atts: { isMetaDate, metaTextColor, metaIconColor }, post: { wbDate } } = props;

    return (
        'true' == isMetaDate && wbDate ? <span>
            <Dashicon icon='calendar-alt' style={{ color: metaIconColor }} />&nbsp;
            <span style={{ color: metaTextColor }}>{wbDate}</span>
        </span> : null
    );
};
export default PostMetaDate;