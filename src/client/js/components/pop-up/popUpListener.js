import createContactInput from './views/add-contacts/createContactInput.js';
import { deletePopUp } from './deletePopUp.js';
import { selectActions } from './views/custom-select/createContactSelect.js';
import { calcMargin, getInputsNode, isFormValid } from '../../utils';
import { isShowPlaceholder } from './views/add-contacts/createAddOtherContactForm';
import { apiSaveClient } from '../../api/apiSaveClient';
import { createClientItem } from '../body/content-table/view/createClientItem';
import { createPopUp } from './createPopUp';
import { apiRemoveClient } from '../../api/apiRemoveClient';
import { createTableMessage } from '../body/content-table/view/createTableMessage';

let countContacts = 0;

export async function popUpListener(event) {
  event.preventDefault();
  const { target } = event;

  const popUp = event.currentTarget;
  const addContactBtn = popUp.querySelector('.add-contact__btn');
  const isLoading = popUp.querySelector('.pop-up__isLoading');
  const isError = popUp.querySelector('.pop-up__isError');
  const tBody = document.querySelector('.clients-list__body');

  // Add client contacts field
  if (target.dataset.action === 'add-contact') {
    if (++countContacts === 10) {
      addContactBtn.disabled = true;
    }
    createContactInput(target);
  }

  // Delete client contacts field
  if (target.dataset.action === 'del-contact') {
    const contactField = target.closest('.contact-field');
    const select = contactField.querySelector('.custom-select');
    --countContacts;
    addContactBtn.disabled = false;
    contactField.remove();

    contactField.removeEventListener('input', isShowPlaceholder);
    select.removeEventListener('click', selectActions);
    select.removeEventListener('keydown', selectActions);
  }

  if (event instanceof InputEvent) {
    if (target.classList.contains('contact-field__input')) {
      target.nextElementSibling.hidden = target.value.length;
      target.closest('.contact-field__wrapper').nextElementSibling.hidden = !target.value.length;
    }
  }

  // Save form data
  if (target.dataset.action === 'save') {
    const form = document.forms.add;
    const formData = isFormValid(getInputsNode(form));

    if (formData) {
      isLoading.hidden = false;
      try {
        const clientData = await apiSaveClient(formData);
        if (clientData) {
          if (tBody.closest('.isEmpty')) {
            tBody.innerHTML = '';
            tBody.classList.remove('isEmpty');
          }
          deletePopUp(popUp);
          tBody.append(createClientItem(clientData));
          calcMargin();
        }
      } catch (err) {
        console.log(err);

        isLoading.hidden = true;
        isError.textContent = err.message;
        isError.hidden = false;

        setTimeout(() => {
          isError.hidden = true;
        }, 3000);
      }
    }
  }

  // Remove Client
  if (target.dataset.action === 'remove-client') {
    const itemRow = createPopUp.item;
    const id = itemRow.firstChild.textContent;

    isLoading.hidden = false;
    apiRemoveClient(id)
      .then(() => {
        itemRow.remove();
        tBody.childNodes.length === 0 && tBody.append(createTableMessage());
        deletePopUp(popUp);
        delete createPopUp.item;
      })
      .catch((err) => {
        console.log(err);

        isLoading.hidden = true;
        isError.textContent = err.message;
        isError.hidden = false;

        setTimeout(() => {
          isError.hidden = true;
        }, 3000);
      });
  }

  // Delete pop-up window
  if (target.hasAttribute('data-close')) {
    countContacts = 0;
    deletePopUp(popUp);
  }
}
