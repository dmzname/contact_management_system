import { createPopUpForm } from './createPopUpForm';
import { createRemoveConfirmation } from './createRemoveConfirmation';

export function createContentPopUp(dataAction, clientData) {
  switch (dataAction) {
    case 'change':
      return createPopUpForm(clientData);
    case 'delete':
      return createRemoveConfirmation();
    default:
      return createPopUpForm();
  }
}
