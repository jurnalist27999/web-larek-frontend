import { ICard } from '../types';
import { IOrder } from './Order';
import { IEvents } from './base/events';

interface IData {
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

	setCatalog(items: ICard[]) {
		this.catalog = items;
		this.events.emit('itemschanged', { catalog: this.catalog });
	}
}
