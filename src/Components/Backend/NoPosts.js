import { __ } from '@wordpress/i18n';

import { prefix } from '../../utils/data';

const NoPosts = () => <h3 className={`${prefix}NotFound`}>{__('No posts found!! Please update the query or add some posts', 'advanced-post-block')}</h3>;
export default NoPosts;