// Authorization form Toggle
export function toggleForms(forms) {
	forms
		.map((form) => form.querySelector('.btn_toggle'))
		.forEach((btn) => {
			btn.addEventListener('click', () => {
				forms.forEach((form) => {
					// eslint-disable-next-line no-param-reassign
					form.hidden = !form.hidden;
				});
			});
		});
}
