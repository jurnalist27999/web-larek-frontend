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
import { API_URL } from './utils/constants';
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

const basket = new Basket(cloneTemplate(basketTemplate), events);
const address = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Order(cloneTemplate(contactsTemplate), events);

events.onAll((event) => {
	console.log(event);
});

events.on('itemschanged', () => {
	page.catalog = data.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onclick: () => {
				events.emit('cardselect', item);
			},
		});
	});
});
