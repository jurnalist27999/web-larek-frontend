import { ICard, ICardActions } from '../types';
import { categoryClass } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Card extends Component<ICard> {
	protected _index: HTMLElement;
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement; //- кнопка "В корзину", по клику открывается модалка с корзиной

	constructor(container: HTMLElement, actions: ICardActions) {
		super(container);
		(this._index = ensureElement<HTMLElement>('.basket__item-index')),
			this.container;
		(this._description = ensureElement<HTMLElement>('.card__text')),
			this.container;
		(this._image = ensureElement<HTMLImageElement>('.card__image')),
			this.container;
		(this._title = ensureElement<HTMLElement>('.card__title')), this.container;
		(this._category = ensureElement<HTMLElement>('.card__category')),
			this.container;
		(this._price = ensureElement<HTMLElement>('.card__price')), this.container;

		(this._button = ensureElement<HTMLButtonElement>('.card__button')),
			this.container;
		this._button.addEventListener('click', actions.onclick);
	}

	set index(value: number) {
		//this._index.innerText = String(value);
		this.setText(this._index, value);
	}

	set discription(value: string) {
		//this._description.innerText = value;
		this.setText(this._description, value);
	}

	set image(value: string) {
		this._image.src = value;
	}

	set title(value: string) {
		//this._title.innerText = value;
		this.setText(this._title, value);
	}

	set category(value: string) {
		//this._category.innerText = value;
		this.setText(this._category, value);
		this._category.classList.add(`card__category_${categoryClass.get(value)}`);
	}

	set price(value: number | null) {
		if (value) {
			this._price.innerText = String(value) + ` синапсов`;
		} else {
			this._price.innerText = 'Бесценно';
		}
	}

	get title(): string {
		return this._title.innerText;
	}

	get price(): number {
		return parseInt(this._price.innerText);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id;
	}
}
