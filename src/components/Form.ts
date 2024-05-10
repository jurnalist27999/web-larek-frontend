import { IForm } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Form extends Component<IForm> {
	protected _errors: HTMLElement;
	protected _submit: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		//this._errors.innerText = value;
		this.setText(this._errors, value);
	}
}
