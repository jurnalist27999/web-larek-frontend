import { IPage } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Page extends Component<IPage> {
	//класс Page
	//защищенные свойства пишем с _
	protected _counter: HTMLElement; //записываем в класс сами элементы, в которых реализуется счетчик, каталог и затемнение
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement; //wrapper - обертка
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basketrender')
		})
	}

	set locked(value: boolean) {
		//реализовываем в классе функционал затемнения. Если он есть, то добавляем необходимый селектор, если нет, то нет.
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set counter(value: number) {
		//this._counter.innerText = String(value);
		this.setText(this._counter, value);
	}

}
