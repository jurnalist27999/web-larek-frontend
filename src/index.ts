import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { Data } from './components/Data';
import { Form } from './components/Form';
import { Modal } from './components/Modal';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { Success } from './components/Success';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { ICard, IResponse } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const api = new Api(API_URL);
const events = new EventEmitter();
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const data = new Data(events);

//const success = new Success(ensureElement<HTMLElement>('.order-success'), actions);
//const form = new Form(ensureElement<HTMLElement>('.form'), events);
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const address = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Order(cloneTemplate(contactsTemplate), events);

events.onAll((event) => {
	console.log(event);
});

api.get('/product')   //вывели каталог с карточками с сервера
.then((res:IResponse)=>
	data.setCatalog(res.items)
)

events.on('itemschanged', () => {
	page.catalog = data.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onclick: () => {
				events.emit('cardselect', item);
			},
		});

	return card.render({
		title: item.title,
		image: CDN_URL + item.image,
		price: item.price,
		category: item.category,
		description: item.description

	})
	});
});

events.on('cardselect', (item: ICard) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onclick: () => {
			events.emit('basketchange', item);
		},
	});

	modal.render({
		content: card.render({
		id: item.id,
		title: item.title,
		image: CDN_URL + item.image,
		price: item.price,
		category: item.category,
		description: item.description
		})
		
	})

	card.checkInBasket(basket.selectItems, item);
})

events.on('basketchange', (item: ICard) => {
	const card = new Card(cloneTemplate(cardBasketTemplate), {
		onclick: () => {
			events.emit('basketdelete', item)
		}
	})

	if (item != null) {
		card.render({
		id: item.id,
		title: item.title,
		price: item.price
	}) 

	data.addProduct(basket.selectItems, card)
	modal.close();
	} else {
		events.emit('basketrender');
	}

	page.render({
		counter: basket.selectItems.length
	})

});

events.on('basketdelete', (item: ICard) => {
	basket.selectItems = basket.selectItems.filter((element) => {
		return element.id != item.id
	})

	events.emit('basketchange', null)
})

events.on('basketrender', () => {
	modal.render({
		content: basket.render({
			items: basket.selectItems.map((element, index) => {
				return element.render({
					index: index + 1
				})
			}),
			price: data.getPrice(basket.selectItems, ' синапсов')
		})
	})
})

events.on('modalopen', () => {
	page.locked = true
})

events.on('modalclose', () => {
	page.locked = false
})

events.on('adressrender', () => {
	modal.render({
		content: address.render({
			address: ''
		})
	})
})