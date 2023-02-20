import { el } from 'redom';

const ADD_FORM_TITLE = 'Новый клиент';
const DEL_FORM_TITLE = 'Удалить клиента';
const CHANGE_FORM_TITLE = 'Изменить данные';

export function createTitlePopUp(dataAction, id) {
  const title = el('h3.pop-up__title');
  switch (dataAction) {
    case 'change':
      title.innerHTML = `${CHANGE_FORM_TITLE}<span> ID: ${id}</span>`;
      break;
    case 'delete':
      title.textContent = DEL_FORM_TITLE;
      title.classList.add('text-center');
      break;
    default:
      title.textContent = ADD_FORM_TITLE;
  }
  return title;
}
