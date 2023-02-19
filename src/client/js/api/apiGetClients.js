import { getTokenFromLS } from '../utils';

export async function apiGetClients() {
	const token = getTokenFromLS();
	const response = await fetch('/clients', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
