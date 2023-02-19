import { el } from 'redom';
import { createContactsList } from './createContactsList';

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

	return el('tr.clients-list__row', [
		el('td.clients-list__item', `${data.clientId}`),
		el('td.clients-list__item', `${data.fullName}`),
		el('td.clients-list__item', `${dateCreate.date}`, el('span', `${dateCreate.time}`)),
		el('td.clients-list__item', `${dateUpdate.date}`, el('span', `${dateUpdate.time}`)),
		el('td.clients-list__item', el('.contacts', contactsList)),
		el('td.clients-list__item', [
			el('button.clients-list__edit-client', { 'data-action': 'change' }, 'Изменить'),
			el('button.clients-list__remove-client', { 'data-action': 'delete' }, 'Удалить'),
		]),
	]);
}
