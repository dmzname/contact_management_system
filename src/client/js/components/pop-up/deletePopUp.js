import { formOtherListener } from './createAddOtherContactForm.js';
import { selectActions } from '../custom-select/createContactSelect.js';

export function deletePopUp(popUp) {
	const addOther = popUp.querySelector('.add-other');
	const selects = popUp.querySelectorAll('.custom-select');

	popUp.remove();

	if (addOther) {
		addOther.removeEventListener('click', formOtherListener);
		addOther.removeEventListener('keydown', formOtherListener);
	}

	if (selects) {
		selects.forEach((select) => {
			select.removeEventListener('click', selectActions);
			select.removeEventListener('keydown', selectActions);
		});
	}
}
