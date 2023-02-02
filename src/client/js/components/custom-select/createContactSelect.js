import { el } from 'redom';
import { createAddOtherContactForm } from '../pop-up/createAddOtherContactForm.js';
import { focusedElement } from '../../utils/index.js';

const options = {
	phone: 'Телефон',
	extPhone: 'Доп. телефон',
	email: 'Email',
	facebook: 'Facebook',
	vk: 'Vk',
	other: 'Другое',
};

// Closing select-options by click anywhere
export function closingSelectOptions(event) {
	const customSelects = document.querySelectorAll('.custom-select');
	if (customSelects.length > 0) {
		customSelects.forEach((select) => {
			if (!select.contains(event.target)) {
				select.classList.remove('active');
			}
		});
	}
}

document.addEventListener('click', closingSelectOptions);

// Select options action
let count = 0;

export function selectActions(event) {
	const { target, code, type } = event;
	const btn = this.querySelector('.custom-select__button');
	const itemsList = this.querySelector('.custom-select__list');
	const items = this.querySelectorAll('.custom-select__list-item');
	const input = this.nextSibling;

	if (type === 'click' && target === btn) {
		this.classList.toggle('active');
	}

	// Closing select-options by press key 'Escape' or 'Tab'
	if (code === 'Tab' || code === 'Escape') {
		this.classList.remove('active');
		count = 0;
	}

	// Selecting options by arrow keys
	if (this.closest('.active')) {
		if (code === 'ArrowDown') {
			++count;
			if (count === items.length + 1) count = 1;
		}
		if (code === 'ArrowUp') {
			--count;
			if (count < 1) count = items.length;
		}
		count > 0 && items[count - 1].focus();
	}

	// Selected options
	if (
		((code === 'Enter' && itemsList.contains(target)) ||
			(target.closest('.custom-select__list-item') && type === 'click')) &&
		target.dataset.value !== 'other'
	) {
		input.value = '';
		input.nextElementSibling.hidden = true;
		btn.textContent = target.textContent;
		input.name = target.dataset.value;
		this.classList.remove('active');
		focusedElement(input);
		count = 0;
	}

	if (target.dataset.value === 'other' && (code === 'Enter' || code === 'Space' || type === 'click')) {
		const form = document.querySelector('.form_clients');
		this.classList.remove('active');
		const contactField = target.closest('.contact-field');
		contactField.append(createAddOtherContactForm(form));
	}
}

export default () => {
	const select = el('div.custom-select', [
		el('button.custom-select__button', (btn) => focusedElement(btn), { type: 'button' }, 'Телефон'),
		el('ul.custom-select__list', [
			Object.entries(options).map(([val, text], index) =>
				el(
					index === 0 ? 'li.custom-select__list-item.selected' : 'li.custom-select__list-item',
					{ 'data-value': val, tabindex: '0' },
					text,
				),
			),
		]),
	]);

	select.addEventListener('click', selectActions);
	select.addEventListener('keydown', selectActions);

	return select;
};
