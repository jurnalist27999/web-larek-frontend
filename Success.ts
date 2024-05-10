import { ISuccess } from '../types';
import { ensureElement } from '../utils/utils';

import { Component } from './base/Component';

export interface ISuccessActions {
	onclick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _total: HTMLElement;
	protected _close: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);
		this._total = ensureElement<HTMLDivElement>(
			'.film__description',
			this.container
		);
		this._close = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._close.addEventListener('click', actions.onclick);
	}

	set total(value: number) {
		this._total.innerText = `Списано ${value} синапсов`;
	}
}
