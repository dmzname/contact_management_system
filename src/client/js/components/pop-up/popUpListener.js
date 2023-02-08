import createContactInput from './createContactInput.js';
import {deletePopUp} from './deletePopUp.js';
import {TabindexController} from '../../classes/TabindexController.js';
import {selectActions} from '../custom-select/createContactSelect.js';
import {isFormValid, getInputsNode} from "../../utils";
import {isShowPlaceholder} from "./createAddOtherContactForm";
import {saveClientApi} from "../../api/saveClientApi";
import {createClientItem} from "../contentTable/createClientItem";

export const popUpTabindexController = new TabindexController(document);

let countContacts = 0;

export async function popUpListener(event) {
	event.preventDefault();
	const {target} = event;

	const popUp = event.currentTarget;
	const addContactBtn = popUp.querySelector('.add-contact__btn');

	// Add client contacts field
	if (target.dataset.action === 'add-contact') {
		if (++countContacts === 10) {
			addContactBtn.disabled = true;
		}
		createContactInput(target);
	}

	// Delete client contacts field
	if (target.dataset.action === 'del-contact') {
		const contactField = target.closest('.contact-field');
		const select = contactField.querySelector('.custom-select');
		--countContacts;
		addContactBtn.disabled = false;
		contactField.remove();

		contactField.removeEventListener('input', isShowPlaceholder);
		select.removeEventListener('click', selectActions);
		select.removeEventListener('keydown', selectActions);
	}

	if (event instanceof InputEvent) {
		if (target.classList.contains('contact-field__input')) {
			target.nextElementSibling.hidden = target.value.length;
			target.closest('.contact-field__wrapper')
				.nextElementSibling.hidden = !target.value.length;
		}
	}

	// Save form data
	if (target.dataset.action === 'save') {
		const tBody = document.querySelector('.clients-list__body');
		const form = document.forms.add;
		const isLoading = this.querySelector('.pop-up__isLoading')
		const isError = this.querySelector('.pop-up__isError')
		const formData = isFormValid(getInputsNode(form));

		if(formData) {
			isLoading.hidden = false;
			try {
				const clientData = await saveClientApi(formData);
				if(clientData) {
					deletePopUp(popUp);
					tBody.append(createClientItem(clientData))
				}
			} catch (err) {
				console.log(err);

				isLoading.hidden = true;
				isError.textContent = err.message;
				isError.hidden = false;

				setTimeout(() => {
					isError.hidden = true;
				}, 3000)
			}
		}
	}

	// Delete pop-up window
	if (target.hasAttribute('data-close')) {
		countContacts = 0;
		deletePopUp(popUp);
		popUpTabindexController.returnFocus();
		popUp.removeEventListener('click', popUpListener);
		popUp.removeEventListener('input', popUpListener);
		popUp.removeEventListener('submit', popUpListener);
	}
}
