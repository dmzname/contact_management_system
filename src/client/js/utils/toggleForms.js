// Authorization form Toggle
import {removeError} from "./validationForms";

export function toggleForms(forms) {
	forms
		.map((form) => form.querySelector('.btn_toggle'))
		.forEach((btn) => {
			btn.addEventListener('click', () => {
				forms.forEach((form) => {
					// eslint-disable-next-line no-param-reassign
					form.hidden = !form.hidden;
					[...form.elements].forEach(el => {
						if(el.nodeName === 'INPUT') {
							el.value = '';
							el.classList.remove('not-empty');
							removeError(el)
						}
					})
				});
			});
		});
}
