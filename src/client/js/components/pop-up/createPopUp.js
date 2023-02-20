import { el } from 'redom';
import { popUpListener } from './popUpListener.js';
import { createTitlePopUp } from './views/createTitlePopUp';
import { createContentPopUp } from './views/content-popUp/createContentPopUp';
import { TabindexController } from '../../classes/TabindexController';
import { addEventListener } from '../../utils/eventListenersController';
import { deletePopUp } from './deletePopUp';

export const popUpTabindexController = new TabindexController(document);

export function createPopUp(event) {
  if (document.body.querySelector('.pop-up')) return;
  window.__contactCount = 0;
  const clientData = {};

  if (this !== null) {
    Object.assign(clientData, this);
  }
  const dataAction = event.target.dataset.action;
  const isData = !Object.keys(clientData).length;

  const popUpContent = el('.pop-up__content', [
    createTitlePopUp(dataAction, clientData?.clientId),
    createContentPopUp(dataAction, clientData),
    el(
      'button.btn-reset',
      isData ? { 'data-close': '' } : { 'data-action': 'remove-client' },
      isData ? 'Отмена' : 'Удалить клиента',
    ),
    el('button.pop-up__close', { 'data-close': '', type: 'button' }),
    el('.pop-up__isLoading', { hidden: true }),
    el('.pop-up__isError', { hidden: true }),
  ]);

  const popUpOverlay = el('.pop-up', { 'data-close': '' }, popUpContent);

  popUpTabindexController.removeFocus(popUpOverlay);

  document.body.append(popUpOverlay);

  addEventListener(popUpOverlay, 'click', popUpListener.bind(clientData));
  addEventListener(popUpOverlay, 'input', popUpListener);
  addEventListener(popUpOverlay, 'submit', popUpListener);
  addEventListener(popUpOverlay, 'keydown', function (event) {
    deletePopUp(this, event);
  });
}
