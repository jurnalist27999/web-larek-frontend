export interface IBasket {
	items: HTMLElement[];
	price: string | null;
	selectItems: ICard[]
}

export interface ICard {
	render: any;
	id: string;
	index?: number;
	description?: string;
	image?: string;
	title: string;
	category?: string;
	price: number | null;
}

export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: ICard[];
}

export interface IForm {
	valid: boolean;
	errors: string;
}

export interface IModal {
	//общее модальное окно
	content: HTMLElement;
}

export interface IPage {
	//интерфецс класс Page.
	counter: number; //типизация свойства счетчика корзины
	catalog: HTMLElement[]; //типизация свойства каталога с товарами(элементами)
	locked: boolean; //locked - запертый. типизация состояния сттраницы при открытии или закрытии модального окна - затемнено или нет.
}

export interface ISuccess {
	total: string;
}

export interface IData {
	catalog: ICard;
	basket: ICard[]; //надо подумать, что указать
	order: IOrder;
}

export interface IResponse {
	total: number;
	items: ICard[];
}

export interface ICardActions {
	onclick: () => void;
}

export interface ISuccessActions {
	onclick: () => void;
}

