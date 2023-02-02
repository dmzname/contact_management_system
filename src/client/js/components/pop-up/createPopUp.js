import { el } from 'redom';
import { inputFormHover } from '../../utils/index.js';
import { createPopUpForm } from './createPopUpForm.js';
import { popUpListener, popUpTabindexController } from './popUpListener.js';

const ADD_FORM_TITLE = 'Новый клиент';
const DEL_FORM_TITLE = 'Удалить клиента';
const CHANGE_FORM_TITLE = 'Изменить данные';

export function createPopUp(event) {
	const { target } = event;
	if (document.body.querySelector('.pop-up')) return;

	const form = createPopUpForm();

	window.__contactCount = 0;
	const dataAction = target.dataset.action;

	function checkTitle(title) {
		const titles = {
			add: ADD_FORM_TITLE,
			change: `${CHANGE_FORM_TITLE}<span> ID: 1111</span>`,
			delete: DEL_FORM_TITLE,
		};

		title.textContent = titles[dataAction]; // eslint-disable-line no-param-reassign
		return title;
	}

	popUpTabindexController.removeFocus(form);
	inputFormHover(form);

	const popUpOverlay = el(
		'.pop-up',
		{ 'data-close': '' },
		el('.pop-up__content', [
			el('h3.pop-up__title', checkTitle),
			form,
			el('button.pop-up__close', { 'data-close': '', type: 'button' }),
		]),
	);

	document.body.append(popUpOverlay);

	popUpOverlay.addEventListener('click', popUpListener);
	popUpOverlay.addEventListener('input', popUpListener);
	popUpOverlay.addEventListener('submit', popUpListener);
}
