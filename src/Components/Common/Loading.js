import { Spinner } from '@wordpress/components';

import { prefix } from '../../utils/data';

const Loading = ({ isSpinner = true, text = 'Loading...' }) => isSpinner || text ?
	<div className={`${prefix}Loading`}>
		{isSpinner && <Spinner style={{ margin: '2px' }} />} {text}
	</div> :
	null;
export default Loading;