import { isValidCSS } from '../../../../../../bpl-tools/utils/getCSS';

const Magazine = ({ attributes, mainSl, prefix }) => {
	return `
		${mainSl} .${prefix}Magazine1Posts > article:first-child,
		${mainSl} .${prefix}Magazine2Posts > article:first-child{
			${isValidCSS('min-height', attributes.magazine?.minHeight?.desktop || '450px')}
		}

		@media only screen and (max-width: 1024px) {
			${mainSl} .${prefix}Magazine1Posts > article:first-child,
			${mainSl} .${prefix}Magazine2Posts > article:first-child{
				${isValidCSS('min-height', attributes.magazine?.minHeight?.tablet || '400px')}
			}
		}

		@media only screen and (max-width: 640px) {
			${mainSl} .${prefix}Magazine1Posts > article:first-child,
			${mainSl} .${prefix}Magazine2Posts > article:first-child{
				${isValidCSS('min-height', attributes.magazine?.minHeight?.mobile || '350px')}
			}
		}
	`;
}
export default Magazine;
