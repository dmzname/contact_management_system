import { closingSelectOptions, selectActions } from './views/custom-select/createContactSelect.js';
import { popUpListener } from './popUpListener';
import { removeEventListener } from '../../utils/eventListenersController';
import { popUpTabindexController } from './createPopUp';

export function deletePopUp(popUp) {
  const addOther = popUp.querySelector('.add-other');
  const selects = popUp.querySelectorAll('.custom-select');

  popUp.remove();

  popUpTabindexController.returnFocus();

  popUp.removeEventListener('click', popUpListener);
  popUp.removeEventListener('input', popUpListener);
  popUp.removeEventListener('submit', popUpListener);
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
