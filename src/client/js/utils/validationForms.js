const showError = (input, errMsg) => {
	const formField = input.closest('div.field');
	formField.classList.add('error');
	const errField = formField.querySelector('small');
	errField.textContent = errMsg;
};

export const removeError = (input) => {
	const formField = input.closest('div.field');
	formField.classList.remove('error');
	const errField = formField.querySelector('small');
	errField.textContent = '';
};

const validationParams = {
	text: {
		regExp: /^[а-яА-ЯёЁa-zA-Z._]{0,20}$/,
		msg: 'Ваше имя не корректно',
	},
	email: {
		regExp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
		msg: 'E-mail введен не корректно',
	},
	password: {
		regExp: /^.{6}$/,
		msg: 'Введено не достаточное количество символов',
	},
	'confirm-password': {
		regExp: /^.{6}/,
		msg: 'Введен не верный пароль',
	},
	phone: {
		regExp: /^((8|\+\d{1,2})[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
		msg: 'Введен не верный номер телефона',
	},
	link: {
		regExp: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
		msg: 'Ссылка указанна не верно',
	}
};

export function isFormValid(form) {
	let isValid = true, password, formData = {};

	const inputs = [...form.elements].filter((el) => el.nodeName === 'INPUT');
	if(form.name === 'signup') {
		password = inputs.find((el) => el.name === 'password').value.trim();
	}

	form.addEventListener('input', (e) => {
		if (e.target.dataset.valid && validationParams[e.target.dataset.valid].regExp.test(e.target.value.trim())) {
			removeError(e.target);
		}
	});

	inputs.forEach((input) => {
		const value = input.value.trim();
		const { valid } = input.dataset;

		if(valid) {
			const errMsg = !value && input.required ? 'Поле обязательно для заполнения' : validationParams[valid].msg;

		if ((value === '' && input.required) || !validationParams[valid].regExp.test(value)) {
			showError(input, errMsg);
			isValid = false;
		} else {
			formData = { ...formData, [input.name]: value };
		}

		if (name === 'confirm-password' && value !== password) {
			showError(input, errMsg);
			isValid = false;
		}}
	});

	if (isValid) return formData;
}
