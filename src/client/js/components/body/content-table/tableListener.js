export function tableListener(event) {
  const { target } = event;
  const tHead = target.closest('.clients-list__head');

  if (target.nodeName === 'BUTTON' && tHead) {
    const btns = tHead.querySelectorAll('button');
    btns.forEach((btn) => {
      btn.classList.remove('active');
    });
    target.classList.add('active');
  }

  if (target.closest('.contacts__btn')) {
    const toolTips = document.querySelectorAll('.tooltip');
    toolTips.forEach((el) => {
      if (el !== target.children[0]) el.hidden = true;
    });

    const tooltip = target.children[0];
    tooltip.hidden = !tooltip.hidden;
  }
}
