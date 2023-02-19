import { createPopUpForm } from './createPopUpForm';
import { createRemoveConfirmation } from './createRemoveConfirmation';

export function createContentPopUp(dataAction) {
  switch (dataAction) {
    case 'change':
      return createPopUpForm();
    case 'delete':
      return createRemoveConfirmation();
    default:
      return createPopUpForm();
  }
}
