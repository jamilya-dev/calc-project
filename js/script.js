'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputRollback = document.querySelector('.rollback > .main-controls__range > input[type="range"]');
const spanRollback = document.querySelector('.rollback > .main-controls__range > .range-value');
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: '',
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  countScreens: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', function () {
      if (appData.checkFields()) appData.start();
    });
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    appData.changeRollback();
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    // appData.logger();
  },
  checkFields: function () {
    screens = document.querySelectorAll('.screen');
    let allFieldsFilled = true;
    screens.forEach(function (screen) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectValue = select.options[select.selectedIndex].value;
      const inputValue = input.value;
      if (selectValue === '' || inputValue === '') {
        allFieldsFilled = false;
        return;
      }
    });
    return allFieldsFilled;
  },
  changeRollback: function () {
    inputRollback.addEventListener('input', function (event) {
      spanRollback.textContent = event.target.value + '%';
      appData.rollback = event.target.value;
    })
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
    fullTotalCount.value = appData.fullPrice
    totalCountRollback.value = appData.servicePercentPrice
    totalCount.value = appData.countScreens
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent
      const countScreens = input.value

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: countScreens
      })
    })
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      }
    })
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      }
    })
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen');
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key]
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    }
    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

    appData.screens.forEach(function (item) {
      appData.countScreens += +item.count;
    });
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ' ' + appData[key]);
    }
    console.log(appData.services)
  }
}

appData.init();