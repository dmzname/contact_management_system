// Input hover effects
export function inputFormHover(form) {
	for (let i = 0; i < form.length; i++) {
		if (form[i].nodeName === 'INPUT') {
			form[i].addEventListener('input', () => {
				form[i].value.trim() !== ''
					? form[i].classList.add('not-empty')
					: form[i].classList.remove('not-empty');
			});
		}
	}
}
