import { el } from 'redom';
import { focusedElement, inputFormHover } from '../../../../utils';
import { createContactInput } from '../add-contacts/createContactInput';

function formActions(form) {
  inputFormHover(form);
}

export function createPopUpForm(clientData) {
  return el('form.form.form_clients', formActions, { name: 'add' }, [
    el('div.form__field.field', [
      el(
        `input.form__field-input${clientData?.surname ? '.not-empty' : ''}`,
        (input) => focusedElement(input),
        {
          type: 'text',
          name: 'surname',
          value: clientData ? clientData?.surname : '',
          autoComplete: 'off',
          'data-valid': 'text',
          required: true,
        },
      ),
      el('label', 'Фамилия'),
      el('small'),
    ]),
    el('div.form__field.field', [
      el(`input.form__field-input${clientData?.name ? '.not-empty' : ''}`, {
        type: 'text',
        name: 'name',
        value: clientData ? clientData.name : '',
        autoComplete: 'off',
        'data-valid': 'text',
        required: true,
      }),
      el('label', 'Имя'),
      el('small'),
    ]),
    el('div.form__field.field', [
      el(`input.form__field-input${clientData?.midname ? '.not-empty' : ''}`, {
        type: 'text',
        name: 'midname',
        value: clientData ? clientData.midname : '',
        autoComplete: 'off',
        'data-valid': 'text',
      }),
      el('label.not-required', 'Отчество'),
      el('small'),
    ]),
    el('.add-contact', [
      el(
        '.add-contact__wrapper',
        !clientData?.contacts.length
          ? null
          : clientData?.contacts.map((el) => createContactInput(el)),
      ),
      el(
        'button.add-contact__btn',
        { 'data-action': 'add-contact', type: 'button' },
        'Добавить контакт',
      ),
    ]),
    el('button.btn.btn-clients', { type: 'submit', 'data-action': 'save' }, 'Сохранить'),
  ]);
}
