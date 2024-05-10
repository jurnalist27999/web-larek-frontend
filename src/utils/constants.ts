export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`; //используется для запросов данных о товарах и отправки заказа
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`; //используется для формирования адреса картинки в товаре.

export const settings = {};

export const categoryClass = new Map([
	['софт-скил', 'soft'],
	['другое', 'other'],
	['дополнительное', 'additional'],
	['кнопка', 'button'],
	['хард-скил', 'hard'],
]);
