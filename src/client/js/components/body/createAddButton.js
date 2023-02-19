import { el } from 'redom';
import { createPopUp } from '../pop-up/createPopUp';

export function createAddButton() {
	return el(
		'button.add-button.main__btn',
		(btn) => btn.addEventListener('click', createPopUp),
		'Добавить клиента',
	);
}
