# Проектная работа "Веб-ларек"

Используемый стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```

После клонирования проекта необходимо установить зависимости

```
npm install  

```
Для запуска проекта в режиме разработки необходимо выполнить команду

``` 
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении 

Карточка

```
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
```

Данные пользователя в оформлении заказа
```
export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
	[key: string] : unknown;
}
```

Данные ответа после оформления успешного заказа 
```
export interface IOrderResult {
	id: string;
	total: number;
}
```

Данные для отображения на главной странице 
```
export interface IPage {
	counter: number; 
	catalog: HTMLElement[]; 
	locked: boolean; 
}
```

Список карточек (для вывода карточек с сервера)
```
export interface IResponse {
	total: number;
	items: ICard[];
}
```

Данные массив карточек и их стоимость для отображения в корзине
```
export interface IBasket {
	items: HTMLElement[];
	price: number | null;
	selectItems: CatalogItem[];
}
```

Данные для успешного заказа 
```
export interface ISuccess {
	total: string;
}
```


## Архитектура данного приложения

Код данного приложения разделен на слои согласно парадигме MVP:
- M - слой данных, отвечающий за хранение и изменение данных
- V - слой представления (отображения), отвечающий за отображение данных на странице
- P - слой Презентер, содержащий оосновную логику работы приложения. Предназначен для управления и обмена данными между Моделями и Представлением (Объединяет в себе возможности доступа к данным и отображениям). Назначение этого слоя выполняет index.ts

### Базовый код 

#### Класс Api

Отвечает за реализацию запросов с сервером. Содержит в себе базовую логику отправки запросов. 

Конструктор принимает следующие аргументы:
1. baseUrl: string - базовый адрес сервера
2. options: RequestInit - дополнительные опции. Если параметр options содержит объект headers, то будет создан объект, иначе будет создан пустой объект.

Класс имеет следующие методы:
- handleResponse - выполняет проверку и обрабатывает ответ от сервера. Если ответ ок, то функция response.json() возвращает данные в формате JSON. Иначе функция возвращает Promise, которые отклоняется с данными ошибки или текстом состояния. 
- get - выполняет GET запрос на переданный в параметрах эндпоинт и возвращает промис с объектом, которым ответил сервер 
- post - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на эндпоинт как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове. 


#### Класс EventEmitter 

Брокер событий - реализует функционал обработчиков события. Позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.

Класс имеет следующие методы, описанные интерфейсом IEvents:
- on - устанавливает обработчик на событие
- off  - снимает обработчик с события
- emit - инициирует событие 
- trigger - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие 

#### Класс Сomponent

Данный абстрактный класс является основной для большинства компонентов приложения. Он используется для работы с DOM элементами в дочерних копонентах 

Конструктор принимает следующий аргумент:
1. protected readonly container: HTMLElement - контейнер. Аргумент защищен методом protected.

Класс содержит методы:
- protected setText (element: HTMLElement, value: unknown) - устанавливает текстовое содержимое. Защищен методом protected. 
- toggleClass(element: HTMLElement, className: string, force?: boolean) - выполняет реализацию переключения класса 
- setDisabled(element: HTMLElement, state: boolean) - реализует блокирование элемента
-  protected setHidden(element: HTMLElement) - скрывает элемент , устанавливая его значение в «none».Защищен методом protected. 
- protected setVisible(element: HTMLElement) - используется для удаления свойства display из стиля элемента.Защищен методом protected. 

### Код компонентов отображения

#### Класс Basket 

Данный класс отвечает за отображение корзины. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемент разметки. 
2. protected events: IEvents - интерфейс броокера события. Аргумент защищен методом protected. 

Класс корзины устанавливает значение при помощи сеттеров:
- set price - цена товара
- set items - массив элементов
Класс корзины получает значение при помощи геттера:
- get price - общая стоимость товаров 

Класс содержит методы:
- protected setButtonStatus(price: string) - реализует проверку - если стоимость равна нулю, то кнопка блокируется. Защищен методом protected. 



#### Класс Card 

Данный класс отвечает за отображение карточки товара с полной информацией. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемента разметки. 
2. actions: ICardAction - интерфейс, содержащий onclick, которое имеет тип функции и возвращает void.

Класс карточки товара устанавливает значения при помощи сеттеров и геттеров:
- set id - id карточки
- set index - устанавливает индекс товара 
- set discription - устаналивает описание товара
- set image - устанавливает ссылки на изображение товара
- set title - название товара 
- set category - категорию товара  
- set price - стоимость товара 
- get title - возвращает строковое значение текущего заголовка элемента
- get price - возвращает числовое значение цены товара. Функция использует метод parseInt для преобразования строкового значения внутреннего текста свойства _price в число.
-get id - получает значение идентификатора элемента с помощью свойства dataset

Класс содержит метод:
- checkInBasket(container: ICard[], item: ICard) - реализует проверку - если товар уже добавлен в корзину, то кнопка блокируется и у нее меняется надпись на "Уже добавлен"

В классе реализуется класс CatalogItem, который расширяется классом Card и имеет конструктор с первым аргументом conteiner (HTMLElement), вторым аргументов - actions (ICardActions). Конструктор вызывает конструктор родительского класса Card с переданными аргументами.

#### Класс Form 

Интерфейс:
```
interface IForm {
 valid: boolean;
 errors: string;
}
```

Данный класс создает основу для работы с инпутами. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемент разметки. 
2. protected events: IEvents - интерфейс броокера события. Аргумент защищен методом protected.

Класс формы устанавливает значение сеттером:
- set valid - валидации 
- set errors - ошибки

Класс имеет следующие методы: 
- protected inputChange(name: string, value: string) -  используется для передачи изменений значения input элемента. Защищен методом protected.
- render(state: Partial<T> & IForm) -  копируют значение в текущий экземпляр компонента, используя метод Object.assign(). Возвращает значение this.container, которое содержит контейнер компонента.

#### Класс Modal 

Интерфейс:
```
interface IModal {
  content: HTMLElement;
}
```
Данный класс отображает модальное окно. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемента разметки. 
2. protected events: IEvents - интерфейс брокера события. Аргумент защищен методом protected.

Класс модального окна устанавливает значение при помощи сеттера:
- set content - контент(элемент отображения в модальное окно)

Класс реализует следующие методы:
- open() - открытие модального окна 
- close() - закрытие модального окна 
- render(data: IModal)  установка значений в поля класса


#### Класс Order 

Интерфейс:
```
interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: string[];
	[key: string] : unknown;
}
```

Данный класс предзназначен для работы с оформлением заказа в приложении. Наследуется от класса Form. В данном классе реализуется способ выбора оплаты, получения адреса, эл.почты и телефона покупателя. 

Конструктор принимает следующие аргументы:
1. container: HTMLFormElement - контейнер, содержащий в себе элемента разметки. 
2. protected events: IEvents - интерфейс брокер события. Аргумент защищен методом protected.

Класс оформления заказа устанавливает следующие значения при помощи сеттеров:
- set address - адрес клиента 
- set email - эл.почту клиента 
- set phone - телефон клиента 

Класс реализует следующие методы:
- protected toggleButton(element: HTMLElement) - реализуется функционал выбора способа оплаты. Защищен методом protected. 
- protected enableValidation() - перебирает элементы, вешая слушатель события input на каждом элементе. Вызывает метод changeValues().  Защищен методом protected. 
- protected changeValues(element?: HTMLInputElement) - проверяет значение инпутов на наличие ошибки.  Защищен методом protected. 
- protected showError(element: HTMLInputElement) - отображет ошибки, если такие имеются в случае некорректности.  Защищен методом protected. 
- protected setOrderValues() -  перебирает элементы массива, добавляет событие input, которое обновляет значение свойства order при изменении значения элемента. Защищен методом protected. 


#### Класс Page 

Интерфейс:
```
interface IPage {
	counter: number; 
	catalog: HTMLElement[]; 
	locked: boolean; 
}
```
Данный класс отображает главную страницу приложения. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемента разметки. 
2. protected events: IEvents - интерфейс брокер события. Аргумент защищен методом protected.

Класс устанавливает значения при помощи сеттеров:
- set locked - состояние страницы (затемненное или нет)
- set catalog - каталог товаров
- set counter - значение счетчика корзины. Отображает количество товаров в корзине. 


#### Класс Success

Интерфейс:
```
interface ISuccess {
	total: string;
}
```
Данный класс отображает компонент успешного заказа. Наследуется от базового абстрактного класса Component.

Конструктор принимает следующие аргументы:
1. container: HTMLElement - контейнер, содержащий в себе элемента разметки. 
2. actions: ISuccessActions - интерфейс, содержащий onclick, которое имеет тип функции и возвращает void.

Класс устанавливает значение при помощи сеттера:
set total - общая стоимость заказа

### Код модели данных 

#### Класс Data 

Интерфейс:
```
interface IData { 
	catalog: ICard;
	basket: ICard[]; 
	order: IOrder;
}
```

Данный класс необходим для работы со всеми данными приложения. 

Конструктор принимает следующий аргумент: 
1. protected events: IEvents - интерфейс брокер события. Аргумент защищен методом protected.

Класс реализует следующие методы:
- setCatalog(items: ICard[]) - обновляет каталог
- addProduct(container: ICard[], item: ICard) - добавляем элемент в конец массива 
- getPrice(container: ICard[], value: string) - вычисляет общую стоимость всех элементов массива
- setOrder(data: IOrder) - устанавливает значение оформления заказа из переданных данных.
- clearBasket(container: ICard[]) - очищает корзина

Класс устанавливает при помощи сеттеров значения для определения количества товаров в корзине, подлежащих заказу ( то есть длины массива карточек в корзине), а также вывода массива с карточками товаров на главную страницу. 


#### События
- adress:render - при нажатии на кнопку "Оформить" в корзине клиент перейдет в модальное окно заказа, где нужно заполнить поле с адресом доставки
- items:changed - событие изменения каталога карточек 
- `${name}:change` - событие изменения значения в элементе с заданным именем
- modal:open - открытие модального окна
- modal:close - закрытие модального окна
- contact:render - при клике на кнопку "Далее" клиент перейдет в форму с знаполнением полей почты и телефона
- order:post - при клике на кнопку отправятся данные на сервер
- basket:render - при нажатии на корзинку на главной странице клиент перейдет в модальное окно с корзиной 
- card:select - событие выбора карточки товара
- basket:delete - удаление карточки товара
- order:success - получение успешного заказа 


