import { createAddButton, createClientsList, createHeader, createTitle } from './components';
import { el } from 'redom';
import { createNoScript } from './utils';

export function createApp() {
	document.body.innerHTML = '';

	const noScript = createNoScript();
	const header = createHeader();
	const main = el('main#main.main');

	const title = createTitle();
	const clientsList = createClientsList();
	const addButton = createAddButton();

	main.append(title, clientsList.table, addButton);

	document.body.append(noScript, header, main);
}
