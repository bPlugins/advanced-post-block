const { Dashicon } = wp.components;

// Functions
import func from '../../../Const/functions';
const { renderHTML } = func;

const PostMetaCategory = props => {
    const { atts: { isMetaCategory, metaCategoryIn, metaLinkColor, metaIconColor }, post: { wbCategories } } = props;

    return (
        'true' == isMetaCategory && 'content' == metaCategoryIn && wbCategories ? <span>
            <Dashicon icon="category" style={{ color: metaIconColor }} />&nbsp;
            <span style={{ color: metaLinkColor }}>{renderHTML(wbCategories.coma)}</span>
        </span> : null
    );
};
export default PostMetaCategory;