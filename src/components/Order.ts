import { IOrder } from '../types';
import { ensureAllElements, ensureElement } from '../utils/utils';

import { Component } from './base/Component';
import { IEvents } from './base/events';


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
		this._payment = ensureAllElements<HTMLElement>(
			'.button_alt',
			this.container
		);
			this._inputs = Array.from(
				ensureAllElements<HTMLInputElement>('.form__input', this.container)
			);
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

		this._payment.forEach((element) => {
			element.addEventListener('click', (event) => {
				this.toggleButton(element)
			})
		})
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

	protected toggleButton(element: HTMLElement) {
		const activeButton = this.container.querySelector('.button_alt-active')
		if (activeButton) {
			this.toggleClass(activeButton as HTMLElement, 'button_alt-active')
		} 

		this.toggleClass(element, 'button_alt-active')
	}
}
