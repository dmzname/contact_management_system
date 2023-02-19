import { el } from 'redom';
import { popUpListener } from './popUpListener.js';
import { createTitlePopUp } from './views/createTitlePopUp';
import { createContentPopUp } from './views/content-popUp/createContentPopUp';
import { TabindexController } from '../../classes/TabindexController';

export const popUpTabindexController = new TabindexController(document);

export function createPopUp(event) {
  if (document.body.querySelector('.pop-up')) return;
  window.__contactCount = 0;

  const dataAction = event.target.dataset.action;
  createPopUp.item = event.target.closest('.clients-list__row');

  const popUpOverlay = el(
    '.pop-up',
    { 'data-close': '' },
    el('.pop-up__content', [
      createTitlePopUp(dataAction),
      createContentPopUp(dataAction),
      el('button.btn-reset', { 'data-close': '' }, 'Отмена'),
      el('button.pop-up__close', { 'data-close': '', type: 'button' }),
      el('.pop-up__isLoading', { hidden: true }),
      el('.pop-up__isError', { hidden: true }),
    ]),
  );

  popUpTabindexController.removeFocus(popUpOverlay);

  document.body.append(popUpOverlay);

  popUpOverlay.addEventListener('click', popUpListener);
  popUpOverlay.addEventListener('input', popUpListener);
  popUpOverlay.addEventListener('submit', popUpListener);
}
