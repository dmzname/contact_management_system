import createContactInput from './createContactInput.js';
import {deletePopUp} from './deletePopUp.js';
import {TabindexController} from '../../classes/TabindexController.js';
import {selectActions} from '../custom-select/createContactSelect.js';
import {isFormValid} from "../../utils";

export const popUpTabindexController = new TabindexController(document);

let countContacts = 0;

export function popUpListener(event) {
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
		const select = target.closest('.contact-field').querySelector('.custom-select');
		--countContacts;
		addContactBtn.disabled = false;
		target.closest('.contact-field').remove();

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
		const token = JSON.parse(localStorage.getItem('token'));
		const form = document.forms.add;

		const formData = isFormValid(form);

		// const formData = {};
		// const contacts = [];

	/*	[...form.elements].forEach((input) => {
			if (input.nodeName === 'INPUT') {
				if (input.classList.contains('form__field-input')) {
					formData[input.name] = input.value;
				} else {
					const socialName = input.previousSibling.querySelector('.custom-select__button').textContent;
					contacts.push({type: input.name, socialName, socialLink: input.value});
				}
			}
		});

		formData.contacts = contacts;

		fetch('/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(formData),
		}); */
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
