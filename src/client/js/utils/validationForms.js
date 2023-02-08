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
		msg: 'Короткий пароль',
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

export function isFormValid(inputs) {
	let isValid = true, formData = {}, contacts = [];

	const password = inputs.find((el) => el.name === 'password')?.value.trim();

	inputs.forEach(el => {
		el.addEventListener('input', (e) => {
			if (e.target.dataset.valid && validationParams[e.target.dataset.valid].regExp.test(e.target.value.trim())) {
				removeError(e.target);
			}
		});
	});

	inputs.forEach((input, index) => {
		const value = input.value.trim();
		const { valid } = input.dataset;

		if(valid) {
			const errMsg = !value && input.required ? 'Обязательное поле' : validationParams[valid].msg;

			if ((value === '' && input.required) || !validationParams[valid].regExp.test(value)) {
				showError(input, errMsg);
				isValid = false;
			} else {
				if(input.classList.contains('contact-field__input')) {
					contacts.push({
							socialType: input.name,
							socialName: inputs[index - 1].value,
							socialLink: value
					})
				} else {
					formData = { ...formData, [input.name]: value };
				}
				if(input.closest('.form_clients')) {
					formData.contacts = [...contacts];
				}
			}

			if (name === 'confirm-password' && value !== password) {
				showError(input, errMsg);
				isValid = false;
			}
		}
	});

	if (isValid) return formData;
}
