// User auth Login/Signup
export async function apiUserAuth(formData, url) {
	const response = await fetch(`${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	const { token, ...userData } = data;
	localStorage.setItem('token', JSON.stringify(data.token));

	return userData;
}
