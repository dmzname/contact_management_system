import { el } from 'redom';

export function createContactsList(list) {
	return list.map((contact) => {
		return el(
			`button.contacts__btn.${contact.socialType}`,
			el('span.tooltip', { hidden: true }, [
				el('span.tooltip__text', `${contact.socialName}`),
				el(
					'a.tooltip__link',
					{ href: contact.socialLink, target: '_blank' },
					`${contact.socialLink}`,
				),
			]),
		);
	});
}
