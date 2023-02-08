export function getInputsNode (form) {
	return [...form.elements].filter((el) => el.nodeName === 'INPUT');
}