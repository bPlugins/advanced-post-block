import { prefix } from '../../../utils/data';
import { isSelectionEmpty } from '../../../utils/filter';

// Shown in place of the posts when the pick matches nothing.
const NoResults = ({ filter, selection, onReset }) => <div className={`${prefix}FilterNoResults`}>
	<p>{filter.noResults.text}</p>

	{!isSelectionEmpty(selection) && <button type='button' className={`${prefix}FilterReset`} onClick={onReset}>{filter.reset.label}</button>}
</div>;
export default NoResults;
