import { closingSelectOptions, selectActions } from './views/custom-select/createContactSelect.js';
import { removeEventListener } from '../../utils/eventListenersController';
import { popUpTabindexController } from './createPopUp';

export function deletePopUp(popUp, event) {
  if (event.type === 'keydown' && event.code !== 'Escape') return;
  const addOther = popUp.querySelector('.add-other');
  const selects = popUp.querySelectorAll('.custom-select');

  popUp.remove();

  popUpTabindexController.returnFocus();

  removeEventListener(popUp, 'click');
  removeEventListener(popUp, 'input');
  removeEventListener(popUp, 'submit');
  removeEventListener(popUp, 'keydown');

  document.removeEventListener('click', closingSelectOptions);

  if (addOther) {
    removeEventListener(addOther, 'click');
    removeEventListener(addOther, 'keydown');
  }

  if (selects) {
    selects.forEach((select) => {
      select.removeEventListener('click', selectActions);
      select.removeEventListener('keydown', selectActions);
    });
  }
}
