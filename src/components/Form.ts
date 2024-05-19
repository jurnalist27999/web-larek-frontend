import { IForm } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Form<T> extends Component<IForm> {
	protected _errors: HTMLElement;
	protected _submit: HTMLButtonElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		this.container.addEventListener('input', (event) => {
			const target = event.target as HTMLInputElement
			const name = target.name 
			const value = target.value
			this.inputChange(name, value)
		})

		this.container.addEventListener('submit', (event: Event) => {
			event.preventDefault()
			console.log(event.target)
			const form = event.target as HTMLFormElement;
			this.events.emit(`${form.name}:submit`)
		})

	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		//this._errors.innerText = value;
		this.setText(this._errors, value);
	}

	protected inputChange(name: string, value: string) {
		this.events.emit(`${name}:change`, {name, value})
	}

	render(state: Partial<T> & IForm) {
		const {valid, errors, ...inputs} = state;
		super.render({valid, errors})
		Object.assign(this, inputs);
		return this.container;
	}

}
