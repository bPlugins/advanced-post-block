import { __, sprintf, _n } from '@wordpress/i18n';

import { sanitizeHTML } from '../../../bpl-tools/utils/common';

// The trailing ellipsis is a premium-only option, so nothing is appended here.
export const truncate = (str, limit = {}) => {
	if (!str) return '';
	const { type = 'word', value } = limit;

	if (!value || value === -1) return str;

	if ('word' === type) {
		const words = str.split(/\s+/);
		if (words.length <= value) return str;
		return words.slice(0, value).join(' ');
	} else if ('char' === type) {
		if (str.length <= value) return str;
		return str.substring(0, value);
	}

	return str;
};

export const strToIntArr = str => str?.trim().split(',').map(id => id ? parseInt(id) : id);
export const filterNaN = array => array?.filter(id => id && !isNaN(id));

export const strLength = (str) => str ? str.split(' ').length : 0;

export const wordCount = content => content ? (content?.replace(/(<([^>]+)>)/gi, '').split(/\s+/) || []).length : 0;

export const renderHTML = raw => <span dangerouslySetInnerHTML={{ __html: sanitizeHTML(raw) }} />;

export const filterObject = (obj, callback) => Object.fromEntries(Object.entries(obj).filter(([key, val]) => callback(key, val)));

// eslint-disable-next-line no-unused-vars
export const omit = (obj, key) => { const { [key]: _, ...rest } = obj; return rest; };

export const filterSelected = (taxonomy, selected) => taxonomy?.map(tax => tax.id)?.filter(tax => selected.indexOf(tax) !== -1);

export const dateFormat = (format, date) => {
	const suffix = {
		'01': 'st',
		'02': 'nd',
		'03': 'rd'
	};

	if (!date || date === '') {
		date = new Date();
	}
	else if (typeof (date) !== 'object') {
		date = new Date(date.replace(/-/g, '/')); // attempt to convert string to date object	
	}

	let string = '';
	const mo = date.getMonth();		// month (0-11)
	const m1 = mo + 1;				// month (1-12)
	const dow = date.getDay();		// day of week (0-6)
	const d = date.getDate();		// day of the month (1-31)
	const y = date.getFullYear();	// 1999 or 2003
	const h = date.getHours();		// hour (0-23)
	const mi = date.getMinutes();	// minute (0-59)
	const s = date.getSeconds();	// seconds (0-59)

	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

	for (let i = 0, len = format.length; i < len; i++) {
		switch (format[i]) {
			case 'j': // Day of the month without leading zeros (1 to 31)
				string += d;
				break;

			case 'd': // Day of the month, 2 digits with leading zeros (01 to 31)
				string += (d < 10) ? '0' + d : d;
				break;

			case 'S': // Day of the month, 2 digits with leading zeros (01 to 31)
				string += suffix[d] || 'th';
				break;

			case 'l': // (lowercase 'L') A full textual representation of the day of the week
				string += days[dow];
				break;

			case 'w': // Numeric representation of the day of the week (0=Sunday,1=Monday,...6=Saturday)
				string += dow;
				break;

			case 'D': // A textual representation of a day, three letters
				string += shortDays[dow];
				break;

			case 'm': // Numeric representation of a month, with leading zeros (01 to 12)
				string += (m1 < 10) ? '0' + m1 : m1;
				break;

			case 'n': // Numeric representation of a month, without leading zeros (1 to 12)
				string += m1;
				break;

			case 'F': // A full textual representation of a month, such as January or March 
				string += months[mo];
				break;

			case 'M': // A short textual representation of a month, three letters (Jan - Dec)
				string += shortMonths[mo];
				break;

			case 'Y': // A full numeric representation of a year, 4 digits (1999 OR 2003)	
				string += y;
				break;

			case 'y': // A two digit representation of a year (99 OR 03)
				string += y.toString().slice(-2);
				break;

			case 'H': // 24-hour format of an hour with leading zeros (00 to 23)
				string += (h < 10) ? '0' + h : h;
				break;

			case 'g': { // 12-hour format of an hour without leading zeros (1 to 12)
				const gHour = (h === 0) ? 12 : h;
				string += (gHour > 12) ? gHour - 12 : gHour;
				break;
			}

			case 'h': { // 12-hour format of an hour with leading zeros (01 to 12)
				let hHour = (h === 0) ? 12 : h;
				hHour = (hHour > 12) ? hHour - 12 : hHour;
				string += (hHour < 10) ? '0' + hHour : hHour;
				break;
			}

			case 'a': // Lowercase Ante meridiem and Post meridiem (am or pm)
				string += (h < 12) ? 'am' : 'pm';
				break;

			case 'i': // Minutes with leading zeros (00 to 59)
				string += (mi < 10) ? '0' + mi : mi;
				break;

			case 's': // Seconds, with leading zeros (00 to 59)
				string += (s < 10) ? '0' + s : s;
				break;

			case 'c': // ISO 8601 date (eg: 2012-11-20T18:05:54.944Z)
				string += date.toISOString();
				break;

			default:
				string += format[i];
		}
	}

	return string;
}

export const classNames = (...args) => {
	const classes = args.reduce((acc, arg) => {
		if (typeof arg === 'string') {
			acc.push(arg);
		} else if (typeof arg === 'object') {
			Object.entries(arg).forEach(([key, value]) => {
				if (value) {
					acc.push(key);
				}
			});
		}
		return acc;
	}, []);

	return classes.join(' ');
}

export const filterPassword = (posts = [], has_password) => {
	switch (has_password) {
		case 'true':
			return posts?.filter(p => p.password)
		case 'false':
			return posts?.filter(p => !p.password)
		default:
			return posts
	}
}

export const getTimeAgo = (dateStr) => {
	if (!dateStr) return '';
	const date = new Date(dateStr.replace(/-/g, '/'));
	const now = new Date();
	const diff = Math.floor((now - date) / 1000);

	if (diff < 60) return __('Just now', 'advanced-post-block');

	if (diff < 3600) {
		const minutes = Math.floor(diff / 60);
		// translators: %d: number of minutes
		return sprintf(_n('%d minute ago', '%d minutes ago', minutes, 'advanced-post-block'), minutes);
	}
	if (diff < 86400) {
		const hours = Math.floor(diff / 3600);
		// translators: %d: number of hours
		return sprintf(_n('%d hour ago', '%d hours ago', hours, 'advanced-post-block'), hours);
	}
	if (diff < 604800) {
		const days = Math.floor(diff / 86400);
		// translators: %d: number of days
		return sprintf(_n('%d day ago', '%d days ago', days, 'advanced-post-block'), days);
	}
	if (diff < 2592000) {
		const weeks = Math.floor(diff / 604800);
		// translators: %d: number of weeks
		return sprintf(_n('%d week ago', '%d weeks ago', weeks, 'advanced-post-block'), weeks);
	}
	if (diff < 31536000) {
		const months = Math.floor(diff / 2592000);
		// translators: %d: number of months
		return sprintf(_n('%d month ago', '%d months ago', months, 'advanced-post-block'), months);
	}

	const years = Math.floor(diff / 31536000);
	// translators: %d: number of years
	return sprintf(_n('%d year ago', '%d years ago', years, 'advanced-post-block'), years);
};