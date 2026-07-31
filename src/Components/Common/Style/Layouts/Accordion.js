import { isValidCSS, getBorderCSS, getMultiShadowCSS, getSpaceCSS } from '../../../../../../bpl-tools/utils/getCSS';
import { primaryColor } from '../../../../../../bpl-tools/utils/data';

// The item carries `.apbPost`, so the shared modules (Typography, Title, Meta,
// Excerpt, ReadMore) and Base (border + shadow + Content Background) already
// style it. Here we emit the accordion-only bits: tokens, open=hover
// border/shadow, the optional header background, and body padding.
const Accordion = ({ attributes, mainSl, prefix }) => {
	const { accordion = {}, border = {}, hoverBorder = {}, hoverShadow = [], contentPadding, rowGap } = attributes;
	const { theme = 'classic', maxWidth = {}, styles = {} } = accordion || {};

	// Item spacing (Row Gap control).
	const gap = ('' !== rowGap && undefined !== rowGap && null !== rowGap) ? `${rowGap}px` : '';
	const { headerBG, hovHeaderBG, headerPadding, indicatorColor, indicatorActiveColor } = styles || {};

	const wrapSl = `${mainSl} .${prefix}AccordionPosts`;
	const itemSl = `${wrapSl} .${prefix}AccordionItem`;
	const triggerSl = `${wrapSl} .${prefix}AccordionTrigger`;
	const bodySl = `${wrapSl} .${prefix}AccordionBody`;
	const indicatorSl = `${wrapSl} .${prefix}AccordionIndicator`;

	// Open/active accent = the Hover Border color (falls back to base border, then primary).
	const accentColor = hoverBorder?.color || border?.color || primaryColor;

	// Per-theme default header padding (overridden by the Header Padding control).
	const themeHeaderPadding = {
		classic: '20px 4px',
		'card-stack': '18px 20px'
	}[theme] || '18px 20px';

	return `
		${wrapSl} {
			--apb-acc-accent: ${accentColor};
			${border?.color ? `--apb-acc-line: ${border.color};` : ''}
			${isValidCSS('gap', gap)}
			${maxWidth?.desktop ? `max-width: ${maxWidth.desktop}; margin-inline: auto;` : ''}
		}

		${itemSl}.is-open {
			${getBorderCSS(hoverBorder)}
			${isValidCSS('box-shadow', getMultiShadowCSS(hoverShadow))}
		}

		${triggerSl} {
			${isValidCSS('padding', headerPadding ? getSpaceCSS(headerPadding) : themeHeaderPadding)}
			${headerBG ? isValidCSS('background', headerBG) : ''}
		}

		${hovHeaderBG ? `
		${itemSl}:hover .${prefix}AccordionTrigger,
		${itemSl}.is-open .${prefix}AccordionTrigger {
			${isValidCSS('background', hovHeaderBG)}
		}` : ''}

		${bodySl} {
			${isValidCSS('padding', getSpaceCSS(contentPadding))}
		}

		${indicatorSl} {
			${isValidCSS('color', indicatorColor)}
		}

		${indicatorSl}.upIcon {
			${isValidCSS('color', indicatorActiveColor)}
		}
	`;
}
export default Accordion;
