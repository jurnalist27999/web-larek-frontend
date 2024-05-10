import { ICard } from '../types';
import { ensureAllElements, ensureElement } from '../utils/utils';

import { Component } from './base/Component';
import { IEvents } from './base/events';

export interface IOrder {
	//оформление заказа
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: ICard[];
}

export class Order extends Component<IOrder> {
	protected _payment: HTMLElement[];
	protected _inputs: HTMLInputElement[];
	protected _submitBtn: HTMLButtonElement; //кнопка Далее после заполнения адреса.
	order: IOrder = {
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: null,
	};

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		(this._payment = ensureAllElements<HTMLElement>(
			'.button_alt',
			this.container
		)),
			(this._inputs = Array.from(
				ensureAllElements<HTMLInputElement>('.form__input', this.container)
			));
		this._submitBtn = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		if (this._submitBtn.classList.contains('order__button')) {
			this._submitBtn.addEventListener('click', () => {
				this.events.emit('contactrender');
			});
		} else {
			this._submitBtn.addEventListener('click', () => {
				this.events.emit('orderpost');
			});
		}
	}

	set address(value: string) {
		this._inputs[0].value = value;
	}

	set email(value: string) {
		this._inputs[0].value = value;
	}

	set phone(value: string) {
		this._inputs[1].value = value;
	}
}
