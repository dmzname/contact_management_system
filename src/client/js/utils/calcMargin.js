export function calcMargin() {
	const toolTips = document.querySelectorAll('.tooltip');
	const contactsList = document.querySelectorAll('.contacts');
	toolTips.forEach((el) => {
		el.style.marginLeft = '-' + Math.ceil(el.offsetWidth) / 2 + 'px';
	});
	contactsList.forEach((el) => {
		el.style.marginTop = '-' + Math.ceil(el.offsetHeight) / 2 + 'px';
		el.style.top = '50%';
	});
}
