import { el } from 'redom';
import { focusedElement } from '../../../../utils';

export function createRemoveConfirmation() {
  const confirmMsg = el(
    'p.pop-up__confirm-msg',
    'Вы действительно хотите удалить данного клиента?',
  );
  const removeBtn = el(
    'button.btn.pop-up__remove-btn',
    (btn) => focusedElement(btn),
    { 'data-action': 'remove-client' },
    'Удалить',
  );

  return [confirmMsg, removeBtn];
}
