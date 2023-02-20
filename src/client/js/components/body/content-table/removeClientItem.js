import { removeEventListener } from '../../../utils/eventListenersController';

export function removeClientItem(item) {
  const btns = item.querySelectorAll('[data-action]');
  btns.forEach((btn) => {
    removeEventListener(btn, 'click');
  });
  item.remove();
}
