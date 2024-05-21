import { IOrder } from '../types';
import { ensureAllElements, ensureElement } from '../utils/utils';
import { Form } from './Form';
import { IEvents } from './base/events';

export class Order extends Form<IOrder> {
	protected _payment: HTMLElement[];
	protected _inputs: HTMLInputElement[];
	protected _submitBtn: HTMLButtonElement; //кнопка Далее после заполнения адреса.
	order: IOrder | null = {
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: null,
	};

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
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
				this.events.emit('contact:render');
			});
		} else {
			this._submitBtn.addEventListener('click', () => {
				this.events.emit('order:post');
			});
		}

		if (this._payment) {
				this._payment.forEach((element) => {
			element.addEventListener('click', (event) => {
				this.toggleButton(element);
			});
		});
		}

		this.errors = '';
		this.enableValidation();
		this.setOrderValues();
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
		const activeButton = this.container.querySelector('.button_alt-active');
		if (activeButton) {
			this.toggleClass(activeButton as HTMLElement, 'button_alt-active');
		}

		this.toggleClass(element, 'button_alt-active');
		this.order.payment = element.getAttribute('name');
		this.changeValues();
	}

	protected enableValidation() {
		this._inputs.forEach((element) => {
			element.addEventListener('input', () => {
				this.changeValues(element);
			});
		});

		this.setHidden(this._errors);
	}

	protected changeValues(element?: HTMLInputElement) {
		const value = this._inputs.map((item) => {
			if (item.value === '' || !item.validity.valid) {
				return false;
			}
		});
		const validity = value.includes(false);
		this.valid = !validity && this.order.payment !== '';
		element ? this.showError(element) : null;
	}

	protected showError(element: HTMLInputElement) {
		if (element.validity.valid) {
			this.setHidden(this._errors);
			this.errors = '';
		} else {
			element.validity.patternMismatch
				? (this.errors = element.dataset.errorMessage)
				: (this.errors = element.validationMessage);
			this.setVisible(this._errors);
		}
	}

	protected setOrderValues() {
		this._inputs.forEach((element) => {
			element.addEventListener('input', () => {
				const name = element.name;
				this.order[name] = element.value;
			});
		});
	}
}
