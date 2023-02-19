import { getTokenFromLS } from '../utils';

export async function apiRemoveClient(id) {
	const token = getTokenFromLS();

	const response = await fetch(`/clients/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	return data;
}
