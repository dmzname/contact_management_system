import {el, setAttr} from 'redom';
import {createClientItem} from './createClientItem.js';
import {createTableMessage} from './createTableMessage.js';
import {createTableErrorMsg} from './createTableErrorMsg.js';
import {getClientsApi} from "../../api/getClientsApi";

export function createClientsList() {
	const table = el('table.clients-list');
	const thead = el('thead.clients-list__head');
	const tBody = el('tBody.clients-list__body.isLoading');
	const headRow = el('tr.clients-list__row');

	const dataTitle = [
		'ID',
		'Фамилия Имя Отчество',
		'Дата и время создания',
		'Последние изменения',
		'Контакты',
		'Действия',
	];

	dataTitle.forEach((title, index) => {
		const headData = el('th.clients-list__data-head');
		let filterBtn = null;
		index <= 3 ? (filterBtn = el('button')) : (filterBtn = el('span'));
		filterBtn.textContent = title;
		if (index === 0) {
			setAttr(filterBtn, {className: 'active'});
		}
		headData.append(filterBtn);
		headRow.append(headData);
	});

	table.addEventListener('click', (e) => {
		const {target} = e;
		if (target.nodeName !== 'BUTTON') return;
		thead.querySelectorAll('button').forEach((btn) => {
			btn.classList.remove('active');
		});
		target.classList.add('active');
	});
	getClientsApi()
		.then(data => {
			if (!data.length) {
				tBody.append(createTableMessage());
			}
			data.forEach((clientData) => {
				tBody.append(createClientItem(clientData));
			});
			tBody.classList.remove('isLoading');
		})
		.catch(err => {
			tBody.append(createTableErrorMsg(err.message));
			tBody.classList.remove('isLoading');
		})
	thead.append(headRow);
	table.append(thead, tBody);
	return {table, tBody};
}
