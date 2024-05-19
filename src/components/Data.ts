import { ICard, IOrder } from '../types';
import { IEvents } from './base/events';

export class Data {
	catalog: ICard[];
	basket: ICard[];
	order: IOrder = {
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: null,
	};

	constructor(protected events: IEvents) {}

	setCatalog(items: ICard[]) {
		//обновление текущего каталога при его изменении
		this.catalog = items;
		this.events.emit('items:changed', { catalog: this.catalog });
	}

	addProduct(container: ICard[], item: ICard) {
		container.push(item);
	}

	getPrice(container: ICard[], value: string) {
		let sum = 0;
		container.forEach((element) => {
			if (element.price) {
				sum += element.price;
			}
		});

		return sum + value;
	}

	setOrder(data: IOrder) {
		this.order = Object.assign(this.order, data);
	}

	clearBasket(container: ICard[]) {
		container.length = 0;
	}
}
