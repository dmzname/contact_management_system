import { el } from 'redom';

export function createSignupForm() {
	return el('form.form.form_auth', { name: 'signup', hidden: true, novalidate: true }, [
		el('h2.form__title', 'Форма регистрации'),
		el('button.btn_toggle', { type: 'button' }, 'Войти'),
		el('div.form__field.field', [
			el('input.username', { type: 'text', name: 'username', autoComplete: 'off', 'data-valid': 'text', required: true  }),
			el('label', 'Введите имя'),
			el('small')
		]),
		el('div.form__field.field', [
			el('input.email', { type: 'text', name: 'email', autoComplete: 'off', 'data-valid': 'email', required: true  }),
			el('label', 'Введите E-mail'),
			el('small')
		]),
		el('div.form__field.field', [
			el('input.password', { type: 'password', name: 'password', autoComplete: 'off', 'data-valid': 'password', required: true  }),
			el('label', 'Введите пароль'),
			el('small')
		]),
		el('div.form__field.field', [
			el('input.confirm-password', { type: 'password', name: 'confirm-password', autoComplete: 'off', 'data-valid': 'password', required: true  }),
			el('label', 'Повторите ввод пароля'),
			el('small')
		]),
		el('button.btn.btn_auth', { type: 'submit' }, 'Отправить'),
		el('p.error-message')
	]);
}

