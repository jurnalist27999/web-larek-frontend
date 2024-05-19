import { ICard, ICardActions } from '../types';
import { categoryClass } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

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

		this._description = container.querySelector('.card__text');

		this._image = container.querySelector('.card__image');

		this._title = ensureElement<HTMLElement>('.card__title', this.container);
		this._category = container.querySelector('.card__category');

		this._price = ensureElement<HTMLElement>('.card__price', this.container);

		this._button = container.querySelector('.card__button');
		if (this._button) {
			this._button.addEventListener('click', actions.onclick);
		} else {
			this.container.addEventListener('click', actions.onclick);
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set discription(value: string) {
		this.setText(this._description, value);
	}

	set image(value: string) {
		this._image.src = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
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

	checkInBasket(container: ICard[], item: ICard) {
		this.setDisabled(this._button, false);
		this.setText(this._button, 'В корзину');
		container.forEach((element) => {
			if (element.id === item.id) {
				this.setDisabled(this._button, true);
				this.setText(this._button, 'Уже добавлен');
			}
		});
	}
}

export class CatalogItem extends Card {
	constructor(conteiner: HTMLElement, actions: ICardActions) {
		super(conteiner, actions);
	}
}
