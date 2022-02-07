import { select } from '@wordpress/data';

const func = {
	truncate: (str, no_words) => str && str.split(' ').splice(0, no_words).join(' '),
	renderHTML: raw => <span dangerouslySetInnerHTML={{ __html: raw }} />,
	mediaUrl: id => select('core').getMedia(id)?.source_url
}
export default func;