import {getTokenFromLS} from "../utils";

export async function saveClientApi (formData) {
	const token = getTokenFromLS();

	const response = await fetch('/clients', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if(!response.ok) {
		throw new	Error(data.message);
	}

	return data;
}