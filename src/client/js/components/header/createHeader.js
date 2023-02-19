import { el, setChildren } from 'redom';
import { svgLogo } from './svgLogo.js';
import { createSearchInput } from './createSearchInput';
import { createLogoutBtn } from './createLogoutBtn';

export function createHeader() {
	const searchInput = createSearchInput();
	const logoutBtn = createLogoutBtn();

	const header = el('header.header');

	const logo = el('.header__logo');
	logo.innerHTML = svgLogo();

	setChildren(header, [logo, searchInput, logoutBtn]);

	return header;
}
