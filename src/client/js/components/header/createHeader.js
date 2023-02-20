import { el, setChildren } from 'redom';
import { createSearchInput } from './createSearchInput';
import { createLogoutBtn } from './createLogoutBtn';
import logoUrl from '../../../assets/images/zd_logo.svg';

export function createHeader() {
  const searchInput = createSearchInput();
  const logoutBtn = createLogoutBtn();

  const header = el('header.header');

  const logo = el('.header__logo', el('img', { src: logoUrl, alt: 'Logo' }));

  setChildren(header, [logo, searchInput, logoutBtn]);

  return header;
}
