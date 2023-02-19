import { el } from 'redom';
import { userLogout } from '../auth/api/userLogout';

export function createLogoutBtn() {
	const btn = el('button.logout-btn', { type: 'button' }, 'Выйти');

	btn.addEventListener('click', userLogout);

	return btn;
}
