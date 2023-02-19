import { getInputsNode, inputFormHover, isFormValid } from '../../utils';
import { apiUserAuth } from './api/apiUserAuth';
import { createApp } from '../../createApp';

export function formsHandler(forms) {
	forms.forEach((form) => {
		const errorMessage = form.querySelector('.error-message');
		inputFormHover(form);
		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			const formData = isFormValid(getInputsNode(form));
			if (formData) {
				try {
					await apiUserAuth(formData, `/${event.target.name}`);
					createApp();
				} catch (err) {
					errorMessage.textContent = err.message;
				}
			}
		});
	});
}
