import { el } from 'redom';
import { createLoginForm } from './createLoginForm';
import { createSignupForm } from './createSignupForm';
import { createNoScript, toggleForms } from '../../../utils';
import { formsHandler } from '../formsHandler';

export function authForms() {
	document.body.innerHTML = '';

	const noScript = createNoScript();
	const loginForm = createLoginForm();
	const signupForm = createSignupForm();

	const overlay = el('.overlay', [loginForm, signupForm]);

	toggleForms([loginForm, signupForm]);
	formsHandler([loginForm, signupForm]);

	document.body.append(noScript, overlay);
}
