// Input hover effects
export function inputFormHover(form) {
	form.addEventListener('input', (event) => {
		const target = event.target;
		target.classList.toggle('not-empty', target.value.trim() !== '')
	})
}
