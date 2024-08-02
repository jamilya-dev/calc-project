'use strict';

const title = document.getElementsByTagName('h1')[0];
const btn1 = document.getElementsByClassName('handler_btn')[0];
const btn2 = document.getElementsByClassName('handler_btn')[1];
const btnPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRollback = document.querySelector('.rollback > .main-controls__range > input[type="range"]');
const spanRollback = document.querySelector('.rollback > .main-controls__range > .range-value');
const inputsItem = document.getElementsByClassName('total-input')[0];
const inputsItem1 = document.getElementsByClassName('total-input')[1];
const inputsItem2 = document.getElementsByClassName('total-input')[2];
const inputsItem3 = document.getElementsByClassName('total-input')[3];
const inputsItem4 = document.getElementsByClassName('total-input')[4];
let screens = document.querySelectorAll('.screen');

console.log(title);
console.log(btns1);
console.log(btns2);
console.log(btnPlus);
console.log(otherItemsPercent);
console.log(otherItemsNumber);
console.log(inputRollback);
console.log(spanRollback);
console.log(inputsItem);
console.log(inputsItem1);
console.log(inputsItem2);
console.log(inputsItem3);
console.log(inputsItem4);
console.log(screens);

// const appData = {
//   title: '',
//   screens: [],
//   screenPrice: 0,
//   adaptive: true,
//   rollback: 10,
//   allServicePrices: 0,
//   fullPrice: 0,
//   servicePercentPrice: 0,
//   services: {},
//   start: function () {
//     appData.asking();
//     appData.addPrices();
//     appData.getFullPrice();
//     appData.getServicePercentPrices();
//     appData.getTitle();
//     appData.logger();
//   },
//   isNumber: function (num) {
//     return !isNaN(parseFloat(num)) && isFinite(num);
//   },
//   isString: function (str) {
//     return isNaN(str);
//   },
//   asking: function () {
//     do {
//       appData.title = prompt('Как называется ваш проект?');
//     } while (!appData.isString(appData.title));

//     for (let i = 0; i < 2; i++) {
//       let price = 0
//       let name = ''
//       do {
//         name = prompt('Какие типы экранов нужно разработать?');
//       } while (!appData.isString(name));

//       do {
//         price = prompt('Сколько будет стоить данная работа?');
//       } while (!appData.isNumber(price))

//       appData.screens.push({ id: i, name: name, price: price })
//     }

//     for (let screen of appData.screens) {
//       appData.screenPrice += +screen.price
//     }

//     for (let i = 0; i < 2; i++) {
//       let price = 0
//       let name = ''
//       do {
//         name = prompt('Какой дополнительный тип услуги нужен?');
//       } while (!appData.isString(name));

//       do {
//         price = prompt('Сколько это будет стоить?');
//       } while (!appData.isNumber(price))

//       appData.services[name] = +price
//     }

//     appData.adaptive = confirm("Нужен ли адаптив на сайте?")
//   },
//   addPrices: function () {
//     for (let screen of appData.screens) {
//       appData.screenPrice += +screen.price;
//     }
//     for (let key in appData.services) {
//       appData.allServicePrices += appData.services[key]
//     }
//   },
//   getFullPrice: function getFullPrice() {
//     appData.fullPrice = +appData.screenPrice + appData.allServicePrices;;
//   },
//   getServicePercentPrices: function getServicePercentPrices() {
//     appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
//   },
//   getTitle: function getTitle() {
//     appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLocaleLowerCase();
//   },
//   getRollbackMessage: function (price) {
//     switch (true) {
//       case price >= 30000:
//         return "Даем скидку в 10%";
//         break
//       case price >= 15000 && price < 30000:
//         return 'Даем скидку в 5%';
//         break
//       case price >= 0 && price < 15000:
//         return 'Скидка не предусмотрена';
//         break
//       case price < 0:
//         return 'Что то пошло не так';
//         break
//     }
//   },
//   logger: function () {
//     for (let key in appData) {
//       console.log(key + ' ' + appData[key]);
//     }
//     console.log(appData.services)
//   }
// }

// appData.start();