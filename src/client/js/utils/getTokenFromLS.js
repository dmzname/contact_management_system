export function getTokenFromLS() {
	return JSON.parse(localStorage.getItem('token'));
}