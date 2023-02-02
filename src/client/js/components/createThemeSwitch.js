import { el } from 'redom';

export function createThemeSwitch() {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme) {
		document.documentElement.setAttribute('data-theme', currentTheme);
	}

	function switchTheme(input) {
		if (input.checked) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}

	function isCheckedByKey(switchLabel) {
		switchLabel.addEventListener('keydown', (e) => {
			const input = switchLabel.children[0];
			if (e.code === 'Enter') {
				input.checked = !input.checked;
				switchTheme(input);
			}
		});
	}

	function isChecked(input) {
		if (currentTheme === 'dark') {
			input.checked = true; // eslint-disable-line no-param-reassign
		}
		input.addEventListener('change', switchTheme.bind(null, input));
	}

	return el(
		'.theme-switch-wrapper',
		el('label.theme-switch', isCheckedByKey, { for: 'checkbox', tabindex: '0' }, [
			el('input#checkbox', isChecked, { type: 'checkbox' }),
			el('span.round'),
		]),
	);
}
