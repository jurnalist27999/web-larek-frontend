import { ICard, IOrder } from '../types';
import { IEvents } from './base/events';

export interface IData { //убрать интерфейс отсюда 
	catalog: ICard;
	basket: ICard[]; //надо подумать, что указать
	order: IOrder;
}

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

	setCatalog(items: ICard[]) { //обновление текущего каталога при его изменении
		this.catalog = items;
		this.events.emit('itemschanged', { catalog: this.catalog });
	}

	addProduct(container: ICard[], item: ICard) {
		container.push(item);
	}

	getPrice(container: ICard[], value: string) {
		let sum = 0;
		container.forEach((element) => {
			sum += element.price;
		})

		return sum + value;
	}
}
