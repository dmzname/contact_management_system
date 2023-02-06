import { el } from 'redom';
import {focusedElement} from "../../utils";

export function createPopUpForm() {
	return el('form.form.form_clients', { name: 'add' }, [
		el('div.form__field.field', [
			el('input.form__field-input', (input) => focusedElement(input), {
				type: 'text',
				name: 'surname',
				autoComplete: 'off',
				'data-valid': 'text',
				required: true
			}),
			el('label', 'Фамилия'),
			el('small'),
		]),
		el('div.form__field.field', [
			el('input.form__field-input', { type: 'text', name: 'name', autoComplete: 'off', 'data-valid': 'text', required: true }),
			el('label', 'Имя'),
			el('small'),
		]),
		el('div.form__field.field', [
			el('input.form__field-input', { type: 'text', name: 'midname', autoComplete: 'off', 'data-valid': 'text' }),
			el('label.not-required', 'Отчество'),
			el('small'),
		]),
		el(
			'.add-contact',
			el(
				'button.add-contact__btn',
				{ 'data-action': 'add-contact', type: 'button' },
				'Добавить контакт',
			),
		),
		el('button.btn.btn-clients', { type: 'submit', 'data-action': 'save' }, 'Сохранить'),
		el('button.btn-reset', { 'data-close': '' }, 'Отмена'),
	]);
}
