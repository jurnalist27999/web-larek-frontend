import { IBasket } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasket> {
	protected _price: HTMLElement;
	protected _list: HTMLElement;
	protected _button: HTMLElement;
	total: number;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		(this._price = ensureElement<HTMLElement>('.basket__price')),
			this.container;
		(this._list = ensureElement<HTMLElement>('.basket__list')), this.container;
		(this._button = ensureElement<HTMLElement>('.basket__button')),
			this.container;
		this._button.addEventListener('click', () => {
			this.events.emit('adressrender');
		});
	}

	set price(value: number | null) {
		//this._price.innerText = String(value);
		this.setText(this._price, value);
		this.total = value;
	}

	set items(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
	}

	get price(): number {
		return this.total;
	}
}
