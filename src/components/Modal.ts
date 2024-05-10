import { IModal } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

//общая модалка с контейнером и методами закрытия/открытия
export class Modal extends Component<IModal> {
	protected _content: HTMLElement;
	protected _closeButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modalopen'); //в случае определенного события модалка откроется на странице (emit<T extends object>(event: string, data?: T): void;)
	}

	close() {
		this.events.emit('modalclose'); //в случае определенного события модалка закроется (emit<T extends object>(event: string, data?: T): void;)
		this.container.classList.remove('modal_active');
		this.content = null;
	}
}
