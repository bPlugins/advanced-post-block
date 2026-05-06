const scrollTo = (targetEl) => {
	if (!targetEl) return;
	window.targetEl = targetEl;

	const btn = targetEl.querySelector('h2 button');

	targetEl.classList.add('highlight');

	setTimeout(() => {
		if (!targetEl.classList.contains('is-opened') && btn) {
			btn.click();
		}
		targetEl.classList.remove('highlight');
	}, 1000);

	targetEl.scrollIntoView();
}
export default scrollTo;