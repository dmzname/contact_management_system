import { el, svg } from 'redom';
import createContactSelect from '../custom-select/createContactSelect.js';

export default (target) => {
	const contactsBlock = target.closest('.add-contact');
	const select = createContactSelect();

	const contactField = el('.contact-field.field', [
		el('div.contact-field__wrapper', [
			el('input.contact-field__input', {
				type: 'text',
				name: 'phone',
				'data-valid': 'phone',
				required: true,
			}),
			el('label', '+x (xxx) xxx-xx-xx'),
			el('small'),
		]),
		el(
			'button.contact-field__del-btn',
			{ type: 'button', 'data-action': 'del-contact', hidden: true },
			svg(
				'svg',
				{
					width: '12',
					height: '12',
					viewBox: '0 0 12 12',
					fill: 'none',
					xmlns: 'http://www.w3.org/2000/svg',
				},
				svg('path', {
					d: 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z',
					fill: '#B0B0B0',
				}),
			),
		),
	]);

	contactField.prepend(select);
	contactsBlock.insertBefore(contactField, target);
};
