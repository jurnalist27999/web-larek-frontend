
export interface IBasket {
    items: HTMLElement[]
    price: number | null
    }

    export interface ICard {
        id: string;
        index?: number;
        description?: string;
        image?: string;
        title: string;
        category?: string;
        price: number | null;
    }
    
    export interface ICardActions {
        onclick: () => void;
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
