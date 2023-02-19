import { authForms } from '../views/authForms';
import { TOKEN } from '../../../../index';

export async function userLogout() {
	const response = await fetch('/logout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
	});
	if (response.ok) {
		localStorage.removeItem('token');
		authForms();
	}
}
