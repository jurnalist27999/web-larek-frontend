export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	render(data?: Partial<T>): HTMLElement {
		//мы делаем поля опциональными
		Object.assign(this as object, data ?? {});
		return this.container;
	}

	//устанавливает текстовое содержимое
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	//переключает класс
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force); //если нет класса, то добавляет его, если есть, то удаляет.
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Скрыть
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Показать
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}
}
