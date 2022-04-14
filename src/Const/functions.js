import { select } from '@wordpress/data';

const truncate = (str, no_words) => str && str.split(' ').splice(0, no_words).join(' ');
const renderHTML = raw => <span dangerouslySetInnerHTML={{ __html: raw }} />;
const mediaUrl = id => select('core').getMedia(id)?.source_url;
const filterSelected = (taxonomy, selected) => taxonomy?.map(tax => tax.id)?.filter(tax => selected.indexOf(tax) !== -1);

export { truncate, renderHTML, mediaUrl, filterSelected };