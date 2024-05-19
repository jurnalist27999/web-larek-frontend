import { IBasket, ICard } from '../types';
import { ensureElement } from '../utils/utils';
import { CatalogItem } from './Card';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasket> { //интерфейс
	protected _price: HTMLElement; 
	protected _list: HTMLElement;
	protected _button: HTMLButtonElement;
	total: string;
	selectItems: CatalogItem[];

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._price = ensureElement<HTMLElement>('.basket__price',
			this.container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._button = ensureElement<HTMLButtonElement>('.basket__button',
			this.container);
		this._button.addEventListener('click', () => {
			this.events.emit('adress:render');
		});
		this.selectItems = [];
		this.total = '';
	}

	set price(value: string | null) {
		//this._price.innerText = String(value);
		this.setText(this._price, value);
		this.setButtonStatus(value)
		this.total = value;
	}

	set items(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
	}

	get price(): string {
		return this.total;
	}

	protected setButtonStatus(price: string) {
		console.log(price);
		if (parseInt(price) === 0) {
			this.setDisabled(this._button, true)
        } else {
			this.setDisabled(this._button, false)
		}
		}


}
