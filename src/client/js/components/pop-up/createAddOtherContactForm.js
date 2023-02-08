import { el } from 'redom';
import {focusedElement, isFormValid} from '../../utils/index.js';
import { TabindexController } from '../../classes/TabindexController.js';

export function isShowPlaceholder (event) {
		event.target.nextElementSibling.hidden = Boolean(event.target.value.length);
}

function removeAddOtherContactForm(element, addOtherTabindexController) {
	addOtherTabindexController.returnFocus();
	element.remove();
	element.removeEventListener('click', formOtherListener); // eslint-disable-line no-use-before-define
	element.removeEventListener('keydown', formOtherListener); // eslint-disable-line no-use-before-define
}

export function formOtherListener([addOtherTabindexController], event) {
	const { type, target, code } = event;

	const contactField = target.closest('.contact-field');
	const selectBtn = contactField.querySelector('.custom-select__button');
	const selectInput = contactField.querySelector('.custom-select__input');


		contactField.addEventListener('input', isShowPlaceholder);

	if ((target.dataset.closeOther && type !== 'keydown') || code === 'Escape') {
		removeAddOtherContactForm(this, addOtherTabindexController);
		focusedElement(selectBtn);
	}

	if (
		(target.closest('.add-other__submit') && type !== 'keydown') ||
		(code === 'Enter' && !target.dataset.closeOther)
	) {

		const inputSocialName = contactField.querySelector('input[name=socialName]');
		const inputSocialLink = contactField.querySelector('input[name=socialLink]');
		const contactInput = contactField.querySelector('.contact-field__input');
		const closeBtn = contactField.querySelector('.contact-field__del-btn');

		const formData = isFormValid([inputSocialName, inputSocialLink]);



		if(formData) {
			selectBtn.textContent = formData.socialName;
			selectInput.value = formData.socialName;
			contactInput.value = formData.socialLink;
			contactInput.dataset.valid = 'link';
			contactInput.nextElementSibling.hidden = true;
			contactInput.name = 'other';
			closeBtn.hidden = false;

			removeAddOtherContactForm(this, addOtherTabindexController);
		}
	}
}

export function createAddOtherContactForm(form) {
	const addOtherTabindexController = new TabindexController(form);
	const addOther = el(
		'.add-other',
		el('.add-other__wrapper', [
			el('.add-other__inputs-group', [
				el('div.add-other__field.field', [
					el('input', (input) => focusedElement(input), { type: 'text', name: 'socialName', autoComplete: 'off', 'data-valid': 'text', required: true }),
					el('label', 'Ex.: Telegram'),
					el('small')
				]),
				el('div.add-other__field.field', [
					el('input', { type: 'text', name: 'socialLink', autoComplete: 'off', 'data-valid': 'link', required: true }),
					el('label', 'Ex.: https://tg.me'),
					el('small')
				]),
			]),
			el('.add-other__btn-group', [
				el('button.add-other__submit', { type: 'button' }, 'Добавить'),
				el('button', { type: 'button', 'data-close-other': '1' }, 'Отменить'),
			]),
			el('button.add-other__close', { 'data-close-other': '1', type: 'button' }),
		]),
	);
	addOtherTabindexController.removeFocus(addOther);
	addOther.addEventListener('click', formOtherListener.bind(addOther, [addOtherTabindexController]));
	addOther.addEventListener('keydown', formOtherListener.bind(addOther, [addOtherTabindexController]));
	return addOther;
}
