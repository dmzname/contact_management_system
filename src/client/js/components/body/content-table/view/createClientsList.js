import { el, setAttr } from 'redom';
import { createClientItem } from './createClientItem.js';
import { createTableMessage } from './createTableMessage.js';
import { createTableErrorMsg } from './createTableErrorMsg.js';
import { apiGetClients } from '../../../../api/apiGetClients';
import { calcMargin } from '../../../../utils';
import { tableListener } from '../tableListener';

export function createClientsList() {
  const table = el('table.clients-list');
  const thead = el('thead.clients-list__head');
  const tBody = el('tBody.clients-list__body.isLoading.isEmpty');
  const headRow = el('tr.clients-list__row');

  const dataTitle = [
    'ID',
    'Фамилия Имя Отчество',
    'Дата и время создания',
    'Последние изменения',
    'Контакты',
    'Действия',
  ];

  table.addEventListener('click', tableListener);

  dataTitle.forEach((title, index) => {
    const headData = el('th.clients-list__data-head');
    let filterBtn = null;
    index <= 3 ? (filterBtn = el('button')) : (filterBtn = el('span'));
    filterBtn.textContent = title;
    if (index === 0) {
      setAttr(filterBtn, { className: 'active' });
    }
    headData.append(filterBtn);
    headRow.append(headData);
  });

  apiGetClients()
    .then((data) => {
      !data.length ? tBody.append(createTableMessage()) : tBody.classList.remove('isEmpty');
      data.forEach((clientData) => {
        tBody.append(createClientItem(clientData));
        calcMargin();
      });
      tBody.classList.remove('isLoading');
    })
    .catch((err) => {
      tBody.append(createTableErrorMsg(err.message));
      tBody.classList.remove('isLoading');
    });

  thead.append(headRow);
  table.append(thead, tBody);
  return { table, tBody };
}
