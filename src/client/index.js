import './styles/main.scss';
import './js/views';
import { getTokenFromLS } from './js/utils';
import { authForms } from './js/components/auth/views/authForms';
import { createApp } from './js/createApp';

export const TOKEN = getTokenFromLS();

document.addEventListener('DOMContentLoaded', () => {
	!TOKEN ? authForms() : createApp();
});
