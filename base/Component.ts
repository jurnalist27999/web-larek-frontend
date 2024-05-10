export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}

	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	//другие методы реализовала в документе - в телеге,сюда перенести.
}
