const eventListeners = {};

export function addEventListener(element, eventName, handler) {
	if (!eventListeners[element]) {
		eventListeners[element] = {};
	}
	eventListeners[element][eventName] = handler;
	element.addEventListener(eventName, handler);
}

export function removeEventListener(element, eventName) {
	if (eventListeners[element] && eventListeners[element][eventName]) {
		element.removeEventListener(eventName, eventListeners[element][eventName]);
		delete eventListeners[element][eventName];
	}
}
