import { el } from 'redom';
import { createContactsList } from './createContactsList';
import { addEventListener } from '../../../../utils/eventListenersController';
import { createPopUp } from '../../../pop-up/createPopUp';

function modifiedData(str) {
  const dateArr = str.split('T');
  const date = dateArr[0].split('-').reverse().join('.');
  const time = dateArr[1].split(':').slice(0, 2).join(':');
  return { date, time };
}

export function createClientItem(data) {
  const dateCreate = modifiedData(data.createdAt);
  const dateUpdate = modifiedData(data.updatedAt);
  const contactsList = createContactsList(data.contacts);

  const editBtn = el('button.clients-list__edit-client', { 'data-action': 'change' }, 'Изменить');
  const removeBtn = el(
    'button.clients-list__remove-client',
    { 'data-action': 'delete' },
    'Удалить',
  );

  const rowItem = el('tr.clients-list__row', [
    el('td.clients-list__item', `${data.clientId}`),
    el('td.clients-list__item', `${data.fullName}`),
    el('td.clients-list__item', `${dateCreate.date}`, el('span', `${dateCreate.time}`)),
    el('td.clients-list__item', `${dateUpdate.date}`, el('span', `${dateUpdate.time}`)),
    el('td.clients-list__item', el('.contacts', contactsList)),
    el('td.clients-list__item', [editBtn, removeBtn]),
  ]);

  [editBtn, removeBtn].forEach((btn) => {
    addEventListener(btn, 'click', createPopUp.bind({ ...data, rowItem }));
  });

  return rowItem;
}
