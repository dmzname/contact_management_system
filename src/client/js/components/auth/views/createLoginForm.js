import { el } from 'redom';

export function createLoginForm() {
	return el('form.form.form_auth', { name: 'login', hidden: false, novalidate: true }, [
		el('h2.form__title', 'Форма входа'),
		el('button.btn_toggle', { type: 'button' }, 'Зарегистрироваться'),
		el('div.form__field.field', [
			el('input.email', { type: 'text', name: 'email', autoComplete: 'off', 'data-valid': 'email', required: true }),
			el('label', 'Введите E-mail'),
			el('small')
		]),
		el('div.form__field.field', [
			el('input.password', { type: 'password', name: 'password', autoComplete: 'off', 'data-valid': 'password', required: true }),
			el('label', 'Введите пароль'),
			el('small')
		]),
		el('button.btn.btn_auth', { type: 'submit' }, 'Отправить'),
		el('p.error-message')
	]);
}

