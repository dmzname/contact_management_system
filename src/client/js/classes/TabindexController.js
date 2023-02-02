export class TabindexController {
	interactiveSelectors = 'a, button, input, textarea, [tabindex]';

	blockElementsList = [];

	constructor(parentBlock) {
		this.parrentBlock = parentBlock;
	}

	removeFocus(currentBlock) {
		const elements = this.parrentBlock.querySelectorAll(this.interactiveSelectors);
		elements.forEach((el) => {
			const tabIndex = el.getAttribute('tabindex');
			if (!currentBlock.contains(el)) {
				if (!tabIndex || tabIndex !== '-1') {
					el.setAttribute('tabindex', '-1');
					this.blockElementsList.push(el);
				}
			}
		});
	}

	returnFocus() {
		while (this.blockElementsList.length !== 0) {
			const element = this.blockElementsList.pop();
			if (element.tagName.match(/a|button|input|textarea/i)) {
				element.removeAttribute('tabindex');
			} else {
				element.setAttribute('tabindex', '0');
			}
		}
	}
}
